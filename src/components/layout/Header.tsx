import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import Logo from "@/components/Logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  {
    name: "Services",
    href: "/services",
    submenu: [
      { name: "Website Development", href: "/services/web-development" },
      { name: "Mobile App Development", href: "/services/mobile-development" },
      { name: "Continuous Support", href: "/services/support" },
      { name: "Project Management", href: "/services/project-management" },
      { name: "Consulting", href: "/services/consulting" },
      { name: "Social Media Marketing", href: "/services/social-media" },
    ],
  },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
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
    setIsServicesOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-3 border-b border-border"
          : "bg-section-dark/95 backdrop-blur-sm py-5"
      }`}
    >
      <div className="container-narrow">
        <nav className="flex items-center justify-between">
          <Logo variant={isScrolled ? "default" : "light"} size="md" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.submenu ? (
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link
                      to={link.href}
                      className={`text-sm font-medium transition-colors ${
                        isScrolled
                          ? isActive(link.href)
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                          : isActive(link.href)
                            ? "text-section-dark-foreground"
                            : "text-section-dark-foreground/80 hover:text-section-dark-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                    <ChevronDown size={14} className={isScrolled ? "text-muted-foreground" : "text-section-dark-foreground/80"} />
                    
                    {/* Dropdown */}
                    <div
                      className={`absolute top-full left-0 mt-2 w-64 bg-popover rounded-lg shadow-xl border border-border overflow-hidden transition-all duration-200 ${
                        isServicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.href}
                          to={sublink.href}
                          className="block px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-colors border-b border-border/50 last:border-0"
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    className={`text-sm font-medium transition-colors ${
                      isScrolled
                        ? isActive(link.href)
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                        : isActive(link.href)
                          ? "text-section-dark-foreground"
                          : "text-section-dark-foreground/80 hover:text-section-dark-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            <ThemeToggle className={isScrolled ? "text-foreground hover:bg-muted" : "text-section-dark-foreground hover:bg-section-dark-foreground/10"} />

            <Link to="/contact">
              <Button 
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-md"
              >
                Get in Touch
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle className={isScrolled ? "text-foreground hover:bg-muted" : "text-section-dark-foreground hover:bg-section-dark-foreground/10"} />
            <button
              className={`p-2 ${isScrolled ? "text-foreground" : "text-section-dark-foreground"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-fade-in">
            <div className="bg-popover rounded-lg shadow-xl border border-border p-4 space-y-2">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    to={link.href}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                  {link.submenu && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.href}
                          to={sublink.href}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-2">
                <Link to="/contact" className="block">
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
