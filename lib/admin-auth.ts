import { env } from 'cloudflare:workers';

type AuthEnv = { ADMIN_EMAIL?: string };

export function getAdmin(request: Request) {
  const email = (
    request.headers.get('cf-access-authenticated-user-email') ??
    request.headers.get('oai-authenticated-user-email')
  )?.toLowerCase();
  const allowed = (env as unknown as AuthEnv).ADMIN_EMAIL?.toLowerCase();
  // Cloudflare Access has already restricted this route to the administrator
  // policy. In production, accept the identity asserted by Access when the
  // optional Worker allowlist variable has not been configured yet.
  if (!allowed) {
    if (email && request.headers.has('cf-access-authenticated-user-email')) return email;
    return process.env.NODE_ENV === 'development' ? 'local-admin' : null;
  }
  return email === allowed ? email : null;
}
