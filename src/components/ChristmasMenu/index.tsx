import "./ChristmasMenu.css";
import logoMenu from "../../assets/logo-menu.png";
import { Helmet } from "react-helmet";

interface MenuItem {
  name: string;
  details?: string;
  priceSmall?: string;
  priceLarge?: string;
  price?: string;
}

interface MenuSection {
  title: string;
  emoji: string;
  items: MenuItem[];
}

interface Combo {
  name: string;
  items: string[];
  price: string;
}

const ChristmasMenu = () => {
  const menuSections: MenuSection[] = [
    {
      title: "Lasañas",
      emoji: "🍝",
      items: [
        {
          name: "Lasaña de Res",
          priceSmall: "RD$1,300",
          priceLarge: "RD$2,000",
        },
        {
          name: "Lasaña de Pollo",
          priceSmall: "RD$1,500",
          priceLarge: "RD$2,300",
        },
      ],
    },
    {
      title: "Pastelones",
      emoji: "🍽️",
      items: [
        {
          name: "Pastelón de Plátano Maduro",
          priceSmall: "RD$1,200",
          priceLarge: "RD$1,900",
        },
        {
          name: "Pastelón de Papa",
          priceSmall: "RD$1,000",
          priceLarge: "RD$1,700",
        },
      ],
    },
    {
      title: "Ensaladas",
      emoji: "🥗",
      items: [
        {
          name: "Ensalada Rusa",
          details: "blanca, roja o mixta",
          price: "RD$800",
        },
        { name: "Ensalada de Pasta", price: "RD$800" },
      ],
    },
    {
      title: "Arroces",
      emoji: "🍚",
      items: [
        { name: "Arroz Navideño con nueces", details: "5 lb", price: "RD$900" },
        { name: "Moro de Guandules", details: "5 lb", price: "RD$750" },
      ],
    },
    {
      title: "Carnes",
      emoji: "🍖",
      items: [
        {
          name: "Cerdo asado por libra",
          details: "mínimo 5 lb",
          price: "RD$600",
        },
        {
          name: "Pavo o Pollo en Salsa Ragú",
          details: "Bandeja pequeña",
          price: "RD$1,100",
        },
      ],
    },
    {
      title: "Otros",
      emoji: "⭐",
      items: [
        { name: "Niños Envueltos", details: "12 unidades", price: "RD$900" },
      ],
    },
  ];

  const combos: Combo[] = [
    {
      name: "Combo 1 – Tradicional",
      items: [
        "Lasaña de Res (pequeña)",
        "Ensalada Rusa",
        "Arroz Navideño (5 lb)",
      ],
      price: "RD$2,800",
    },
    {
      name: "Combo 2 – Cena Premium",
      items: [
        "Lasaña de Pollo (pequeña)",
        "Ensalada de Pasta",
        "Moro de Guandules (5 lb)",
        "2 lb de Cerdo Asado",
      ],
      price: "RD$4,300",
    },
    {
      name: "Combo 3 – Familia Grande",
      items: [
        "Lasaña de Res (grande)",
        "Ensalada Rusa",
        "Moro de Guandules (5 lb)",
        "Niños Envueltos (12u)",
      ],
      price: "RD$3,950",
    },
    {
      name: "Combo 4 – Navideño Especial",
      items: [
        "Lasaña de Pollo (grande)",
        "Ensalada Rusa",
        "Arroz Navideño (5 lb)",
        "Pavo/Pollo en Salsa Ragú",
      ],
      price: "RD$5,000",
    },
    {
      name: "Combo 5 – Antojos Mixtos",
      items: [
        "Pastelón de Plátano (pequeño)",
        "Pastelón de Papa (pequeño)",
        "Ensalada de Pasta",
        "Arroz Navideño (5 lb)",
      ],
      price: "RD$3,700",
    },
  ];

  const siteUrl = window.location.origin;
  const imageUrl = `${siteUrl}/logo-menu.png`;

  return (
    <>
      <Helmet>
        <title>La Cocina de Lucy - Menú Navideño 2025</title>
        <meta name="description" content="Descubre nuestro menú navideño 2025. Lasañas, pastelones, ensaladas y más. ¡Haz de tu Navidad un momento especial!" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/menu`} />
        <meta property="og:title" content="La Cocina de Lucy - Menú Navideño 2025" />
        <meta property="og:description" content="Descubre nuestro menú navideño 2025. Lasañas, pastelones, ensaladas y más. ¡Haz de tu Navidad un momento especial!" />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="La Cocina de Lucy - Menú Navideño 2025" />
        <meta name="twitter:description" content="Descubre nuestro menú navideño 2025. Lasañas, pastelones, ensaladas y más. ¡Haz de tu Navidad un momento especial!" />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>

      <div className="menu-body">
        <div className="menu-container">
          <div className="header">
            <div className="logo-space">
              <img
                src={logoMenu}
                alt="La Cocina de Lucy"
                className="logo-image"
              />
            </div>
            <h1>La Cocina de Lucy</h1>
            <h2>Menú Navideño 2025</h2>
            <p>✨ SABOR Y TRADICIÓN ✨</p>
          </div>

        <div className="content">
          <div className="section">
            <h3 className="section-title">🍽️ Platos Individuales</h3>

            {menuSections.map((section, index) => (
              <div key={index} className="subsection">
                <h4 className="subsection-title">
                  {section.emoji} {section.title}
                </h4>
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="menu-item">
                    <div>
                      <div className="item-name">{item.name}</div>
                      {item.details && (
                        <div className="item-details">{item.details}</div>
                      )}
                    </div>
                    <div className="item-price">
                      {item.priceSmall && item.priceLarge ? (
                        <>
                          <span className="price-label">Pequeña:</span>{" "}
                          {item.priceSmall}{" "}
                          <span className="price-separator">|</span>{" "}
                          <span className="price-label">Grande:</span>{" "}
                          {item.priceLarge}
                        </>
                      ) : (
                        item.price
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="section">
            <h3 className="section-title">🎁 Combos (Para 5–10 Personas)</h3>
            {combos.map((combo, index) => (
              <div key={index} className="combo-item">
                <div className="combo-header">
                  <h4 className="combo-name">{combo.name}</h4>
                  <div className="combo-price">{combo.price}</div>
                </div>
                <ul className="combo-items">
                  {combo.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer">
          <h3 className="footer-title">Condiciones de Pedido</h3>
          <div className="decorative-line"></div>
          <p className="footer-text">
            📞 Pedidos: <span className="highlight">849-535-7777</span>
          </p>
          <p className="footer-text">
            📅 Encargos con{" "}
            <span className="highlight">48 horas de anticipación</span>
          </p>
          <p className="footer-text">
            💰 Se requiere un <span className="highlight">50% de adelanto</span>
          </p>

          <div className="cta-container">
            <a href="tel:8495357777" className="cta-button primary">
              📞 Llamar Ahora
            </a>
            <a
              href="https://wa.me/18495357777"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              💬 WhatsApp
            </a>
          </div>

          <div className="decorative-line"></div>
          <p
            className="footer-text"
            style={{ marginTop: "20px", fontSize: "14px" }}
          >
            ¡Haz de tu Navidad un momento especial con La Cocina de Lucy! 🎄✨
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ChristmasMenu;
