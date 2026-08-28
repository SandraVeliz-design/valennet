import { env } from 'cloudflare:workers';
import { defaultContent, type SiteContent } from '../content/defaults';
import { createContactLeadsTableSql, createContentTableSql } from '../db/schema';

type DatabaseEnv = { DB?: D1Database };

function database() {
  return (env as unknown as DatabaseEnv).DB;
}

function normalizeContent(value: Partial<SiteContent>): SiteContent {
  return {
    ...defaultContent,
    ...value,
    hero: { ...defaultContent.hero, ...(value.hero ?? {}) },
    about: {
      ...defaultContent.about,
      ...(value.about ?? {}),
      principles: Array.isArray(value.about?.principles) ? value.about.principles : defaultContent.about.principles,
    },
    services: Array.isArray(value.services) ? value.services : defaultContent.services,
    capacity: {
      ...defaultContent.capacity,
      ...(value.capacity ?? {}),
      items: Array.isArray(value.capacity?.items) ? value.capacity.items : defaultContent.capacity.items,
    },
    certifications: Array.isArray(value.certifications) ? value.certifications : defaultContent.certifications,
    projects: Array.isArray(value.projects) ? value.projects : defaultContent.projects,
    courses: Array.isArray(value.courses) ? value.courses : defaultContent.courses,
    training: { ...defaultContent.training, ...(value.training ?? {}) },
    contact: { ...defaultContent.contact, ...(value.contact ?? {}) },
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  const db = database();
  if (!db) return defaultContent;
  await db.prepare(createContentTableSql).run();
  const row = await db.prepare('SELECT data_json FROM site_content WHERE id = ?').bind(1).first<{ data_json: string }>();
  if (!row) return defaultContent;
  try { return normalizeContent(JSON.parse(row.data_json) as Partial<SiteContent>); } catch { return defaultContent; }
}

export async function saveSiteContent(content: SiteContent, user: string) {
  const db = database();
  if (!db) throw new Error('La base de datos no está disponible.');
  await db.prepare(createContentTableSql).run();
  await db.prepare(`
    INSERT INTO site_content (id, data_json, updated_at, updated_by)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET data_json = excluded.data_json, updated_at = excluded.updated_at, updated_by = excluded.updated_by
  `).bind(1, JSON.stringify(normalizeContent(content)), new Date().toISOString(), user).run();
}

export type ContactLead = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
};

export async function saveContactLead(lead: ContactLead) {
  const db = database();
  if (!db) throw new Error('La base de datos no está disponible.');
  await db.prepare(createContactLeadsTableSql).run();
  await db.prepare(`
    INSERT INTO contact_leads (name, email, phone, company, service, message, consent, created_at)
    VALUES (?, ?, ?, ?, ?, ?, 1, ?)
  `).bind(
    lead.name,
    lead.email,
    lead.phone ?? '',
    lead.company ?? '',
    lead.service,
    lead.message,
    new Date().toISOString(),
  ).run();
}

export type ContactLeadRecord = ContactLead & {
  id: number;
  status: string;
  created_at: string;
};

export async function listContactLeads() {
  const db = database();
  if (!db) throw new Error('La base de datos no está disponible.');
  await db.prepare(createContactLeadsTableSql).run();
  const result = await db.prepare(`
    SELECT id, name, email, phone, company, service, message, status, created_at
    FROM contact_leads
    ORDER BY id DESC
    LIMIT 100
  `).all<ContactLeadRecord>();
  return result.results ?? [];
}

export async function updateContactLeadStatus(id: number, status: 'new'|'contacted') {
  const db = database();
  if (!db) throw new Error('La base de datos no está disponible.');
  await db.prepare(createContactLeadsTableSql).run();
  await db.prepare('UPDATE contact_leads SET status = ? WHERE id = ?').bind(status, id).run();
}
