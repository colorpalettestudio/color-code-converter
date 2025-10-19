import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/" className="text-primary hover-elevate inline-block mb-8">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            <strong>Effective Date:</strong> October 19, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              The Color Code Converter ("we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect information when you use our color conversion tool.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p>Our service is designed to be privacy-friendly:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Color Data:</strong> All color conversions are performed locally in your browser. We do not store or transmit your color codes to our servers.</li>
              <li><strong>Analytics:</strong> We may use cookies and similar technologies to understand how visitors use our site (Google Analytics or similar).</li>
              <li><strong>Advertising:</strong> Third-party advertising partners may use cookies to serve relevant ads.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Improve our service and user experience</li>
              <li>Analyze site usage and performance</li>
              <li>Display relevant advertisements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p>
              We may use third-party services such as Google AdSense for advertising. These services may collect information about your visits to this and other websites to provide ads about goods and services of interest to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <p>
              We use cookies to store your theme preference (light/dark mode) and to enable third-party analytics and advertising. You can control cookies through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p>
              Since all color conversions happen in your browser, your color data never leaves your device. We implement reasonable security measures to protect any information we do collect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{" "}
              <Link href="/contact" className="text-primary hover:underline">
                our contact page
              </Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
