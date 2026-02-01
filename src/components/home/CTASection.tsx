import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MapPin } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="bg-[hsl(220,30%,8%)]">
      {/* Contact Bar */}
      <div className="container-narrow py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Get in touch */}
          <div className="text-white">
            <h4 className="text-[hsl(72,100%,50%)] font-semibold mb-2">Get in touch</h4>
            <div className="flex items-center gap-2 text-white/80">
              <Phone className="w-4 h-4" />
              <span>+91 93261 62104</span>
            </div>
          </div>

          {/* Your address */}
          <div className="text-white">
            <h4 className="text-[hsl(72,100%,50%)] font-semibold mb-2">Our Address</h4>
            <div className="flex items-start gap-2 text-white/80">
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
              <span>Ravet, Pune, Maharashtra, India</span>
            </div>
          </div>

          {/* Email */}
          <div className="text-white">
            <h4 className="text-[hsl(72,100%,50%)] font-semibold mb-2">Email Us</h4>
            <a href="mailto:info@innervationit.com" className="text-white/80 hover:text-[hsl(72,100%,50%)] transition-colors">
              info@innervationit.com
            </a>
          </div>
        </div>
      </div>

      {/* Got a Project CTA */}
      <div className="border-t border-white/10">
        <div className="container-narrow py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-white/60 text-sm uppercase tracking-wider">Let's collaborate</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-2">
                Got a project?
              </h2>
              <p className="text-white/70 mt-2 max-w-lg">
                We are passionate about innovative ideas and our project development process starts with a discovery session.
              </p>
            </div>
            <Link to="/contact">
              <Button 
                size="lg"
                className="bg-[hsl(72,100%,50%)] text-[hsl(220,20%,10%)] hover:bg-[hsl(72,100%,45%)] font-semibold px-8"
              >
                Enquire Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
