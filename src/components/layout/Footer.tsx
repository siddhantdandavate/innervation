import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "Digital Transformation", href: "/services/digital-transformation" },
  { label: "AI & Automation", href: "/services/ai-automation" },
  { label: "Cloud Solutions", href: "/services/cloud-solutions" },
  { label: "Custom Development", href: "/services/custom-development" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-narrow section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-heading font-bold text-lg">I</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg leading-tight text-foreground">Innervation</span>
                <span className="text-xs font-medium leading-tight text-muted-foreground">IT Solutions</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Empowering businesses with innovative technology solutions. We transform complex challenges into competitive advantages through strategic IT consulting, AI integration, and digital transformation.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-foreground">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.href}
                    className="text-muted-foreground hover:text-accent transition-colors duration-300 text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-foreground">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-0.5 shrink-0" />
                <span className="text-muted-foreground text-sm">
                  123 Innovation Drive, Suite 500<br />
                  Tech City, TC 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-muted-foreground hover:text-accent transition-colors duration-300 text-sm"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent shrink-0" />
                <a
                  href="mailto:info@innervation.com"
                  className="text-muted-foreground hover:text-accent transition-colors duration-300 text-sm"
                >
                  info@innervation.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Innervation IT Solutions. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-muted-foreground hover:text-accent transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-muted-foreground hover:text-accent transition-colors duration-300 text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
