import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [visitorId, setVisitorId] = useState<string | null>(null);

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem("cookie-consent");
    let storedVisitorId = localStorage.getItem("visitor-id");

    if (!storedVisitorId) {
      storedVisitorId = uuidv4();
      localStorage.setItem("visitor-id", storedVisitorId);
    }
    setVisitorId(storedVisitorId);

    if (!consent) {
      setShowBanner(true);
    }

    // Track visitor
    trackVisitor(storedVisitorId, consent === "accepted");
  }, []);

  const trackVisitor = async (vid: string, hasConsent: boolean) => {
    try {
      const { data: existingVisitor } = await supabase
        .from("site_visitors")
        .select("id, visit_count, pages_visited")
        .eq("visitor_id", vid)
        .maybeSingle();

      const currentPath = window.location.pathname;

      if (existingVisitor) {
        const updatedPages = existingVisitor.pages_visited || [];
        if (!updatedPages.includes(currentPath)) {
          updatedPages.push(currentPath);
        }

        await supabase
          .from("site_visitors")
          .update({
            last_visit: new Date().toISOString(),
            visit_count: (existingVisitor.visit_count || 0) + 1,
            pages_visited: updatedPages,
            user_agent: navigator.userAgent,
          })
          .eq("visitor_id", vid);
      } else {
        await supabase.from("site_visitors").insert({
          visitor_id: vid,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
          pages_visited: [currentPath],
          consent_given: hasConsent,
          consent_date: hasConsent ? new Date().toISOString() : null,
        });
      }
    } catch (error) {
      console.error("Error tracking visitor:", error);
    }
  };

  const handleAccept = async () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);

    if (visitorId) {
      try {
        await supabase
          .from("site_visitors")
          .update({
            consent_given: true,
            consent_date: new Date().toISOString(),
          })
          .eq("visitor_id", visitorId);
      } catch (error) {
        console.error("Error updating consent:", error);
      }
    }
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[hsl(220,30%,8%)] border-t border-white/10 p-4 md:p-6 animate-fade-in">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-white/90 text-sm leading-relaxed">
              This website uses both Innervation IT Solutions and third-party cookies, including essential, 
              functional and performance cookies. If you choose 'ACCEPT ALL' you consent to the use of all cookies. 
              You can accept/reject individual cookies or revoke your consent at any time via 'COOKIE SETTINGS'.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="/privacy" className="text-brand-lime text-sm hover:underline">
                Privacy Policy
              </a>
              <a href="/cookies" className="text-brand-lime text-sm hover:underline">
                Cookie Policy
              </a>
            </div>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button
              onClick={handleDecline}
              variant="outline"
              className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white px-6"
            >
              Cookie Settings
            </Button>
            <Button
              onClick={handleAccept}
              className="bg-[hsl(72,100%,50%)] text-[hsl(220,20%,10%)] hover:bg-[hsl(72,100%,45%)] font-semibold px-6"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;