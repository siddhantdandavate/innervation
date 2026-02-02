import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";

interface LogoProps {
  variant?: "default" | "light" | "dark";
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo = ({ variant = "default", showText = true, size = "md", className = "" }: LogoProps) => {
  const { theme } = useTheme();
  
  const sizes = {
    sm: { icon: 40, text: "text-lg" },
    md: { icon: 50, text: "text-xl" },
    lg: { icon: 70, text: "text-2xl" },
  };

  const { icon, text } = sizes[size];

  // Determine text color based on variant and theme
  const getTextColor = () => {
    if (variant === "light") return "text-white";
    if (variant === "dark") return "text-foreground";
    return "text-foreground";
  };

  const getSubtextColor = () => {
    if (variant === "light") return "text-white/70";
    return "text-muted-foreground";
  };

  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      {/* Logo Icon - Two interlocking figures representing partnership and innovation */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105"
      >
        {/* Blue figure (top-left) - representing technology/innovation */}
        <g>
          {/* Head */}
          <circle cx="45" cy="20" r="10" fill="#0088CC" />
          {/* Body arc */}
          <path
            d="M20 75 C20 45, 35 30, 55 35 C65 38, 70 50, 65 65"
            stroke="#0088CC"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          {/* Inner swoosh */}
          <path
            d="M30 60 C35 45, 45 40, 55 45"
            stroke="#00AAEE"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </g>
        
        {/* Red figure (bottom-right) - representing people/partnership */}
        <g>
          {/* Head */}
          <circle cx="60" cy="55" r="8" fill="#CC3333" />
          {/* Body arc */}
          <path
            d="M80 25 C80 55, 65 70, 45 65 C35 62, 30 50, 35 35"
            stroke="#CC3333"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          {/* Inner swoosh */}
          <path
            d="M70 40 C65 55, 55 60, 45 55"
            stroke="#EE4444"
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
