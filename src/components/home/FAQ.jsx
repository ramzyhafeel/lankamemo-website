import Container from "../layout/Container";
import Accordion from "../ui/Accordion";
import { faqs } from "../../data/faqs";

export default function FAQ() {
  return (
    <section className="py-16">
      <Container>
        <div className="max-w-2xl">
          <div className="h-gold text-sm font-semibold tracking-[0.22em] uppercase">
            FAQ
          </div>
          <h2 className="mt-3 text-3xl font-semibold">Frequently Asked Questions</h2>
          <p className="mt-2 text-muted">
            Quick answers about tours, vehicles, payments, seasons, and custom itineraries.
          </p>
        </div>

        <div className="mt-10 max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </Container>
    </section>
  );
}