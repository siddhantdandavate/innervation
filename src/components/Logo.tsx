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
    sm: "h-[36px]",
    md: "h-[48px]",
    lg: "h-[56px]",
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