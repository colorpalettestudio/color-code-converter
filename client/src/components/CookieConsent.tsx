import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Cookie } from "lucide-react";
import { Link } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type ConsentPreferences = {
  analytics: boolean;
  advertising: boolean;
};

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showManageDialog, setShowManageDialog] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    analytics: true,
    advertising: true,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      analytics: true,
      advertising: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(consent));
    setShowBanner(false);
  };

  const handleManageOptions = () => {
    setShowManageDialog(true);
  };

  const handleSavePreferences = () => {
    const consent = {
      analytics: preferences.analytics,
      advertising: preferences.advertising,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(consent));
    setShowBanner(false);
    setShowManageDialog(false);
  };

  const handleRejectAll = () => {
    const consent = {
      analytics: false,
      advertising: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(consent));
    setPreferences({ analytics: false, advertising: false });
    setShowBanner(false);
    setShowManageDialog(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 pointer-events-none"
        data-testid="cookie-consent-banner"
      >
        <Card className="max-w-3xl mx-auto pointer-events-auto shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Cookie className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <CardTitle className="text-lg">We value your privacy</CardTitle>
                  <CardDescription className="text-sm mt-1">
                    We use cookies to enhance your browsing experience and show personalized ads
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-sm text-muted-foreground">
              We use cookies and similar technologies for analytics (Google Analytics) and advertising (Google AdSense). 
              By clicking "Accept", you consent to our use of cookies. You can manage your preferences or learn more in our{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              onClick={handleAcceptAll}
              className="w-full sm:w-auto"
              data-testid="button-accept-cookies"
            >
              Accept
            </Button>
            <Button 
              onClick={handleManageOptions}
              variant="outline"
              className="w-full sm:w-auto"
              data-testid="button-manage-cookies"
            >
              Manage options
            </Button>
            <Button 
              onClick={handleRejectAll}
              variant="ghost"
              className="w-full sm:w-auto"
              data-testid="button-reject-cookies"
            >
              Reject all
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Dialog open={showManageDialog} onOpenChange={setShowManageDialog}>
        <DialogContent data-testid="dialog-manage-cookies">
          <DialogHeader>
            <DialogTitle>Manage Cookie Preferences</DialogTitle>
            <DialogDescription>
              Choose which cookies you want to allow. Essential cookies cannot be disabled as they are required for the site to function.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-start space-x-3 p-4 rounded-lg border bg-muted/30">
              <Checkbox 
                id="essential" 
                checked={true} 
                disabled 
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="essential" className="text-sm font-semibold cursor-not-allowed">
                  Essential Cookies (Required)
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  These cookies are necessary for the website to function and store your preferences like theme selection.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg border">
              <Checkbox 
                id="analytics" 
                checked={preferences.analytics}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, analytics: !!checked }))
                }
                className="mt-1"
                data-testid="checkbox-analytics"
              />
              <div className="flex-1">
                <Label htmlFor="analytics" className="text-sm font-semibold cursor-pointer">
                  Analytics Cookies (Google Analytics)
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Help us understand how visitors use our site to improve your experience.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg border">
              <Checkbox 
                id="advertising" 
                checked={preferences.advertising}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, advertising: !!checked }))
                }
                className="mt-1"
                data-testid="checkbox-advertising"
              />
              <div className="flex-1">
                <Label htmlFor="advertising" className="text-sm font-semibold cursor-pointer">
                  Advertising Cookies (Google AdSense)
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Allow us to show you personalized advertisements based on your interests.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button 
              onClick={handleRejectAll}
              variant="outline"
              className="w-full sm:w-auto"
              data-testid="button-reject-all-dialog"
            >
              Reject all
            </Button>
            <Button 
              onClick={handleSavePreferences}
              className="w-full sm:w-auto"
              data-testid="button-save-preferences"
            >
              Save preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
