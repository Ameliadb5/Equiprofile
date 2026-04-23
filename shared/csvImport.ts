export function normalizeImportedEmail(raw: string | null | undefined): string {
  if (!raw) return "";
  let value = raw.replace(/^\uFEFF/, "").trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1).trim();
  }
  return value.replace(/\s+/g, "").toLowerCase();
}
