import { defaultContent, type SiteContent } from '../../../../content/defaults';
import { getAdmin } from '../../../../lib/admin-auth';
import { getSiteContent, saveSiteContent } from '../../../../lib/content-db';

export async function GET() {
  try { return Response.json(await getSiteContent()); }
  catch { return Response.json(defaultContent); }
}

export async function POST(request: Request) {
  const admin = getAdmin(request);
  if (!admin) return Response.json({ error: 'No autorizado' }, { status: 401 });
  const content = await request.json() as SiteContent;
  if (!content?.hero?.title || !Array.isArray(content.services)) return Response.json({ error: 'Contenido inválido' }, { status: 400 });
  try { await saveSiteContent({ ...defaultContent, ...content }, admin); return Response.json({ ok: true }); }
  catch { return Response.json({ error: 'La persistencia todavía no está disponible.' }, { status: 503 }); }
}
