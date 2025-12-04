import type React from "react";
import demo from "./demo2.json";
import style from "./index.module.scss";

type VentajasType = string;
interface LandingPageType {
  title: string;
  titleP: string;
  subtitle: string;
  subtitleP: string;
  ventajas: VentajasType[];
}
const LandingPage: React.FC = () => {
  const landingPage: LandingPageType = demo;
  const handeltWhatsApp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const mensaje =
      "¡Hola! Estoy interesado en la asesoría gratuita valorada en $120.";
    const msgEncoded = encodeURIComponent(mensaje);
    const ws = `https://wa.me/4917684009679?text=${msgEncoded}`;
    window.open(ws, "_blank", "noopener,noreferrer");
  };
  return (
    <div className={style.landing_page}>
      {/* Hero Section - Titulo Principal */}
      <section className={style.landing_page__hero}>
        <h1 className={style.landing_page__title}>{landingPage.title}</h1>
        <p className={style.landing_page__title_paragraph}>
          {landingPage.titleP}
        </p>
      </section>

      {/* Asesoria Section - Subtitulo */}
      <section className={style.landing_page__asesoria}>
        <h2 className={style.landing_page__subtitle}>{landingPage.subtitle}</h2>
        <p className={style.landing_page__subtitle_paragraph}>
          {landingPage.subtitleP}
        </p>
      </section>
      {/* CTA Button */}
      <button onClick={handeltWhatsApp} className={style.landing_page__cta}>
        Quiero mi asesoría gratuita ahora →
      </button>
      {/* Ventajas Section */}
      <section className={style.landing_page__ventajas}>
        {landingPage.ventajas.map((ventaja, index) => {
          return (
            <div key={index} className={style.landing_page__ventaja_item}>
              <p>{ventaja}</p>
            </div>
          );
        })}
      </section>

      {/* CTA Button */}
      <button onClick={handeltWhatsApp} className={style.landing_page__cta}>
        Quiero mi asesoría gratuita ahora →
      </button>
    </div>
  );
};
export default LandingPage;
