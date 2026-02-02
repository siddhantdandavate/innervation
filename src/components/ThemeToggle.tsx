import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`relative h-9 w-9 rounded-full transition-all duration-300 ${className}`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <Sun className={`h-5 w-5 transition-all duration-300 ${theme === "dark" ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`} />
      <Moon className={`absolute h-5 w-5 transition-all duration-300 ${theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"}`} />
    </Button>
  );
};
