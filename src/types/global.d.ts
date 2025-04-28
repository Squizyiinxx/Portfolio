interface GtagEventParameters {
  event_category: string;
  event_label: string;
  value: number;
  non_interaction: boolean;
  [key: string]: string | number | boolean | undefined;
}

interface Window {
  gtag: (
    command: "event",
    eventName: string,
    eventParameters: GtagEventParameters
  ) => void;
}

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}
