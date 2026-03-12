import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCMSContentWithFallback } from "@/hooks/use-cms";

const heroFallback = {
  section_label: "Contact Us",
  title: "Let's Start a",
  title_highlight: "Conversation",
  description: "Ready to transform your business with innovative technology solutions? Our team of experts is here to help you navigate the path forward.",
};

const formFallback = {
  form_title: "Request a Consultation",
  form_description: "Fill out the form below and one of our consultants will reach out within 24 business hours.",
  success_title: "Thank You!",
  success_message: "We've received your message and will get back to you shortly. In the meantime, feel free to explore our services.",
};

const infoFallback = {
  title: "Contact Information",
  address_title: "Office Location",
  address_line_1: "Ravet, Pune",
  address_line_2: "Maharashtra, India",
  phone_title: "Phone",
  phone: "+91 9511643510",
  email_title: "Email",
  email: "info@innervationit.com",
  hours_title: "Business Hours",
  hours_line_1: "Monday - Friday",
  hours_line_2: "9:00 AM - 6:00 PM IST",
  promise_title: "Our Response Promise",
  promise_text: "We understand that time is critical in business. That's why we commit to responding to all inquiries within 24 business hours. For urgent matters, please call us directly.",
};

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", company: "", phone: "", message: "" });

  const { content: hero } = useCMSContentWithFallback("contact_hero", heroFallback);
  const { content: form } = useCMSContentWithFallback("contact_form", formFallback);
  const { content: info } = useCMSContentWithFallback("contact_info", infoFallback);

  useEffect(() => { setVisitorId(localStorage.getItem("visitor-id")); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        first_name: formData.firstName, last_name: formData.lastName, email: formData.email,
        company: formData.company || null, phone: formData.phone || null, message: formData.message, visitor_id: visitorId,
      });
      if (error) throw error;
      setIsSubmitted(true);
      toast({ title: "Message Sent Successfully", description: "Our team will get back to you within 24 business hours." });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-section-dark">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">{hero.section_label}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-section-dark-foreground leading-tight mb-6">
              {hero.title} <span className="text-accent">{hero.title_highlight}</span>
            </h1>
            <p className="text-xl text-section-dark-foreground/70 leading-relaxed">{hero.description}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-8 md:p-10 border border-border shadow-lg">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">{form.form_title}</h2>
                <p className="text-muted-foreground mb-8">{form.form_description}</p>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-accent" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-3">{form.success_title}</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">{form.success_message}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">First Name <span className="text-accent">*</span></label>
                        <Input id="firstName" name="firstName" type="text" required value={formData.firstName} onChange={handleChange} placeholder="Rahul" className="h-12 bg-background border-border" />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">Last Name <span className="text-accent">*</span></label>
                        <Input id="lastName" name="lastName" type="text" required value={formData.lastName} onChange={handleChange} placeholder="Sharma" className="h-12 bg-background border-border" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Business Email <span className="text-accent">*</span></label>
                        <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="rahul.sharma@company.com" className="h-12 bg-background border-border" />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">Company Name</label>
                        <Input id="company" name="company" type="text" value={formData.company} onChange={handleChange} placeholder="Your Company Pvt Ltd" className="h-12 bg-background border-border" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 9511643510" className="h-12 bg-background border-border" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">How Can We Help? <span className="text-accent">*</span></label>
                      <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} placeholder="Tell us about your project, challenges, or goals..." rows={5} className="resize-none bg-background border-border" />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-foreground text-background hover:bg-foreground/90 h-14" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">Send Message <Send size={18} /></span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-6">{info.title}</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-accent" /></div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{info.address_title}</h4>
                      <p className="text-muted-foreground">{info.address_line_1}<br />{info.address_line_2}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-accent" /></div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{info.phone_title}</h4>
                      <a href={`tel:${info.phone.replace(/\s/g, '')}`} className="text-muted-foreground hover:text-accent transition-colors">{info.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-accent" /></div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{info.email_title}</h4>
                      <a href={`mailto:${info.email}`} className="text-muted-foreground hover:text-accent transition-colors">{info.email}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0"><Clock className="w-5 h-5 text-accent" /></div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{info.hours_title}</h4>
                      <p className="text-muted-foreground">{info.hours_line_1}<br />{info.hours_line_2}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-secondary rounded-2xl p-6 border border-border">
                <h4 className="font-heading font-semibold text-foreground mb-3">{info.promise_title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{info.promise_text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
