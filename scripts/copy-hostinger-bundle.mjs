import { cp, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const out = path.join(root, 'hostinger-public_html');

await rm(out, { recursive: true, force: true });
await cp(dist, out, { recursive: true });
console.log('Zkopírováno do hostinger-public_html/ — nahrajte celý obsah do public_html na Hostingeru.');
