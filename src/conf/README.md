# Cookie Consent & Google Tag Manager - Guía para Desarrolladores

Esta guía te ayudará a entender cómo funciona el sistema de consentimiento de cookies y cómo crear eventos personalizados para tracking de marketing.

---

## Índice

1. [Qué es esto y por qué existe](#qué-es-esto-y-por-qué-existe)
2. [Cómo funciona el sistema](#cómo-funciona-el-sistema)
3. [Uso básico de cookieConsent.js](#uso-básico-de-cookieconsent)
4. [Crear eventos personalizados con dataLayer](#crear-eventos-personalizados-con-datalayer)
5. [Configurar eventos en Google Tag Manager](#configurar-eventos-en-google-tag-manager)
6. [Ejemplos prácticos](#ejemplos-prácticos)
7. [Debugging y testing](#debugging-y-testing)

---

## Qué es esto y por qué existe

### El problema
Las leyes europeas (GDPR) requieren que **pidas permiso al usuario antes de usar cookies de marketing/analytics**. Si no lo haces, puedes recibir multas de hasta €20M.

### La solución
Este sistema hace 3 cosas:
1. **Muestra un banner** pidiendo consentimiento al usuario
2. **Bloquea Google Ads y Analytics** hasta que el usuario acepte
3. **Registra eventos** que Google Tag Manager puede usar para tracking

---

## Cómo funciona el sistema

### Flujo de trabajo

```
Usuario entra al sitio
         ↓
[HTML] Google Consent Mode dice "DENY" a todo
         ↓
[React] Se inicializa vanilla-cookieconsent
         ↓
Usuario ve el banner de cookies
         ↓
Usuario acepta "Marketing"
         ↓
[cookieConsent.js] Actualiza Google Consent Mode a "GRANTED"
         ↓
[cookieConsent.js] Push evento "cookie_consent_update" a dataLayer
         ↓
[Google Tag Manager] Detecta el evento y activa etiquetas
         ↓
Google Ads empieza a trackear conversiones
```

### Componentes clave

| Componente | Qué hace | Dónde está |
|------------|----------|------------|
| **Google Consent Mode** | Bloquea cookies hasta tener permiso | `index.html` (antes de GTM) |
| **vanilla-cookieconsent** | Muestra el banner y guarda preferencias | `src/conf/cookieConsent.js` |
| **dataLayer** | Canal de comunicación con GTM | Variable global `window.dataLayer` |
| **Google Tag Manager** | Lee eventos y activa Google Ads/Analytics | Dashboard web de GTM |

---

## Uso básico de cookieConsent

### 1. Importar en tu aplicación

```javascript
// En tu App.tsx o archivo principal
import { initCookieConsent } from './conf/cookieConsent';

// Ejecutar cuando la app cargue
useEffect(() => {
  initCookieConsent();
}, []);
```

### 2. Qué hace initCookieConsent()

```javascript
// Internamente ejecuta:
CookieConsent.run({
  // 1. Define categorías de cookies
  categories: {
    necessary: { enabled: true, readOnly: true },  // Siempre activas
    analytics: {},                                  // Google Analytics
    marketing: {}                                   // Google Ads, Facebook Pixel
  },

  // 2. Cuando el usuario acepta/rechaza
  onConsent: ({ cookie }) => {
    // Actualiza Google Consent Mode
    window.gtag('consent', 'update', {
      ad_storage: cookie.categories.includes('marketing') ? 'granted' : 'denied'
    });

    // Envía evento a dataLayer
    window.dataLayer.push({
      event: 'cookie_consent_update',
      marketing_consent: cookie.categories.includes('marketing')
    });
  }
});
```

### 3. Métodos útiles de vanilla-cookieconsent

```javascript
import * as CookieConsent from 'vanilla-cookieconsent';

// Verificar si el usuario aceptó una categoría
const hasMarketing = CookieConsent.acceptedCategory('marketing');
if (hasMarketing) {
  // Cargar scripts de marketing
}

// Abrir el modal de preferencias programáticamente
CookieConsent.showPreferences();

// Obtener todas las preferencias actuales
const userPreferences = CookieConsent.getUserPreferences();
console.log(userPreferences);
// { accepted_categories: ['necessary', 'marketing'], rejected_categories: ['analytics'] }

// Resetear consentimiento (útil para testing)
CookieConsent.reset();
```

---

## Crear eventos personalizados con dataLayer

### ¿Qué es dataLayer?

`dataLayer` es un **array global** que actúa como mensajero entre tu código y Google Tag Manager.

```javascript
// Esto es lo que hace tu navegador
window.dataLayer = [];

// Tu código envía mensajes
window.dataLayer.push({ event: 'algo_pasó' });

// Google Tag Manager escucha y reacciona
```

### Anatomía de un evento

```javascript
window.dataLayer.push({
  event: 'nombre_del_evento',        // OBLIGATORIO: identificador único
  parametro1: 'valor',               // OPCIONAL: datos extra
  parametro2: 123,
  parametro3: true
});
```

### Ejemplo real: Trackear clic en botón de WhatsApp

#### Paso 1: En tu HTML/React, agrega el evento

```jsx
// ANTES (no se trackea)
<button onClick={() => window.open('https://wa.me/...')}>
  Contactar por WhatsApp
</button>

// DESPUÉS (se trackea)
<button
  id="whatsapp_cta_button"
  onClick={() => {
    // Primero enviamos el evento
    window.dataLayer.push({
      event: 'whatsapp_click',
      button_location: 'hero_section',
      button_text: 'Contactar por WhatsApp'
    });

    // Luego abrimos WhatsApp
    window.open('https://wa.me/34123456789');
  }}
>
  Contactar por WhatsApp
</button>
```

#### Paso 2: Verificar que funcione

Abre la consola del navegador:

```javascript
// Ver todo el dataLayer
console.log(window.dataLayer);

// Resultado esperado:
[
  { event: 'cookie_consent_update', marketing_consent: true },
  { event: 'whatsapp_click', button_location: 'hero_section', ... }
]
```

---

## Configurar eventos en Google Tag Manager

### 1. Crear Variables (si necesitas datos del evento)

**Dashboard GTM → Variables → Nueva variable de usuario**

```
Nombre: button_location
Tipo: Variable de capa de datos
Nombre de variable de la capa de datos: button_location
```

### 2. Crear Activador (trigger)

**Dashboard GTM → Activadores → Nuevo activador**

```
Nombre: WhatsApp Click
Tipo: Evento personalizado
Nombre del evento: whatsapp_click

(Opcional) Condiciones:
  - button_location = hero_section
```

### 3. Crear Etiqueta (tag)

**Dashboard GTM → Etiquetas → Nueva etiqueta**

```
Nombre: Google Ads - WhatsApp Conversion
Tipo: Conversión de Google Ads

ID de conversión: 11153899065
Etiqueta de conversión: 6ptMCNb62MwbE

Activador: WhatsApp Click + Marketing Consent Granted
```

### 4. Probar en Vista Previa

1. Click en **Vista previa** en GTM
2. Ingresa la URL de tu sitio
3. Haz clic en el botón de WhatsApp
4. Verifica que la etiqueta se haya disparado

---

## Ejemplos prácticos

### Ejemplo 1: Trackear envío de formulario

```javascript
// En tu componente de formulario
const handleSubmit = (e) => {
  e.preventDefault();

  // Enviar evento ANTES de hacer el submit real
  window.dataLayer.push({
    event: 'form_submission',
    form_name: 'contact_form',
    form_location: 'footer',
    user_email: email, // Solo si tienes consentimiento
  });

  // Luego enviar el formulario
  submitForm();
};
```

**En GTM:**
- Activador: Evento personalizado `form_submission`
- Etiqueta: Google Ads Conversión (Tipo: Contacto)

---

### Ejemplo 2: Trackear tiempo en página

```javascript
useEffect(() => {
  const timer = setTimeout(() => {
    window.dataLayer.push({
      event: 'user_engaged',
      time_on_page: 30, // segundos
    });
  }, 30000); // 30 segundos

  return () => clearTimeout(timer);
}, []);
```

**En GTM:**
- Activador: Evento personalizado `user_engaged`
- Etiqueta: Google Analytics 4 Event

---

### Ejemplo 3: Trackear scroll profundo

```javascript
useEffect(() => {
  const handleScroll = () => {
    const scrollPercent = (window.scrollY / document.body.scrollHeight) * 100;

    if (scrollPercent > 75 && !window.scrollTracked75) {
      window.scrollTracked75 = true; // Evitar disparar múltiples veces

      window.dataLayer.push({
        event: 'scroll_depth',
        scroll_percentage: 75,
      });
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

### Ejemplo 4: Trackear salida del sitio (exit intent)

```javascript
useEffect(() => {
  const handleMouseLeave = (e) => {
    if (e.clientY <= 0) { // Mouse sale por arriba
      window.dataLayer.push({
        event: 'exit_intent',
        page_url: window.location.href,
      });
    }
  };

  document.addEventListener('mouseleave', handleMouseLeave);
  return () => document.removeEventListener('mouseleave', handleMouseLeave);
}, []);
```

---

## Debugging y testing

### 1. Ver eventos en tiempo real

```javascript
// En la consola del navegador
window.dataLayer.forEach((item, index) => {
  console.log(`Evento ${index}:`, item);
});
```

### 2. Extensión de Chrome para GTM

Instala **Google Tag Assistant Legacy** para ver:
- Qué etiquetas se dispararon
- Qué eventos se detectaron
- Errores de configuración

### 3. Verificar consentimiento

```javascript
// Ver si el usuario aceptó marketing
import * as CookieConsent from 'vanilla-cookieconsent';

console.log('Marketing aceptado:', CookieConsent.acceptedCategory('marketing'));

// Ver estado de Google Consent Mode
window.gtag('get', 'G-XXXXXXXX', 'consent', (consent) => {
  console.log('Estado de consentimiento:', consent);
});
```

### 4. Testing en desarrollo

```javascript
// Forzar reset de cookies para testing
import * as CookieConsent from 'vanilla-cookieconsent';

// Agregar botón temporal
const resetButton = document.createElement('button');
resetButton.textContent = 'Reset Cookies';
resetButton.onclick = () => {
  CookieConsent.reset();
  window.location.reload();
};
document.body.appendChild(resetButton);
```

---

## Errores comunes y soluciones

### Error 1: "dataLayer is not defined"

**Problema:** Estás haciendo push antes de que GTM cargue.

**Solución:**
```javascript
// Siempre inicializa primero
window.dataLayer = window.dataLayer || [];

window.dataLayer.push({ event: 'mi_evento' });
```

---

### Error 2: Los eventos no llegan a GTM

**Checklist:**
- [ ] ¿GTM está publicado (no solo en vista previa)?
- [ ] ¿El nombre del evento coincide exactamente?
- [ ] ¿El activador tiene condiciones que bloquean el evento?
- [ ] ¿El usuario aceptó las cookies de marketing?

---

### Error 3: Google Ads no registra conversiones

**Checklist:**
- [ ] ¿El usuario aceptó "Marketing" en el banner?
- [ ] ¿El activador incluye "Marketing Consent Granted"?
- [ ] ¿Pasaron más de 24h desde que creaste la conversión en Google Ads?
- [ ] ¿Estás en modo incógnito o con bloqueadores de ads? (desactívalos)

---

## Recursos adicionales

- [Documentación vanilla-cookieconsent](https://github.com/orestbida/cookieconsent)
- [Google Consent Mode v2](https://support.google.com/tagmanager/answer/10718549)
- [DataLayer Developer Guide](https://developers.google.com/tag-platform/tag-manager/datalayer)
- [Google Tag Manager Academy](https://tagmanager.google.com/academy/)

---

## Contacto

Si tienes dudas sobre esta implementación, contacta a:
- **Email:** contacto@imperiohub.com
- **Desarrollador responsable:** [Tu nombre]

---

**Última actualización:** Diciembre 2025
