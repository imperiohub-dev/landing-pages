declare module "*.module.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.module.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

interface Window {
  gtag?: (
    command: string,
    action: string,
    params?: Record<string, string>
  ) => void;
  dataLayer?: Array<Record<string, unknown>>;
}
