import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/" className="text-primary hover-elevate inline-block mb-8">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            <strong>Effective Date:</strong> October 19, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p>
              By accessing and using The Color Code Converter, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Use of Service</h2>
            <p>The Color Code Converter is a free tool provided for:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Converting color codes between HEX, RGB, HSL, and CMYK formats</li>
              <li>Exporting color palettes in various formats</li>
              <li>Personal and commercial use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
            <p>
              We strive to keep the service available 24/7, but we do not guarantee uninterrupted access. We may modify, suspend, or discontinue the service at any time without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Accuracy of Conversions</h2>
            <p>
              While we strive for accuracy, color conversions (especially CMYK) are approximate and may vary depending on display settings, color profiles, and printing conditions. We are not responsible for color accuracy in professional or production use.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p>
              The Color Code Converter's design, code, and content are owned by The Color Palette Studio. Color values themselves are not copyrightable, and you are free to use any converted colors in your projects.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Prohibited Uses</h2>
            <p>You may not:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Attempt to reverse engineer or copy the service</li>
              <li>Use automated tools to scrape or abuse the service</li>
              <li>Interfere with the proper functioning of the service</li>
              <li>Use the service for any illegal purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p>
              The service is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service, including but not limited to color accuracy issues, data loss, or business interruption.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Links and Advertisements</h2>
            <p>
              Our service may contain links to third-party websites and advertisements. We are not responsible for the content or practices of these third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Continued use of the service after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p>
              For questions about these Terms of Service, please{" "}
              <Link href="/contact" className="text-primary hover:underline">
                contact us
              </Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
