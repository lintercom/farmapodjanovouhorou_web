import { Hono, type Context } from 'npm:hono@4';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';
import {
  hashAdminPassword,
  normalizePasswordInput,
  shouldMigratePasswordToBcrypt,
  verifyAdminPasswordAgainstKv,
} from './cmsPassword.ts';
import { seedDefaultContent } from './seed.tsx';

const app = new Hono();

// Initialize Supabase client for storage operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Storage bucket name
const IMAGES_BUCKET = 'make-399cd496-images';

function trimBodyString(v: unknown): string {
  return typeof v === 'string' ? normalizePasswordInput(v) : '';
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function normalizeContactRecipient(pageData: any, settings: any) {
  const forcedRecipient = Deno.env.get('CONTACT_FORM_TO_EMAIL')?.trim();
  const pageEmail = pageData?.contactData?.email || pageData?.contact?.email;
  const settingsEmail = settings?.email || settings?.systemEmail;

  if (forcedRecipient) return forcedRecipient;
  return (pageEmail || settingsEmail || '').trim();
}

async function sendContactEmail(args: {
  recipientEmail: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  const fromEmail = Deno.env.get('CONTACT_FORM_FROM_EMAIL') || 'onboarding@resend.dev';

  if (!resendApiKey) {
    throw new Error('Chybí RESEND_API_KEY pro odesílání kontaktního formuláře.');
  }

  const safeName = escapeHtml(args.name);
  const safeEmail = escapeHtml(args.email);
  const safePhone = escapeHtml(args.phone?.trim() || 'Neuvedeno');
  const safeMessage = escapeHtml(args.message).replaceAll('\n', '<br />');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [args.recipientEmail],
      reply_to: args.email,
      subject: `Nová zpráva z kontaktního formuláře: ${args.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1c1917;">
          <h2 style="margin-bottom: 16px;">Nová zpráva z kontaktního formuláře</h2>
          <p><strong>Jméno:</strong> ${safeName}</p>
          <p><strong>E-mail:</strong> ${safeEmail}</p>
          <p><strong>Telefon:</strong> ${safePhone}</p>
          <p><strong>Zpráva:</strong></p>
          <div style="padding: 16px; border-radius: 12px; background: #fafaf9; border: 1px solid #e7e5e4;">
            ${safeMessage}
          </div>
        </div>
      `,
      text: [
        'Nová zpráva z kontaktního formuláře',
        '',
        `Jméno: ${args.name}`,
        `E-mail: ${args.email}`,
        `Telefon: ${args.phone?.trim() || 'Neuvedeno'}`,
        '',
        'Zpráva:',
        args.message,
      ].join('\n'),
    }),
  });

  if (!response.ok) {
    const errorPayload = await response.text();
    throw new Error(`E-mail se nepodařilo odeslat: ${errorPayload}`);
  }
}

// Initialize storage bucket on startup
async function initializeStorage() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === IMAGES_BUCKET);
    
    if (!bucketExists) {
      console.log(`Creating storage bucket: ${IMAGES_BUCKET}`);
      const { error } = await supabase.storage.createBucket(IMAGES_BUCKET, {
        public: false, // Private bucket for security
        fileSizeLimit: 5242880, // 5MB limit
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      });
      if (error) {
        console.error('Error creating bucket:', error);
      } else {
        console.log('Storage bucket created successfully');
      }
    } else {
      console.log('Storage bucket already exists');
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
}

// Call initialization
initializeStorage();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-399cd496/health", (c) => {
  return c.json({ status: "ok" });
});

