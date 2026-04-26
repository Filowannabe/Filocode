/**
 * API Route para servir diccionarios de i18n desde public/locales/
 * Optimizada para exportación estática total.
 */

import { readFileSync } from 'fs';
import path from 'path';

export const dynamic = "force-static";

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es-CO' }];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  
  try {
    const filePath = path.join(process.cwd(), 'public', 'locales', `${locale}.json`);
    const fileContent = readFileSync(filePath, 'utf-8');
    
    return new Response(fileContent, { headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ error: 'Dictionary not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  }
}
