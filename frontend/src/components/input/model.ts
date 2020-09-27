export interface InputInterface {
  onChange: (e?: any) => void;
  placeholder?: string;
  label?: string;
  inputRef?: (ref?: any) => void;
  required?: boolean;
  defaultValue?: string;
  autoFocus?: boolean;
  value?: string;
}
