import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-section-dark border-t border-section-dark-foreground/10 p-4 md:p-6 animate-fade-in">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-section-dark-foreground/90 text-sm leading-relaxed">
              This website uses both Innervation IT Solutions and third-party cookies, including essential,
              functional and performance cookies. If you choose 'ACCEPT ALL' you consent to the use of all cookies.
              You can accept/reject individual cookies or revoke your consent at any time via 'COOKIE SETTINGS'.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="/privacy" className="text-accent text-sm hover:underline">Privacy Policy</a>
              <a href="/cookies" className="text-accent text-sm hover:underline">Cookie Policy</a>
            </div>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button
              onClick={handleDecline}
              variant="outline"
              className="border-section-dark-foreground/30 bg-section-dark-foreground/5 text-section-dark-foreground hover:bg-section-dark-foreground/10 hover:text-section-dark-foreground hover:border-section-dark-foreground/50 px-6"
            >
              Cookie Settings
            </Button>
            <Button
              onClick={handleAccept}
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-6"
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
