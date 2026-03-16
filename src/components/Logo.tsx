import { Link } from "react-router-dom";
import logoBrand from "@/assets/logo-brand.png";

interface LogoProps {
  variant?: "default" | "light" | "dark";
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo = ({ variant = "default", showText = true, size = "md", className = "" }: LogoProps) => {
  const sizes = {
    sm: { height: "h-[36px]", text: "text-sm" },
    md: { height: "h-[48px]", text: "text-base" },
    lg: { height: "h-[56px]", text: "text-lg" },
  };

  const { height, text } = sizes[size];

  // Text color: always white on dark backgrounds, foreground otherwise
  const textColor = variant === "light"
    ? "text-white"
    : "text-foreground";

  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      <img
        src={logoBrand}
        alt="Innervation IT Solutions"
        className={`${height} w-auto transition-transform duration-300 group-hover:scale-105`}
      />
      <span className={`${text} font-heading font-semibold ${textColor} hidden sm:inline whitespace-nowrap`}>
        Innervation IT Solutions
      </span>
    </Link>
  );
};

export default Logo;