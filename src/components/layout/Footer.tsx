import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import Logo from "@/components/Logo";

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Services", href: "/services" },
  { name: "Contact Us", href: "/contact" },
];

const services = [
  { name: "Digital Transformation", href: "/services/digital-transformation" },
  { name: "AI & Automation", href: "/services/ai-automation" },
  { name: "Cloud Solutions", href: "/services/cloud-solutions" },
  { name: "Data Engineering", href: "/services/data-engineering" },
  { name: "Custom Development", href: "/services/custom-development" },
  { name: "Managed Services", href: "/services/managed-services" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(220,30%,8%)] text-white">
      {/* Main Footer */}
      <div className="container-narrow section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Logo variant="light" size="md" className="mb-6" />
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Transforming businesses through innovative technology solutions. Your trusted partner for digital transformation, AI, cloud computing, and enterprise software development.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[hsl(72,100%,50%)] hover:text-[hsl(220,20%,10%)] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[hsl(72,100%,50%)] hover:text-[hsl(220,20%,10%)] transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[hsl(72,100%,50%)] hover:text-[hsl(220,20%,10%)] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-[hsl(72,100%,50%)] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-white/70 hover:text-[hsl(72,100%,50%)] transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[hsl(72,100%,50%)] shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  Ravet, Pune<br />
                  Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[hsl(72,100%,50%)] shrink-0" />
                <a
                  href="tel:+919326162104"
                  className="text-white/70 hover:text-[hsl(72,100%,50%)] transition-colors text-sm"
                >
                  +91 93261 62104
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[hsl(72,100%,50%)] shrink-0" />
                <a
                  href="mailto:info@innervationit.com"
                  className="text-white/70 hover:text-[hsl(72,100%,50%)] transition-colors text-sm"
                >
                  info@innervationit.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-narrow py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {currentYear} Innervation IT Solutions. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-white/50 hover:text-white/80 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/50 hover:text-white/80 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};