import { Link } from "react-router-dom";
import logoBrand from "@/assets/logo-brand.png";

interface LogoProps {
  variant?: "default" | "light" | "dark";
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo = ({ variant = "default", size = "md", className = "" }: LogoProps) => {
  const sizes = {
    sm: "h-[48px] md:h-[56px]",
    md: "h-[56px] md:h-[72px]",
    lg: "h-[64px] md:h-[80px]",
  };

  return (
    <Link to="/" className={`flex items-center group ${className}`}>
      <img
        src={logoBrand}
        alt="Innervation IT Solutions"
        className={`${sizes[size]} w-auto transition-transform duration-300 group-hover:scale-105`}
      />
    </Link>
  );
};

export default Logo;