// Add seed endpoint
app.post('/make-server-399cd496/seed', async (c) => {
  try {
    const results = await seedDefaultContent();
    return c.json({ success: true, results });
  } catch (error: any) {
    console.error('Seed error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get all pages metadata
app.get("/make-server-399cd496/pages", async (c) => {
  try {
    const pagesData = await kv.getByPrefix("page:");
    const pages = pagesData.map((data: any) => ({
      id: data.id,
      label: data.label,
      category: data.category,
      lastModified: data.lastModified,
    }));
    return c.json({ pages });
  } catch (error) {
    console.error("Error fetching pages list:", error);
    return c.json({ error: "Failed to fetch pages" }, 500);
  }
});

// Get specific page content
app.get("/make-server-399cd496/pages/:pageId", async (c) => {
  try {
    const pageId = c.req.param("pageId");
    const pageData = await kv.get(`page:${pageId}`);
    
    // Return empty object if page not found (let frontend use defaults)
    return c.json({ page: pageData || null });
  } catch (error) {
    console.error(`Error fetching page ${c.req.param("pageId")}:`, error);
    return c.json({ error: "Failed to fetch page" }, 500);
  }
});

// Save/update page content
app.put("/make-server-399cd496/pages/:pageId", async (c) => {
  try {
    const pageId = c.req.param("pageId");
    const body = await c.req.json();
    
    const pageData = {
      id: pageId,
      ...body,
      lastModified: new Date().toISOString(),
    };
    
    await kv.set(`page:${pageId}`, pageData);
    
    return c.json({ 
      success: true, 
      message: "Page saved successfully",
      lastModified: pageData.lastModified 
    });
  } catch (error) {
    console.error(`Error saving page ${c.req.param("pageId")}:`, error);
    return c.json({ error: "Failed to save page" }, 500);
  }
});

// Upload image endpoint
app.post("/make-server-399cd496/upload-image", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return c.json({ error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' }, 400);
    }

    // Validate file size (5MB max)
    if (file.size > 5242880) {
      return c.json({ error: 'File too large. Maximum size is 5MB.' }, 400);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 15);
    const ext = file.name.split('.').pop();
    const filename = `${timestamp}-${randomStr}.${ext}`;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(IMAGES_BUCKET)
      .upload(filename, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      return c.json({ error: `Failed to upload image: ${error.message}` }, 500);
    }

    // Generate signed URL (valid for 10 years)
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from(IMAGES_BUCKET)
      .createSignedUrl(filename, 315360000); // 10 years in seconds

    if (urlError) {
      console.error('Error creating signed URL:', urlError);
      return c.json({ error: 'Failed to create image URL' }, 500);
    }

    return c.json({
      success: true,
      url: signedUrlData.signedUrl,
      filename: filename,
    });
  } catch (error: any) {
    console.error('Image upload error:', error);
    return c.json({ error: `Upload failed: ${error.message}` }, 500);
  }
});

// Delete image endpoint
app.delete("/make-server-399cd496/images/:filename", async (c) => {
  try {
    const filename = c.req.param("filename");
    
    const { error } = await supabase.storage
      .from(IMAGES_BUCKET)
      .remove([filename]);

    if (error) {
      console.error('Delete error:', error);
      return c.json({ error: `Failed to delete image: ${error.message}` }, 500);
    }

    return c.json({ success: true, message: 'Image deleted successfully' });
  } catch (error: any) {
    console.error('Image deletion error:', error);
    return c.json({ error: `Deletion failed: ${error.message}` }, 500);
  }
});

// Get global settings
app.get("/make-server-399cd496/settings", async (c) => {
  try {
    const settings = await kv.get("global:settings");
    return c.json({ settings: settings || null });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return c.json({ error: "Failed to fetch settings" }, 500);
  }
});

// Save global settings
app.post("/make-server-399cd496/settings", async (c) => {
  try {
    const body = await c.req.json();
    const { settings } = body;
    
    await kv.set("global:settings", settings);
    
    return c.json({ 
      success: true, 
      message: "Settings saved successfully" 
    });
  } catch (error) {
    console.error("Error saving settings:", error);
    return c.json({ error: "Failed to save settings" }, 500);
  }
});

// Contact form submit
app.post("/make-server-399cd496/contact-message", async (c) => {
  try {
    const body = await c.req.json();
    const name = body?.name?.trim?.() ?? '';
    const email = body?.email?.trim?.() ?? '';
    const phone = body?.phone?.trim?.() ?? '';
    const message = body?.message?.trim?.() ?? '';

    if (!name || !email || !message) {
      return c.json({ error: 'Vyplňte prosím jméno, e-mail a zprávu.' }, 400);
    }

    const kontaktPage = await kv.get("page:kontakt");
    const settings = await kv.get("global:settings");
    const recipientEmail = normalizeContactRecipient(kontaktPage, settings);

    if (!recipientEmail) {
      return c.json({ error: 'V CMS není nastaven cílový kontaktní e-mail.' }, 400);
    }

    await sendContactEmail({
      recipientEmail,
      name,
      email,
      phone,
      message,
    });

    return c.json({
      success: true,
      message: 'Zpráva byla úspěšně odeslána.',
    });
  } catch (error: any) {
    console.error("Error sending contact message:", error);
    return c.json({ error: error.message || 'Zprávu se nepodařilo odeslat.' }, 500);
  }
});

// Ověření hesla správce (účet admin — hodnota v KV nebo výchozí admin)
const handleVerifyCmsLogin = async (c: Context) => {
  try {
    const body = await c.req.json();
    const password = trimBodyString(body?.password);
    const stored = await kv.get("admin:password");

    if (password.length > 0 && verifyAdminPasswordAgainstKv(password, stored)) {
      if (shouldMigratePasswordToBcrypt(stored)) {
        try {
          await kv.set("admin:password", hashAdminPassword(password));
        } catch (e) {
          console.error("admin:password migrate to bcrypt:", e);
        }
      }
      return c.json({ success: true });
    }
    return c.json({ error: "Neplatné údaje" }, 401);
  } catch (error) {
    console.error("verify-cms-login:", error);
    return c.json({ error: "Neplatné údaje" }, 401);
  }
};

// Change password endpoint (účet CMS `admin`, ne Supabase Auth)
const handleChangePassword = async (c: Context) => {
  try {
    const body = (await c.req.json()) as Record<string, unknown>;
    const oldTrim = trimBodyString(body?.oldPassword ?? body?.old_password);
    const newTrim = trimBodyString(body?.newPassword ?? body?.new_password);

    if (!oldTrim || !newTrim) {
      return c.json({ error: "Vyplňte staré i nové heslo" }, 400);
    }
    if (newTrim.length < 6) {
      return c.json({ error: "Nové heslo musí mít alespoň 6 znaků" }, 400);
    }

    const stored = await kv.get("admin:password");
    if (!verifyAdminPasswordAgainstKv(oldTrim, stored)) {
      return c.json({ error: "Staré heslo je nesprávné" }, 401);
    }

    await kv.set("admin:password", hashAdminPassword(newTrim));

    return c.json({
      success: true,
      message: "Heslo bylo úspěšně změněno",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return c.json({ error: "Nepodařilo se změnit heslo" }, 500);
  }
};

app.post("/make-server-399cd496/verify-cms-login", handleVerifyCmsLogin);
app.post("/verify-cms-login", handleVerifyCmsLogin);

app.post("/make-server-399cd496/change-password", handleChangePassword);
app.post("/change-password", handleChangePassword);

Deno.serve(app.fetch);