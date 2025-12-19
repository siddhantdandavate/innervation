import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-narrow">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-300">
              <span className="text-accent-foreground font-heading font-bold text-lg">I</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg leading-tight text-foreground">
                Innervation
              </span>
              <span className="text-xs font-medium leading-tight text-muted-foreground">
                IT Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.href
                    ? "text-accent bg-accent/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild variant="accent" size="default">
              <Link to="/contact">Talk to Us</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col gap-2 bg-card rounded-xl p-4 border border-border">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.href
                      ? "text-accent bg-accent/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild variant="accent" size="default" className="mt-2">
                <Link to="/contact">Talk to Us</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
