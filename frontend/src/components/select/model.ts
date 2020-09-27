export interface Option {
  value: string;
  title: string;
}

export interface SelectInterface {
  onChange: (e?: any) => void;
  options: Array<Option>;
  name: string;
  label?: string;
  required?: boolean;
  value?: string;
}
