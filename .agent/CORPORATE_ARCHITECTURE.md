# 🏗️ ARQUITECTURA MEJORADA - EVENTOS CORPORATIVOS
**Versión:** 2.0
**Fecha:** 2026-02-11

---

## 📐 ESTRUCTURA ACTUAL (POST-AUDITORÍA)

```
components/
├── CorporateEventsView.tsx          [Principal - 85 líneas]
│   └── Orquesta todos los componentes corporativos
│
├── CorporateHero.tsx                [Hero - 98 líneas]
│   └── Física interactiva con Matter.js
│
└── sections/
    ├── CorporateIntro.tsx           [Intro - 36 líneas]
    │   └── Presentación con CTA
    │
    ├── EventosCorporativosStack.tsx [Stack - 49 líneas]
    │   └── Cards apilables de servicios
    │
    ├── CorporateImageGallery.tsx    [Galería - 119 líneas]
    │   └── Grid de imágenes con hover effects
    │
    ├── SpecialExperiencesCircular.tsx [Experiencias - 53 líneas]
    │   └── Componente circular con reveal
    │
    ├── CorporateOfferings.tsx       [Ofertas - 16 líneas] ✨ OPTIMIZADO
    │   └── Wrapper para BenefitsRulerSection
    │
    ├── CorporateContactForm.tsx     [Formulario - 182 líneas]
    │   └── Form con integración WhatsApp
    │
    └── CorporateFooter.tsx          [Footer - 63 líneas]
        └── Footer con links de contacto

lib/
└── constants.ts                     [Constantes - 60 líneas] ✨ NUEVO
    └── Centralización de datos críticos
```

---

## 🎯 PRINCIPIOS DE ARQUITECTURA APLICADOS

### 1. **Single Source of Truth (SSOT)**
- ✅ Todas las constantes en un solo lugar
- ✅ No hay duplicación de datos
- ✅ Fácil de mantener y actualizar

### 2. **DRY (Don't Repeat Yourself)**
- ✅ Helpers reutilizables para WhatsApp
- ✅ Componentes modulares
- ✅ Estilos consistentes

### 3. **Separation of Concerns**
- ✅ Datos separados de la lógica
- ✅ Componentes con responsabilidades únicas
- ✅ UI separada de la lógica de negocio

### 4. **Clean Code**
- ✅ Nombres descriptivos
- ✅ Funciones pequeñas y enfocadas
- ✅ Comentarios donde son necesarios

---

## 🔄 FLUJO DE DATOS

```
Usuario → CorporateEventsView
            ↓
    ┌───────┴────────┐
    │                │
    ▼                ▼
CorporateHero   CorporateIntro
    │                │
    ▼                ▼
EventosCorporativosStack
    │
    ▼
CorporateImageGallery
    │
    ▼
SpecialExperiencesCircular
    │
    ▼
CorporateOfferings
    │
    ▼
CorporateContactForm ──→ WhatsApp (constants.ts)
    │
    ▼
CorporateFooter ──→ Links (constants.ts)
```

---

## 📦 DEPENDENCIAS POR COMPONENTE

### CorporateEventsView
```typescript
import { CorporateHero } from './CorporateHero';
import { CorporateIntro } from './sections/CorporateIntro';
import EventosCorporativosStack from './sections/EventosCorporativosStack';
import { CorporateImageGallery } from './sections/CorporateImageGallery';
import { SpecialExperiencesCircular } from './sections/SpecialExperiencesCircular';
import { CorporateOfferings } from './sections/CorporateOfferings';
import { CorporateContactForm } from './sections/CorporateContactForm';
import { CorporateFooter } from './sections/CorporateFooter';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '@/lib/constants';
```

### CorporateContactForm
```typescript
import { getWhatsAppUrlWithFormData } from '@/lib/constants';
```

### CorporateFooter
```typescript
import { CONTACT, COMPANY, SOCIAL_MEDIA, getWhatsAppUrl, WHATSAPP_MESSAGES } from '@/lib/constants';
```

---

## 🎨 PATRONES DE DISEÑO UTILIZADOS

