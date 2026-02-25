import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Container from "../components/layout/Container";
import PageHero from "../components/ui/PageHero";
import ContactCards from "../components/contact/ContactCards";
import ContactForm from "../components/contact/ContactForm";

export default function Contact() {
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "1") setShowSuccessBanner(true);
  }, []);

  return (
    <Layout whatsappMessage="Hi Lanka Memo Holidays! I want to contact you about a tour.">
      <PageHero
        title="Contact Us"
        subtitle="We’d love to help plan your trip. Send a message or reach us instantly on WhatsApp."
        image="/images/hero.jpg"
      />

      <Container className="py-14">
        {showSuccessBanner ? (
          <div
            className="mb-8 px-5 py-4 text-sm"
            style={{
              borderRadius: 16,
              border: "1px solid rgba(15,118,110,0.25)",
              background: "rgba(15,118,110,0.10)",
              color: "var(--accent-2)",
            }}
            role="status"
          >
            ✅ Thanks! Your message was sent successfully. We’ll get back to you soon.
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="h-gold text-sm font-semibold tracking-[0.22em] uppercase">
              Get in touch
            </div>
            <h2 className="mt-3 text-3xl font-semibold">We’re here to help</h2>
            <p className="mt-2 text-muted">
              Contact us for custom itineraries, package bookings, or quick travel advice.
            </p>

            <div className="mt-8">
              <ContactCards />
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </Container>
    </Layout>
  );
}