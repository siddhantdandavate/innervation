import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "default" | "light" | "dark";
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo = ({ variant = "default", showText = true, size = "md", className = "" }: LogoProps) => {
  const sizes = {
    sm: { icon: 40, text: "text-lg" },
    md: { icon: 50, text: "text-xl" },
    lg: { icon: 70, text: "text-2xl" },
  };

  const { icon, text } = sizes[size];

  const getTextColor = () => {
    if (variant === "light") return "text-white";
    return "text-foreground";
  };

  const getSubtextColor = () => {
    if (variant === "light") return "text-white/70";
    return "text-muted-foreground";
  };

  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      {/* Logo Icon - Theme-aware SVG using CSS custom properties */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        {/* Blue figure (technology/innovation) - uses theme token */}
        <g>
          <circle cx="45" cy="20" r="10" fill="hsl(var(--brand-primary))" />
          <path
            d="M20 75 C20 45, 35 30, 55 35 C65 38, 70 50, 65 65"
            stroke="hsl(var(--brand-primary))"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M30 60 C35 45, 45 40, 55 45"
            stroke="hsl(var(--brand-primary-light))"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </g>
        
        {/* Red figure (people/partnership) - uses theme token */}
        <g>
          <circle cx="60" cy="55" r="8" fill="hsl(var(--brand-secondary))" />
          <path
            d="M80 25 C80 55, 65 70, 45 65 C35 62, 30 50, 35 35"
            stroke="hsl(var(--brand-secondary))"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M70 40 C65 55, 55 60, 45 55"
            stroke="hsl(var(--brand-secondary-light))"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className={`${text} font-heading font-bold tracking-tight leading-tight ${getTextColor()}`}>
            Innervation IT Solutions
          </span>
          <span className={`text-xs tracking-[0.15em] uppercase ${getSubtextColor()}`}>
            world of possibilities!
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
