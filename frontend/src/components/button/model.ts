export type ButtonVariant = 'submit' | 'clear' | 'default';

export interface ButtonInterface {
  variant?: ButtonVariant;
  onClick?: (e?: any) => void;
}