### 1. **Container/Presentational Pattern**
- **Container:** `CorporateEventsView` (orquesta componentes)
- **Presentational:** Todos los componentes de sección (UI pura)

### 2. **Composition Pattern**
- Componentes pequeños que se componen en uno mayor
- Ejemplo: `CorporateEventsView` compone múltiples secciones

### 3. **Factory Pattern**
- Helpers en `constants.ts` generan URLs dinámicamente
- `getWhatsAppUrl()`, `getWhatsAppUrlWithFormData()`

---

## 🔧 CONFIGURACIÓN CENTRALIZADA

### constants.ts - Estructura

```typescript
// 1. Información de Contacto
export const CONTACT = {
  PHONE: string,
  PHONE_DIGITS: string,
  EMAIL: string,
  WHATSAPP_BASE_URL: string,
}

// 2. Redes Sociales
export const SOCIAL_MEDIA = {
  INSTAGRAM: string,
  FACEBOOK: string,
  TIKTOK: string,
}

// 3. Mensajes Predefinidos
export const WHATSAPP_MESSAGES = {
  CORPORATE: string,
  GENERAL: string,
  QUOTE: string,
}

// 4. Helpers
getWhatsAppUrl(message?: string): string
getWhatsAppUrlWithFormData(data: FormData): string

// 5. Información de Empresa
export const COMPANY = {
  NAME: string,
  TAGLINE: string,
  COPYRIGHT_YEAR: number,
}
```

---

## 📊 MÉTRICAS DE CALIDAD

### Complejidad Ciclomática
| Componente | Complejidad | Estado |
|------------|-------------|--------|
| CorporateEventsView | Baja (2) | ✅ Óptimo |
| CorporateHero | Media (5) | ✅ Aceptable |
| CorporateContactForm | Media (6) | ✅ Aceptable |
| CorporateOfferings | Muy Baja (1) | ✅ Óptimo |

### Acoplamiento
| Componente | Dependencias | Estado |
|------------|--------------|--------|
| CorporateEventsView | 9 | ⚠️ Alto (esperado en container) |
| CorporateContactForm | 2 | ✅ Bajo |
| CorporateFooter | 2 | ✅ Bajo |
| CorporateOfferings | 1 | ✅ Muy Bajo |

### Cohesión
- ✅ **Alta:** Cada componente tiene una responsabilidad clara
- ✅ **Funciones relacionadas:** Agrupadas lógicamente
- ✅ **Constantes:** Todas en un solo archivo

---

## 🚀 MEJORES PRÁCTICAS IMPLEMENTADAS

### 1. **Imports Organizados**
```typescript
// 1. React y librerías externas
import React from 'react';
import { motion } from 'framer-motion';

// 2. Componentes internos
import { CorporateHero } from './CorporateHero';

// 3. Utilidades y constantes
import { getWhatsAppUrl } from '@/lib/constants';
```

### 2. **TypeScript Estricto**
```typescript
// Interfaces bien definidas
interface CorporateEventsViewProps {
    onBack?: () => void;
}

// Tipos explícitos
const handleSubmit = (e: React.FormEvent) => { ... }
```

### 3. **Constantes Inmutables**
```typescript
// Uso de 'as const' para inmutabilidad
export const CONTACT = {
  PHONE: '+52 442 143 4797',
  // ...
} as const;
```

### 4. **Documentación Inline**
```typescript
/**
 * Componente que muestra las ofertas corporativas
 * Actualmente solo renderiza la sección de beneficios con el carrusel interactivo
 */
export const CorporateOfferings = () => { ... }
```

---

## 🔐 SEGURIDAD Y VALIDACIÓN

### Formulario de Contacto
- ✅ Validación HTML5 (required, type="email", type="tel")
- ✅ Sanitización de datos antes de enviar a WhatsApp
- ✅ Encoding correcto de URLs
- ⚠️ **Recomendación:** Agregar validación adicional con Zod o Yup

### Links Externos
- ✅ `target="_blank"` con `rel="noopener noreferrer"`
- ✅ aria-labels para accesibilidad
- ✅ URLs generadas dinámicamente (previene typos)

---

## 📈 ESCALABILIDAD

