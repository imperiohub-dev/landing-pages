import "./styles.scss";
import logoMenu from "../../../assets/logo-menu.png";
import { Helmet } from "react-helmet";
import menuData from "../menuData.json";
import type { MenuData } from "../types";

const ChristmasMenuV2 = () => {
  const { menuSections, combos } = menuData as MenuData;

  const siteUrl = window.location.origin;
  const imageUrl = `${siteUrl}/logo-menu.png`;

  return (
    <>
      <Helmet>
        <title>Menú Navideño 2025 - La Cocina de Lucy</title>
        <meta name="description" content="Descubre nuestro delicioso menú navideño 2025. Platos tradicionales llenos de sabor y tradición para tu celebración." />

        {/* OPEN GRAPH */}
        <meta property="og:title" content="Menú Navideño 2025 - La Cocina de Lucy" />
        <meta property="og:description" content="Descubre nuestro delicioso menú navideño 2025. Platos tradicionales llenos de sabor y tradición para tu celebración." />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />

        {/* TWITTER CARD */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Menú Navideño 2025 - La Cocina de Lucy" />
        <meta name="twitter:description" content="Descubre nuestro delicioso menú navideño 2025. Platos tradicionales llenos de sabor y tradición para tu celebración." />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>

      <div className="christmas-menu-v2">
        <div className="christmas-menu-v2__container">
          {/* Header */}
          <header className="christmas-menu-v2__header">
            <div className="christmas-menu-v2__logo-wrapper">
              <img
                src={logoMenu}
                alt="La Cocina de Lucy"
                className="christmas-menu-v2__logo"
              />
            </div>
            <h1 className="christmas-menu-v2__title">La Cocina de Lucy</h1>
            <h2 className="christmas-menu-v2__subtitle">Menú Navideño 2025</h2>
            <p className="christmas-menu-v2__tagline">SABOR Y TRADICIÓN</p>
          </header>

          {/* Menu Sections */}
          <main className="christmas-menu-v2__content">
            <section className="christmas-menu-v2__section">
              <h3 className="christmas-menu-v2__section-title">
                Platos Individuales
              </h3>

              {menuSections.map((section, index) => (
                <div key={index} className="christmas-menu-v2__category">
                  <h4 className="christmas-menu-v2__category-title">
                    <span className="christmas-menu-v2__category-emoji">
                      {section.emoji}
                    </span>
                    {section.title}
                  </h4>

                  <div className="christmas-menu-v2__items">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="christmas-menu-v2__item">
                        <div className="christmas-menu-v2__item-info">
                          <h5 className="christmas-menu-v2__item-name">
                            {item.name}
                          </h5>
                          {item.details && (
                            <p className="christmas-menu-v2__item-details">
                              {item.details}
                            </p>
                          )}
                        </div>
                        <div className="christmas-menu-v2__item-price">
                          {item.priceSmall && item.priceLarge ? (
                            <div className="christmas-menu-v2__item-price-group">
                              <span className="christmas-menu-v2__price-option">
                                <span className="christmas-menu-v2__price-label">
                                  Pequeña:
                                </span>
                                <span className="christmas-menu-v2__price-value">
                                  {item.priceSmall}
                                </span>
                              </span>
                              <span className="christmas-menu-v2__price-divider">
                                |
                              </span>
                              <span className="christmas-menu-v2__price-option">
                                <span className="christmas-menu-v2__price-label">
                                  Grande:
                                </span>
                                <span className="christmas-menu-v2__price-value">
                                  {item.priceLarge}
                                </span>
                              </span>
                            </div>
                          ) : (
                            <span className="christmas-menu-v2__price-single">
                              {item.price}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Combos Section */}
            <section className="christmas-menu-v2__section christmas-menu-v2__section--combos">
              <h3 className="christmas-menu-v2__section-title">
                Combos (Para 5–10 Personas)
              </h3>

              <div className="christmas-menu-v2__combos">
                {combos.map((combo, index) => (
                  <div key={index} className="christmas-menu-v2__combo">
                    <div className="christmas-menu-v2__combo-header">
                      <h4 className="christmas-menu-v2__combo-name">
                        {combo.name}
                      </h4>
                      <span className="christmas-menu-v2__combo-price">
                        {combo.price}
                      </span>
                    </div>
                    <ul className="christmas-menu-v2__combo-items">
                      {combo.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="christmas-menu-v2__combo-item"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="christmas-menu-v2__footer">
            <h3 className="christmas-menu-v2__footer-title">
              Condiciones de Pedido
            </h3>
            <div className="christmas-menu-v2__footer-divider"></div>

            <div className="christmas-menu-v2__footer-info">
              <p className="christmas-menu-v2__footer-text">
                <span className="christmas-menu-v2__footer-icon">📞</span>
                Pedidos:{" "}
                <a
                  href="tel:8495357777"
                  className="christmas-menu-v2__footer-link"
                >
                  849-535-7777
                </a>
              </p>
              <p className="christmas-menu-v2__footer-text">
                <span className="christmas-menu-v2__footer-icon">📅</span>
                Encargos con{" "}
                <span className="christmas-menu-v2__footer-highlight">
                  48 horas de anticipación
                </span>
              </p>
              <p className="christmas-menu-v2__footer-text">
                <span className="christmas-menu-v2__footer-icon">💰</span>
                Se requiere un{" "}
                <span className="christmas-menu-v2__footer-highlight">
                  50% de adelanto
                </span>
              </p>
            </div>

            <div className="christmas-menu-v2__footer-cta">
              <a
                href="tel:8495357777"
                className="christmas-menu-v2__cta-button christmas-menu-v2__cta-button--primary"
              >
                <span>📞</span>
                Llamar Ahora
              </a>
              <a
                href="https://wa.me/18495357777"
                target="_blank"
                rel="noopener noreferrer"
                className="christmas-menu-v2__cta-button christmas-menu-v2__cta-button--secondary"
              >
                <span>💬</span>
                WhatsApp
              </a>
            </div>

            <div className="christmas-menu-v2__footer-divider"></div>

            <p className="christmas-menu-v2__footer-message">
              ¡Haz de tu Navidad un momento especial con La Cocina de Lucy!
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ChristmasMenuV2;
