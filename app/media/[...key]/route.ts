import { env } from 'cloudflare:workers';

function safeKey(value: string) {
  return value.replace(/[^a-zA-Z0-9/_-]/g, '-').replace(/\/{2,}/g, '/').replace(/^\/+|\/+$/g, '');
}

export async function GET(_request: Request, context: { params: Promise<{ key: string[] }> }) {
  const params = await context.params;
  const rawKey = Array.isArray(params.key) ? params.key.join('/') : String(params.key ?? '');
  const key = safeKey(rawKey);
  const store = (env as unknown as { MEDIA?: R2Bucket }).MEDIA;
  if (!store || !key) return new Response('Archivo no encontrado', { status: 404 });
  const object = await store.get(key);
  if (!object) return new Response('Archivo no encontrado', { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('cache-control', 'public, max-age=31536000, immutable');
  headers.set('etag', object.httpEtag);
  return new Response(object.body, { headers });
}
