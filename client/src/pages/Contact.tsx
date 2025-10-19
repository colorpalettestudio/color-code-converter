import { Link } from "wouter";

export default function Contact() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/" className="text-primary hover-elevate inline-block mb-8">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p>
              We'd love to hear from you! Whether you have questions, feedback, or need support, feel free to reach out.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Email</h2>
            <p>
              For general inquiries, support, or feedback, please email us at:
            </p>
            <p className="text-xl">
              <a href="mailto:hello@thecolorpalettestudio.com" className="text-primary hover:underline">
                hello@thecolorpalettestudio.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">About The Color Palette Studio</h2>
            <p>
              The Color Code Converter is brought to you by The Color Palette Studio, creators of free tools for designers and developers to work with colors effortlessly.
            </p>
            <p className="mt-4">
              <a 
                href="https://thecolorpalettestudio.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Visit The Color Palette Studio →
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Response Time</h2>
            <p>
              We typically respond to inquiries within 1-2 business days. For urgent matters, please include "URGENT" in your email subject line.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Legal & Privacy</h2>
            <p>
              For legal matters, privacy concerns, or data requests, please refer to our{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{" "}
              or{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
