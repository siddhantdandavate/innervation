import { Link } from "react-router-dom";
import logoDark from "@/assets/logo-dark.svg";
import logoLight from "@/assets/logo-light.svg";
import { useTheme } from "@/hooks/use-theme";

interface LogoProps {
  variant?: "default" | "light" | "dark";
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo = ({ variant = "default", showText = false, size = "md", className = "" }: LogoProps) => {
  const { theme } = useTheme();

  const sizes = {
    sm: { height: "h-10" },       // 40px — mobile
    md: { height: "h-[54px]" },   // 54px — desktop
    lg: { height: "h-16" },       // 64px — large/admin
  };

  const { height } = sizes[size];

  // Determine which logo to show based on variant or current theme
  const getLogo = () => {
    if (variant === "light") return logoLight;
    if (variant === "dark") return logoDark;
    // Default: use theme-appropriate logo
    return theme === "dark" ? logoLight : logoDark;
  };

  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      <img
        src={getLogo()}
        alt="Innervation IT Solutions"
        className={`${height} w-auto transition-transform duration-300 group-hover:scale-105`}
      />
    </Link>
  );
};

export default Logo;
