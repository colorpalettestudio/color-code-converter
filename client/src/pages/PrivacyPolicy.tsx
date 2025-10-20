import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/" className="text-primary hover-elevate inline-block mb-8" data-testid="link-back-home">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            <strong>Last updated:</strong> October 2025
          </p>

          <p className="mb-6">
            Welcome to The Color Code Converter ("we," "our," or "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use{" "}
            <a href="https://thecolorcodeconverter.com/" className="text-primary hover:underline">
              https://thecolorcodeconverter.com/
            </a>{" "}
            (the "Site").
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We do not require you to sign up or submit personal data to use our tool. However, we may collect certain information automatically, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Usage Data:</strong> Your browser type, IP address, operating system, and referring URLs.</li>
              <li><strong>Analytics Data:</strong> Through Google Analytics, which helps us understand how visitors use our Site.</li>
              <li><strong>Advertising Data:</strong> Through Google AdSense, which may use cookies or similar technologies to show relevant ads.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use of Cookies</h2>
            <p className="mb-4">
              Cookies are small text files stored on your device. We use cookies to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Measure and improve Site performance</li>
              <li>Analyze visitor traffic (Google Analytics)</li>
              <li>Display personalized ads (Google AdSense)</li>
            </ul>
            <p className="mb-4">
              You can disable cookies in your browser settings, but parts of the Site may not function properly.
            </p>
            <p>
              To learn more about how Google uses data, visit:{" "}
              <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                https://policies.google.com/technologies/partner-sites
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Third-Party Services</h2>
            <p className="mb-4">
              We use third-party services to operate and improve this website:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Google Analytics:</strong> Tracks anonymized usage for traffic and behavior insights.</li>
              <li><strong>Google AdSense:</strong> Displays relevant ads and may use cookies or device identifiers for ad personalization.</li>
            </ul>
            <p className="mb-4">
              You can opt out of personalized advertising by visiting:{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                https://www.google.com/settings/ads
              </a>
            </p>
            <p>
              We do not control or have access to data collected by these third-party tools.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Data Protection and Retention</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>We do not sell or share your personal data.</li>
              <li>We retain aggregated analytics data only as long as necessary for performance insights.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Links to Other Websites</h2>
            <p>
              Our Site may contain links to external websites (for example, The Color Palette Studio or other tools we own). We are not responsible for their content or privacy practices. Please review their policies before using those sites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Your Choices</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>You can disable cookies via your browser.</li>
              <li>
                You can opt out of Google Analytics tracking via the{" "}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Google Analytics Opt-Out Add-on
                </a>.
              </li>
              <li>
                You can manage ad personalization in your{" "}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Google Ads Settings
                </a>.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
            <p>
              Our Site is not directed to children under 13. We do not knowingly collect information from minors.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy occasionally. Updates will be posted on this page with the new effective date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <p className="mb-2">
              If you have questions about this Privacy Policy or your data, please contact us at:
            </p>
            <p className="mb-2">
              📧 <a href="mailto:sam@thecolorpalettestudio.com" className="text-primary hover:underline">sam@thecolorpalettestudio.com</a>
            </p>
            <p>
              or via our{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact Page
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