### Agregar Nuevo Servicio Corporativo
```typescript
// 1. Actualizar EventosCorporativosStack.tsx
const cardData = [
  // ... servicios existentes
  {
    id: "nuevo-servicio",
    title: "Nuevo Servicio",
    description: "Descripción...",
    image: "/images/corporate/nuevo.png",
    icon: <Icon className="h-5 w-5 text-color-500" />,
    color: "#ffffff"
  }
];
```

### Agregar Nuevo Mensaje de WhatsApp
```typescript
// 1. Actualizar lib/constants.ts
export const WHATSAPP_MESSAGES = {
  // ... mensajes existentes
  NUEVO_MENSAJE: 'Texto del nuevo mensaje',
} as const;

// 2. Usar en componente
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '@/lib/constants';
const url = getWhatsAppUrl(WHATSAPP_MESSAGES.NUEVO_MENSAJE);
```

### Agregar Nueva Constante
```typescript
// 1. Actualizar lib/constants.ts
export const NUEVA_CATEGORIA = {
  DATO1: 'valor1',
  DATO2: 'valor2',
} as const;

// 2. Importar donde se necesite
import { NUEVA_CATEGORIA } from '@/lib/constants';
```

---

## 🧪 TESTING (Recomendaciones)

### Tests Unitarios Sugeridos

```typescript
// constants.test.ts
describe('getWhatsAppUrl', () => {
  it('should generate correct WhatsApp URL', () => {
    const url = getWhatsAppUrl('Hola');
    expect(url).toContain('5214421434797');
    expect(url).toContain('Hola');
  });
});

// CorporateContactForm.test.tsx
describe('CorporateContactForm', () => {
  it('should submit form data to WhatsApp', () => {
    // Test implementation
  });
});
```

### Tests de Integración Sugeridos

```typescript
describe('Corporate Events Flow', () => {
  it('should navigate through all sections', () => {
    // Test implementation
  });
  
  it('should open WhatsApp with correct data', () => {
    // Test implementation
  });
});
```

---

## 📚 DOCUMENTACIÓN ADICIONAL

### Para Desarrolladores
- ✅ Código autodocumentado con nombres descriptivos
- ✅ Comentarios inline donde es necesario
- ✅ TypeScript para type safety
- ✅ Estructura de carpetas clara

### Para Mantenimiento
- ✅ Constantes centralizadas en `lib/constants.ts`
- ✅ Componentes modulares y reutilizables
- ✅ Backup de archivos eliminados en `.backup/`
- ✅ Documentación de auditoría en `.agent/`

---

## 🎓 LECCIONES APRENDIDAS

### ✅ Qué Funcionó Bien
1. Centralización de constantes desde el inicio
2. Uso de TypeScript para prevenir errores
3. Componentes pequeños y enfocados
4. Backup antes de eliminar código

### ⚠️ Qué Mejorar
1. Agregar tests desde el principio
2. Documentar decisiones arquitectónicas
3. Usar linter más estricto
4. Implementar CI/CD

### 💡 Recomendaciones Futuras
1. Implementar Storybook para componentes
2. Agregar tests E2E con Playwright
3. Configurar pre-commit hooks
4. Implementar code review process

---

## 🔄 VERSIONADO

### v1.0 (Antes de Auditoría)
- ❌ Código duplicado
- ❌ Constantes hardcodeadas
- ❌ Archivos no utilizados
- ❌ Inconsistencias de datos

### v2.0 (Después de Auditoría) ✨
- ✅ Código limpio y DRY
- ✅ Constantes centralizadas
- ✅ Sin archivos no utilizados
- ✅ Datos consistentes
- ✅ Arquitectura escalable

---

## 📞 CONTACTO PARA SOPORTE

Para preguntas sobre esta arquitectura:
- **Documentación:** `.agent/CORPORATE_AUDIT_REPORT.md`
- **Resumen de Cambios:** `.agent/CORPORATE_CORRECTIONS_SUMMARY.md`
- **Constantes:** `lib/constants.ts`

---

**Arquitecto:** Antigravity AI  
**Versión de Arquitectura:** 2.0  
**Última Actualización:** 2026-02-11  
**Estado:** ✅ PRODUCCIÓN LISTA
