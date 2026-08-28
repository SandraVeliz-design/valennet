import { env } from 'cloudflare:workers';

type AuthEnv = { ADMIN_EMAIL?: string };

export function getAdmin(request: Request) {
  const email = (
    request.headers.get('cf-access-authenticated-user-email') ??
    request.headers.get('oai-authenticated-user-email')
  )?.toLowerCase();
  const allowed = (env as unknown as AuthEnv).ADMIN_EMAIL?.toLowerCase();
  if (!allowed) return process.env.NODE_ENV === 'development' ? 'local-admin' : null;
  return email === allowed ? email : null;
}
