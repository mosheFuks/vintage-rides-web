import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

type Variant = "primary" | "outline" | "whatsapp";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

interface ButtonAsButton extends BaseProps {
  onClick?: () => void;
  href?: undefined;
  external?: undefined;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  external?: boolean;
  onClick?: undefined;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-acento text-fondo hover:bg-acento-hover",
  outline:
    "border border-acento text-acento hover:bg-acento/10",
  whatsapp:
    "bg-whatsapp text-white hover:bg-whatsapp-hover",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors duration-200";

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  const icon = variant === "whatsapp" ? <MessageCircle className="size-4" /> : null;

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a href={props.href} className={classes} target="_blank" rel="noopener noreferrer">
          {icon}
          {children}
        </a>
      );
    }
    return (
      <Link to={props.href} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={props.onClick} className={classes}>
      {icon}
      {children}
    </button>
  );
}
