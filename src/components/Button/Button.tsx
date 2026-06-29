// Button.tsx
import { buttonRecipe } from "./Button.css";

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  fullWidth?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "medium",
  loading = false,
  fullWidth = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const buttonClassName = buttonRecipe({ variant, size, fullWidth });

  return (
    <button
      className={className ? `${buttonClassName} ${className}` : buttonClassName}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? "처리 중..." : children}
    </button>
  );
}
