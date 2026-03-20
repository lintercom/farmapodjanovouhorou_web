import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3,
  Link2,
  Undo,
  Redo
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = 'Začněte psát...', 
  minHeight = '200px' 
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[var(--farm-accent-green)] underline cursor-pointer',
        },
      }),
      Placeholder.configure({
        placeholder,
        showOnlyWhenEditable: true,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-farm max-w-none focus:outline-none',
        style: `min-height: ${minHeight}`,
      },
    },
  });

  // Sync external value changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('Zadejte URL odkazu:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="rich-text-editor-wrapper border border-[var(--farm-border)] rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-[var(--farm-border)] bg-[var(--farm-section-alt-bg)]">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded-lg hover:bg-white transition-colors ${
            editor.isActive('heading', { level: 1 }) ? 'bg-white text-[var(--farm-accent-green)]' : 'text-[var(--farm-secondary-text)]'
          }`}
          title="Nadpis 1"
          type="button"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-lg hover:bg-white transition-colors ${
            editor.isActive('heading', { level: 2 }) ? 'bg-white text-[var(--farm-accent-green)]' : 'text-[var(--farm-secondary-text)]'
          }`}
          title="Nadpis 2"
          type="button"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded-lg hover:bg-white transition-colors ${
            editor.isActive('heading', { level: 3 }) ? 'bg-white text-[var(--farm-accent-green)]' : 'text-[var(--farm-secondary-text)]'
          }`}
          title="Nadpis 3"
          type="button"
        >
          <Heading3 className="w-4 h-4" />
        </button>
        
        <div className="w-px h-8 bg-[var(--farm-border)] mx-1"></div>
        
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg hover:bg-white transition-colors ${
            editor.isActive('bold') ? 'bg-white text-[var(--farm-accent-green)]' : 'text-[var(--farm-secondary-text)]'
          }`}
          title="Tučné"
          type="button"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg hover:bg-white transition-colors ${
            editor.isActive('italic') ? 'bg-white text-[var(--farm-accent-green)]' : 'text-[var(--farm-secondary-text)]'
          }`}
          title="Kurzíva"
          type="button"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded-lg hover:bg-white transition-colors ${
            editor.isActive('strike') ? 'bg-white text-[var(--farm-accent-green)]' : 'text-[var(--farm-secondary-text)]'
          }`}
          title="Přeškrtnuté"
          type="button"
        >
          <Strikethrough className="w-4 h-4" />
        </button>
        
        <div className="w-px h-8 bg-[var(--farm-border)] mx-1"></div>
        
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg hover:bg-white transition-colors ${
            editor.isActive('bulletList') ? 'bg-white text-[var(--farm-accent-green)]' : 'text-[var(--farm-secondary-text)]'
          }`}
          title="Seznam s odrážkami"
          type="button"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg hover:bg-white transition-colors ${
            editor.isActive('orderedList') ? 'bg-white text-[var(--farm-accent-green)]' : 'text-[var(--farm-secondary-text)]'
          }`}
          title="Číslovaný seznam"
          type="button"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        
        <div className="w-px h-8 bg-[var(--farm-border)] mx-1"></div>
        
        <button
          onClick={addLink}
          className={`p-2 rounded-lg hover:bg-white transition-colors ${
            editor.isActive('link') ? 'bg-white text-[var(--farm-accent-green)]' : 'text-[var(--farm-secondary-text)]'
          }`}
          title="Přidat odkaz"
          type="button"
        >
          <Link2 className="w-4 h-4" />
        </button>
        
        <div className="w-px h-8 bg-[var(--farm-border)] mx-1"></div>
        
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded-lg hover:bg-white transition-colors text-[var(--farm-secondary-text)] disabled:opacity-30 disabled:cursor-not-allowed"
          title="Zpět"
          type="button"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded-lg hover:bg-white transition-colors text-[var(--farm-secondary-text)] disabled:opacity-30 disabled:cursor-not-allowed"
          title="Znovu"
          type="button"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content */}
      <div className="p-4 bg-white" style={{ minHeight }}>
        <EditorContent editor={editor} />
      </div>

      <style>{`
        .rich-text-editor-wrapper .ProseMirror {
          min-height: ${minHeight};
          color: var(--farm-primary-text);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          line-height: 1.75;
        }
        
        .rich-text-editor-wrapper .ProseMirror:focus {
          outline: none;
        }
        
        .rich-text-editor-wrapper .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: var(--farm-secondary-text);
          pointer-events: none;
          height: 0;
        }
        
        .rich-text-editor-wrapper .ProseMirror h1 {
          font-size: 2em;
          font-weight: 700;
          color: var(--farm-primary-text);
          margin-bottom: 0.5em;
          margin-top: 1em;
          line-height: 1.2;
        }
        
        .rich-text-editor-wrapper .ProseMirror h1:first-child {
          margin-top: 0;
        }
        
        .rich-text-editor-wrapper .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: 700;
          color: var(--farm-primary-text);
          margin-bottom: 0.5em;
          margin-top: 1em;
          line-height: 1.3;
        }
        
        .rich-text-editor-wrapper .ProseMirror h2:first-child {
          margin-top: 0;
        }
        
        .rich-text-editor-wrapper .ProseMirror h3 {
          font-size: 1.25em;
          font-weight: 600;
          color: var(--farm-primary-text);
          margin-bottom: 0.5em;
          margin-top: 0.75em;
          line-height: 1.4;
        }
        
        .rich-text-editor-wrapper .ProseMirror h3:first-child {
          margin-top: 0;
        }
        
        .rich-text-editor-wrapper .ProseMirror p {
          margin-bottom: 0.75em;
        }
        
        .rich-text-editor-wrapper .ProseMirror ul,
        .rich-text-editor-wrapper .ProseMirror ol {
          margin-bottom: 0.75em;
          padding-left: 1.5em;
        }
        
        .rich-text-editor-wrapper .ProseMirror ul {
          list-style-type: disc;
        }
        
        .rich-text-editor-wrapper .ProseMirror ol {
          list-style-type: decimal;
        }
        
        .rich-text-editor-wrapper .ProseMirror li {
          margin-bottom: 0.25em;
        }
        
        .rich-text-editor-wrapper .ProseMirror a {
          color: var(--farm-accent-green);
          text-decoration: underline;
          cursor: pointer;
        }
        
        .rich-text-editor-wrapper .ProseMirror a:hover {
          opacity: 0.8;
        }
        
        .rich-text-editor-wrapper .ProseMirror strong {
          font-weight: 600;
          color: var(--farm-primary-text);
        }
        
        .rich-text-editor-wrapper .ProseMirror em {
          font-style: italic;
        }
      `}</style>
    </div>
  );
}