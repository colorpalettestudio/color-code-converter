import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/" className="text-primary hover-elevate inline-block mb-8" data-testid="link-back-home">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            <strong>Last updated:</strong> October 2025
          </p>

          <p className="mb-6">
            Welcome to The Color Code Converter ("we," "our," or "us"). By accessing or using{" "}
            <a href="https://thecolorcodeconverter.com/" className="text-primary hover:underline">
              https://thecolorcodeconverter.com/
            </a>{" "}
            (the "Site"), you agree to be bound by these Terms of Use. If you do not agree with these terms, please do not use the Site.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>
              By using our website and any of its tools or services, you confirm that you are at least 13 years old and legally able to enter into this agreement. Your continued use of the Site constitutes your acceptance of these Terms and our{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description of the Service</h2>
            <p>
              The Color Code Converter provides free online tools to convert and format color codes (such as HEX, RGB, HSL, and CMYK). The Site is provided for informational and educational purposes only — we make no guarantees about accuracy or suitability for any particular purpose.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
            <p>
              All content on this Site, including but not limited to text, design, code, graphics, and logos, is the property of The Color Palette Studio (our parent brand) or its licensors, unless otherwise stated. You may not reproduce, distribute, or modify any content from this Site without written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
            <p className="mb-4">
              When using this Site, you agree not to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use the Site in any way that may damage, disable, or interfere with its operation</li>
              <li>Attempt to hack, modify, or disrupt the Site or its underlying code</li>
              <li>Use automated tools (such as bots or scrapers) to extract or republish data</li>
              <li>Upload or distribute malicious code or harmful materials</li>
            </ul>
            <p>
              We reserve the right to restrict access to any user who violates these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services and Ads</h2>
            <p>
              We use Google AdSense to display advertisements and Google Analytics to measure website traffic. These third parties may use cookies or tracking technologies in accordance with their own privacy policies. We are not responsible for the content, privacy, or practices of any third-party sites linked from this Site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Disclaimer of Warranties</h2>
            <p className="mb-4">
              The Site and all content are provided "as is" and without warranty of any kind. We make no guarantees that:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>The Site will be uninterrupted or error-free</li>
              <li>The results from using the Site will be accurate or reliable</li>
              <li>Any defects will be corrected</li>
            </ul>
            <p>
              You use the Site at your own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, The Color Palette Studio and its affiliates shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this Site or reliance on its content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Changes to the Site</h2>
            <p>
              We may update, change, or remove features of the Site at any time without prior notice. We are not obligated to maintain or continue providing this Site indefinitely.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Changes to These Terms</h2>
            <p>
              We may revise these Terms of Use at any time. Updates will be posted on this page with the new "Last updated" date. By continuing to use the Site after changes are posted, you agree to the revised Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the United States and the State of Tennessee, without regard to conflict of law principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
              📧 <a href="mailto:support@thecolorpalettestudio.com" className="text-primary hover:underline">support@thecolorpalettestudio.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
