import { env } from 'cloudflare:workers';
import { getAdmin } from '../../../../lib/admin-auth';

type MediaEnv = { MEDIA?: R2Bucket };
const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const maxBytes = 8 * 1024 * 1024;

function bucket() { return (env as unknown as MediaEnv).MEDIA; }
function safeKey(value: string) { return value.replace(/[^a-zA-Z0-9/_-]/g, '-').replace(/\/{2,}/g, '/').replace(/^\/+|\/+$/g, ''); }

export async function GET(request: Request) {
  const key = safeKey(new URL(request.url).searchParams.get('key') ?? '');
  const store = bucket();
  if (!store || !key) return Response.json({ error: 'Archivo no encontrado' }, { status: 404 });
  const object = await store.get(key);
  if (!object) return Response.json({ error: 'Archivo no encontrado' }, { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('cache-control', 'public, max-age=31536000, immutable');
  headers.set('etag', object.httpEtag);
  return new Response(object.body, { headers });
}

export async function POST(request: Request) {
  const admin = getAdmin(request);
  if (!admin) return Response.json({ error: 'No autorizado' }, { status: 401 });
  const store = bucket();
  if (!store) return Response.json({ error: 'El almacenamiento de imágenes no está disponible todavía.' }, { status: 503 });
  const form = await request.formData();
  const file = form.get('file');
  const folder = safeKey(String(form.get('folder') || 'general')) || 'general';
  if (!(file instanceof File)) return Response.json({ error: 'Selecciona una imagen.' }, { status: 400 });
  if (!allowedTypes.has(file.type)) return Response.json({ error: 'Usa JPG, PNG o WebP.' }, { status: 415 });
  if (file.size > maxBytes) return Response.json({ error: 'La imagen no puede superar 8 MB.' }, { status: 413 });
  const extension = file.type === 'image/jpeg' ? 'jpg' : file.type.split('/')[1];
  const base = file.name.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'imagen';
  const key = `${folder}/${Date.now()}-${base}.${extension}`;
  await store.put(key, file.stream(), { httpMetadata: { contentType: file.type, cacheControl: 'public, max-age=31536000, immutable' }, customMetadata: { uploadedBy: admin } });
  return Response.json({ ok: true, key, url: `/api/media?key=${encodeURIComponent(key)}`, name: file.name, type: file.type, size: file.size });
}

export async function DELETE(request: Request) {
  const admin = getAdmin(request);
  if (!admin) return Response.json({ error: 'No autorizado' }, { status: 401 });
  const store = bucket();
  const key = safeKey(new URL(request.url).searchParams.get('key') ?? '');
  if (!store || !key) return Response.json({ error: 'Archivo no encontrado' }, { status: 404 });
  await store.delete(key);
  return Response.json({ ok: true });
}
