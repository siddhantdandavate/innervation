import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "default" | "light" | "dark";
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo = ({ variant = "default", showText = true, size = "md", className = "" }: LogoProps) => {
  const sizes = {
    sm: { icon: 32, text: "text-lg" },
    md: { icon: 40, text: "text-xl" },
    lg: { icon: 56, text: "text-2xl" },
  };

  const { icon, text } = sizes[size];

  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      {/* Logo Icon - Abstract "I" with neural network nodes representing IT innovation */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105"
      >
        {/* Background hexagon shape */}
        <path
          d="M24 2L43.0526 13V35L24 46L4.94744 35V13L24 2Z"
          className="fill-accent"
        />
        
        {/* Inner hexagon */}
        <path
          d="M24 8L38 16.5V31.5L24 40L10 31.5V16.5L24 8Z"
          className="fill-background"
        />
        
        {/* Central "I" letterform with nodes */}
        <path
          d="M20 16H28V18H25V30H28V32H20V30H23V18H20V16Z"
          className="fill-accent"
        />
        
        {/* Neural network nodes */}
        <circle cx="16" cy="20" r="2" className="fill-accent" />
        <circle cx="32" cy="20" r="2" className="fill-accent" />
        <circle cx="16" cy="28" r="2" className="fill-accent" />
        <circle cx="32" cy="28" r="2" className="fill-accent" />
        
        {/* Connecting lines */}
        <line x1="18" y1="20" x2="20" y2="17" className="stroke-accent" strokeWidth="1" />
        <line x1="30" y1="20" x2="28" y2="17" className="stroke-accent" strokeWidth="1" />
        <line x1="18" y1="28" x2="20" y2="31" className="stroke-accent" strokeWidth="1" />
        <line x1="30" y1="28" x2="28" y2="31" className="stroke-accent" strokeWidth="1" />
        
        {/* Additional accent nodes */}
        <circle cx="24" cy="12" r="1.5" className="fill-accent/70" />
        <circle cx="24" cy="36" r="1.5" className="fill-accent/70" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className={`${text} font-heading font-bold tracking-tight leading-tight`}>
            <span className="text-accent">Innervation</span>
            <span className="text-foreground"> IT</span>
          </span>
          <span className="text-xs text-muted-foreground tracking-[0.2em] uppercase">
            Solutions
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
