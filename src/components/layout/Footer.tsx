import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import Logo from "@/components/Logo";
import { useCMSContentWithFallback } from "@/hooks/use-cms";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "Website Development", href: "/services/web-development" },
  { name: "Mobile App Development", href: "/services/mobile-development" },
  { name: "Continuous Support", href: "/services/support" },
  { name: "Project Management", href: "/services/project-management" },
  { name: "Consulting", href: "/services/consulting" },
  { name: "Social Media Marketing", href: "/services/social-media" },
];

const footerFallback = {
  company_description: "Your trusted technology partner for digital transformation.",
  copyright: "Innervation IT Solutions. All rights reserved.",
  privacy_link_text: "Privacy Policy",
  terms_link_text: "Terms of Service",
};

const contactFallback = {
  address: "Ravet, Pune, India",
  phone: "+91 93261 62104",
  email: "info@innervationit.com",
};

const socialFallback = {
  linkedin_url: "#",
  twitter_url: "#",
  facebook_url: "#",
  instagram_url: "",
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { content: footer } = useCMSContentWithFallback("footer", footerFallback);
  const { content: contact } = useCMSContentWithFallback("footer_contact", contactFallback);
  const { content: social } = useCMSContentWithFallback("social_links", socialFallback);

  return (
    <footer className="bg-section-dark text-section-dark-foreground pt-16 pb-8">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Logo variant="light" size="sm" className="mb-6" />
            <p className="text-section-dark-foreground/60 text-sm leading-relaxed">
              {footer.company_description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-section-dark-foreground/60 hover:text-accent transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link to={service.href} className="text-section-dark-foreground/60 hover:text-accent transition-colors text-sm">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="text-section-dark-foreground/60 text-sm">{contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-section-dark-foreground/60 hover:text-accent transition-colors text-sm">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href={`mailto:${contact.email}`} className="text-section-dark-foreground/60 hover:text-accent transition-colors text-sm">
                  {contact.email}
                </a>
              </li>
            </ul>

            <div className="flex gap-3 mt-4">
              {social.linkedin_url && (
                <a href={social.linkedin_url} className="w-9 h-9 rounded-full bg-section-dark-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300" aria-label="LinkedIn">
                  <Linkedin size={16} />
                </a>
              )}
              {social.twitter_url && (
                <a href={social.twitter_url} className="w-9 h-9 rounded-full bg-section-dark-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300" aria-label="Twitter">
                  <Twitter size={16} />
                </a>
              )}
              {social.facebook_url && (
                <a href={social.facebook_url} className="w-9 h-9 rounded-full bg-section-dark-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300" aria-label="Facebook">
                  <Facebook size={16} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-section-dark-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-section-dark-foreground/40 text-sm">
              © {currentYear} {footer.copyright}
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-section-dark-foreground/40 hover:text-section-dark-foreground/70 text-sm transition-colors">
                {footer.privacy_link_text}
              </Link>
              <Link to="/terms" className="text-section-dark-foreground/40 hover:text-section-dark-foreground/70 text-sm transition-colors">
                {footer.terms_link_text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};