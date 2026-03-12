import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MapPin, Mail } from "lucide-react";
import { useCMSContentWithFallback } from "@/hooks/use-cms";

const fallback = {
  phone_label: "Get in touch",
  phone: "+91 93261 62104",
  address_label: "Our Address",
  address: "Ravet, Pune, Maharashtra, India",
  email_label: "Email Us",
  email: "info@innervationit.com",
  cta_label: "Let's collaborate",
  cta_title: "Got a project?",
  cta_description: "We are passionate about innovative ideas and our project development process starts with a discovery session.",
  cta_button_text: "Enquire Now",
};

export const CTASection = () => {
  const { content } = useCMSContentWithFallback("home_cta", fallback);

  return (
    <section className="bg-section-dark">
      <div className="container-narrow py-12 lg:py-16">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-center">
          <div className="text-section-dark-foreground">
            <h4 className="text-accent font-semibold mb-2 text-sm uppercase tracking-wider">{content.phone_label}</h4>
            <div className="flex items-center gap-3 text-section-dark-foreground/80">
              <Phone className="w-5 h-5 text-accent" />
              <span className="text-lg">{content.phone}</span>
            </div>
          </div>
          <div className="text-section-dark-foreground">
            <h4 className="text-accent font-semibold mb-2 text-sm uppercase tracking-wider">{content.address_label}</h4>
            <div className="flex items-start gap-3 text-section-dark-foreground/80">
              <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <span className="text-lg">{content.address}</span>
            </div>
          </div>
          <div className="text-section-dark-foreground">
            <h4 className="text-accent font-semibold mb-2 text-sm uppercase tracking-wider">{content.email_label}</h4>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-accent" />
              <a href={`mailto:${content.email}`} className="text-section-dark-foreground/80 hover:text-accent transition-colors text-lg">
                {content.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-section-dark-foreground/10">
        <div className="container-narrow py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <span className="text-section-dark-foreground/50 text-sm uppercase tracking-wider font-medium">{content.cta_label}</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-section-dark-foreground mt-3">
                {content.cta_title}
              </h2>
              <p className="text-section-dark-foreground/60 mt-4 max-w-lg text-lg">
                {content.cta_description}
              </p>
            </div>
            <Link to="/contact">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-10 h-14 text-base shadow-lg shadow-accent/20">
                {content.cta_button_text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
