# SEO: Metadatos y OpenGraph Dinámico

**Objetivo**: Implementar SEO técnico con metadatos dinámicos, OpenGraph y Schema.org

## 🚀 Objetivo
- Metadatos dinámicos por página/ruta
- OpenGraph cards para redes sociales
- Schema.org structured data
- Mejorar SEO técnico y social sharing

## 📋 Requerimientos

### 1. Metadatos Dinámicos
```tsx
// Componente: MetaTags.tsx
interface MetaData {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonical?: string
}

export const useMetaData = (route: string) => {
  const data = METADATA[route] || DEFAULT
  return data
}
```

### 2. OpenGraph Dinámico
```tsx
// Ejemplo: Filosofía de Código
<meta property="og:title" content="FILO — Filosofía de Código" />
<meta property="og:description" content="Prácticas de ingeniería de software para desarrolladores que buscan excelencia" />
<meta property="og:image" content="/og/filosofia.jpg" />
<meta property="og:type" content="website" />
```

### 3. Schema.org Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "FILO — Filosofía de Código",
  "applicationCategory": "DeveloperTool",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

### 4. Integración con Next.js
```tsx
// app/page.tsx
import { useMetaData } from '@/lib/metadata'

export async function generateMetadata() {
  return {
    title: 'FILO — Filosofía de Código',
    description: 'Prácticas de ingeniería de software...',
    openGraph: {
      title: 'FILO — Filosofía de Código',
      description: '...',
      images: ['/og/filosofia.jpg']
    }
  }
}
```

### 5. Metadatos por Ruta
| Ruta | Title | Description | OG Image |
|------|-------|-------------|----------|
| `/` | FILO — Filosofía de Código | Portafolio principal | /og/home.jpg |
| `/filosofia` | Filosofía de Código | Principios y prácticas | /og/filosofia.jpg |
| `/portafolio` | Portafolio Profesional | Proyectos destacados | /og/portafolio.jpg |
| `/blog` | Blog de Ingeniería | Artículos técnicos | /og/blog.jpg |

### 6. Schema.org por Tipo
- **Home**: `WebSite`
- **Proyectos**: `SoftwareApplication`
- **Blog**: `BlogPosting`
- **Contacto**: `ContactPoint`

### 7. Herramientas de Validación
- Google Search Console
- Bing Webmaster Tools
- Meta Tags Validator
- Schema.org Validator

### 8. KPIs de SEO
- **Core Web Vitals**: LCP < 2.5s, INP < 200ms, CLS < 0.1
- **SEO Técnico**: Metadatos completos en 100% de rutas
- **Social Sharing**: OpenGraph en todas las páginas

## 📊 Métricas de Éxito

| Métrica | Objetivo |
|---------|----------|
| Metadatos completos | 100% de rutas |
| OpenGraph implementado | 100% de páginas |
| Schema.org validado | Sin errores |
| Core Web Vitals | GOOD en todos los métricos |

## 🛠️ Stack
- Next.js 14 (generateMetadata)
- React Helmet (fallback)
- Schema.org JSON-LD

---

**APROBADO**: Devuelve `APROBADO: #8 — HH:MM` para aplicar en GitHub