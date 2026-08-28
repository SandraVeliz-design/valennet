import { env } from 'cloudflare:workers';

type AuthEnv = { ADMIN_EMAIL?: string };

export function getAdmin(request: Request) {
  const email = (
    request.headers.get('cf-access-authenticated-user-email') ??
    request.headers.get('oai-authenticated-user-email')
  )?.toLowerCase();
  const allowed = (env as unknown as AuthEnv).ADMIN_EMAIL?.toLowerCase();
  if (request.headers.has('cf-access-jwt-assertion')) return email ?? 'access-user';
  // Cloudflare Access already restricts this route to the administrator policy.
  // If the optional allowlist variable is absent, trust the identity asserted by Access.
  if (!allowed) {
    if (email && request.headers.has('cf-access-authenticated-user-email')) return email;
    if (request.headers.has('cf-access-jwt-assertion')) return 'access-user';
    return process.env.NODE_ENV === 'development' ? 'local-admin' : null;
  }
  return email === allowed ? email : null;
}
