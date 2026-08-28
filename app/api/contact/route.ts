import { listContactLeads, saveContactLead, updateContactLeadStatus } from '../../../lib/content-db';
import { getAdmin } from '../../../lib/admin-auth';

const clean = (value: unknown, max: number) => typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function GET(request: Request) {
  if (!getAdmin(request)) return Response.json({ error: 'No autorizado' }, { status: 401 });
  try {
    return Response.json({ leads: await listContactLeads() });
  } catch (error) {
    console.error('[contact:read] D1 failed', { error: String(error), stack: (error as Error).stack });
    return Response.json({ error: 'No se pudieron cargar las solicitudes.' }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const lead = {
    name: clean(body?.name, 100),
    email: clean(body?.email, 160).toLowerCase(),
    phone: clean(body?.phone, 40),
    company: clean(body?.company, 120),
    service: clean(body?.service, 100),
    message: clean(body?.message, 2000),
  };

  if (!lead.name || !/^\S+@\S+\.\S+$/.test(lead.email) || !lead.service || !lead.message || body?.consent !== true) {
    return Response.json({ error: 'Completa los campos obligatorios y acepta el aviso de privacidad.' }, { status: 400 });
  }

  try {
    await saveContactLead(lead);
    return Response.json({ ok: true });
  } catch (error) {
    console.error('[contact:write] D1 failed', { error: String(error), stack: (error as Error).stack });
    return Response.json({ error: 'No pudimos guardar tu solicitud. Inténtalo nuevamente.' }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!getAdmin(request)) return Response.json({ error: 'No autorizado' }, { status: 401 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const id = Number(body?.id);
  const status = body?.status === 'contacted' ? 'contacted' : body?.status === 'new' ? 'new' : null;
  if (!Number.isInteger(id) || !status) return Response.json({ error: 'Solicitud inválida' }, { status: 400 });
  try { await updateContactLeadStatus(id, status); return Response.json({ ok: true }); }
  catch { return Response.json({ error: 'No se pudo actualizar la solicitud.' }, { status: 503 }); }
}
