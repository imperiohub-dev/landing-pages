import type React from "react";
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
  const landingPage: LandingPageType = {
    title: "Tu negocio podría estar vendiendo el doble",
    titleP:
      "Empieza con una landing optimizada que convierte visitas en clientes",
    subtitle: "Reserva una asesoría 100% gratuita donde analizamos tu negocio",
    subtitleP:
      "detectamos tus fugas de conversión y te mostramos el embudo exacto que necesitas",
    ventajas: [
      "Descubrirás por qué tu web actual no está convirtiendo (y cómo arreglarlo)",
      "Te mostraré la estructura de landing exacta que usan negocios que venden 24/7",
      "Identificaremos tu propuesta de valor ganadora para atraer clientes listos para comprar",
      "Obtendrás claridad sobre qué elementos debes tener para generar confianza inmediata",
      "Te daré un plan concreto para escalar tu adquisición de clientes sin depender de recomendaciones",
    ],
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

      {/* Ventajas Section */}
      <section className={style.landing_page__ventajas}>
        {landingPage.ventajas.map((ventaja, index) => {
          return (
            <div key={index} className={style.landing_page__ventaja_item}>
              <p className={style.landing_page__ventaja_text}>{ventaja}</p>
            </div>
          );
        })}
      </section>

      {/* CTA Button */}
      <button className={style.landing_page__cta}>
        Quiero mi asesoría gratuita ahora →
      </button>
    </div>
  );
};
export default LandingPage;
