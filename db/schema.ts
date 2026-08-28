export const createContentTableSql = `
  CREATE TABLE IF NOT EXISTS site_content (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    data_json TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    updated_by TEXT
  )
`;

export const createContactLeadsTableSql = `
  CREATE TABLE IF NOT EXISTS contact_leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service TEXT NOT NULL,
    message TEXT NOT NULL,
    consent INTEGER NOT NULL DEFAULT 0 CHECK (consent = 1),
    status TEXT NOT NULL DEFAULT 'new',
    created_at TEXT NOT NULL
  )
`;
