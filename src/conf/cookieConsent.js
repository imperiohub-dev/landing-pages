import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";

export const initCookieConsent = () => {
  CookieConsent.run({
    guiOptions: {
      consentModal: {
        layout: "box inline",
        position: "bottom right",
        flipButtons: false,
      },
      preferencesModal: {
        layout: "box",
      },
    },

    categories: {
      necessary: {
        enabled: true,
        readOnly: true,
      },
      analytics: {},
      marketing: {},
    },

    language: {
      default: "es",
      translations: {
        es: {
          consentModal: {
            title: "🍪 Usamos Cookies",
            description:
              "Utilizamos cookies esenciales para el funcionamiento del sitio y cookies de marketing para mostrar anuncios relevantes y medir su efectividad.",
            acceptAllBtn: "Aceptar todas",
            acceptNecessaryBtn: "Solo esenciales",
            showPreferencesBtn: "Gestionar preferencias",
            footer: '<a href="/politica-privacidad">Política de Privacidad</a>',
          },
          preferencesModal: {
            title: "Preferencias de Cookies",
            acceptAllBtn: "Aceptar todas",
            acceptNecessaryBtn: "Rechazar todas",
            savePreferencesBtn: "Guardar preferencias",
            closeIconLabel: "Cerrar",
            sections: [
              {
                title: "Uso de Cookies",
                description:
                  "Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Puedes elegir qué categorías de cookies deseas permitir.",
              },
              {
                title: "Cookies Estrictamente Necesarias",
                description:
                  "Estas cookies son esenciales para el funcionamiento básico del sitio web y no se pueden desactivar.",
                linkedCategory: "necessary",
              },
              {
                title: "Cookies de Análisis",
                description:
                  "Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web mediante la recopilación y el informe de información de forma anónima.",
                linkedCategory: "analytics",
              },
              {
                title: "Cookies de Marketing",
                description:
                  "Estas cookies se utilizan para mostrar anuncios relevantes y medir la efectividad de nuestras campañas publicitarias.",
                linkedCategory: "marketing",
                cookieTable: {
                  headers: {
                    name: "Cookie",
                    domain: "Dominio",
                    desc: "Descripción",
                  },
                  body: [
                    {
                      name: "_gcl_*",
                      domain: "sell.imperiohub.com",
                      desc: "Google Ads - Seguimiento de conversiones",
                    },
                  ],
                },
              },
              {
                title: "Más información",
                description:
                  'Para cualquier consulta relacionada con nuestra política de cookies y tus opciones, contáctanos en <a href="mailto:contacto@imperiohub.com">contacto@imperiohub.com</a>.',
              },
            ],
          },
        },
      },
    },

    onConsent: ({ cookie }) => {
      console.log("Consentimiento actualizado:", cookie);

      // Actualizar Google Consent Mode v2
      if (typeof window.gtag !== "undefined") {
        window.gtag("consent", "update", {
          analytics_storage: cookie.categories.includes("analytics")
            ? "granted"
            : "denied",
          ad_storage: cookie.categories.includes("marketing")
            ? "granted"
            : "denied",
          ad_user_data: cookie.categories.includes("marketing")
            ? "granted"
            : "denied",
          ad_personalization: cookie.categories.includes("marketing")
            ? "granted"
            : "denied",
        });

        console.log("Google Consent Mode actualizado");
      }

      // Push evento a dataLayer para GTM
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "cookie_consent_update",
        analytics_consent: cookie.categories.includes("analytics"),
        marketing_consent: cookie.categories.includes("marketing"),
      });
    },

    onChange: ({ cookie, changedCategories }) => {
      console.log("Preferencias cambiadas:", changedCategories);

      // Actualizar consentimiento cuando cambian las preferencias
      if (typeof window.gtag !== "undefined") {
        window.gtag("consent", "update", {
          analytics_storage: cookie.categories.includes("analytics")
            ? "granted"
            : "denied",
          ad_storage: cookie.categories.includes("marketing")
            ? "granted"
            : "denied",
          ad_user_data: cookie.categories.includes("marketing")
            ? "granted"
            : "denied",
          ad_personalization: cookie.categories.includes("marketing")
            ? "granted"
            : "denied",
        });
      }
    },
  });
};
