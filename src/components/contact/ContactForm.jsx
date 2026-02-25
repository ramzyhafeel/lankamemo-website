import { useMemo, useState } from "react";
import { encodeForm } from "../../utils/netlify";

const initialState = {
  "form-name": "contact",
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  "bot-field": "",
};

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
}

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!isEmail(form.email)) e.email = "Please enter a valid email.";
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  }, [form]);

  const hasErrors = Object.keys(errors).length > 0;

  const onChange = (key) => (ev) => {
    setForm((p) => ({ ...p, [key]: ev.target.value }));
  };

  const onBlur = (key) => () => {
    setTouched((p) => ({ ...p, [key]: true }));
  };

  const fieldError = (key) => touched[key] && errors[key];

  async function onSubmit(e) {
    e.preventDefault();

    // mark required fields as touched
    setTouched({ name: true, email: true, subject: true, message: true });

    if (hasErrors) return;

    // honeypot
    if (form["bot-field"]) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm(form),
      });

      setStatus("success");
      setForm(initialState);

      // redirect to show success banner even on refresh
      const url = new URL(window.location.href);
      url.searchParams.set("success", "1");
      window.history.replaceState({}, "", url.toString());
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or WhatsApp us.");
    }
  }

  return (
    <div className="card p-6 md:p-8">
      <div className="text-lg font-semibold">Send a Message</div>
      <p className="mt-2 text-sm text-muted">
        Tell us your travel dates, interests, and group size — we’ll reply quickly.
      </p>

      {status === "success" ? (
        <div
          className="mt-5 px-4 py-3 text-sm"
          style={{
            borderRadius: 14,
            border: "1px solid rgba(15,118,110,0.25)",
            background: "rgba(15,118,110,0.10)",
            color: "var(--accent-2)",
          }}
          role="status"
        >
          ✅ Message sent successfully! We’ll get back to you soon.
        </div>
      ) : null}

      {status === "error" ? (
        <div
          className="mt-5 px-4 py-3 text-sm"
          style={{
            borderRadius: 14,
            border: "1px solid rgba(239,68,68,0.25)",
            background: "rgba(239,68,68,0.08)",
            color: "rgba(185,28,28,1)",
          }}
          role="alert"
        >
          {errorMsg}
        </div>
      ) : null}

      {/* Netlify forms requirements:
          - name attribute
          - data-netlify="true"
          - hidden input form-name
          - honeypot field */}
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={onSubmit}
        className="mt-6 space-y-4"
      >
        <input type="hidden" name="form-name" value="contact" />

        {/* Honeypot */}
        <p className="hidden">
          <label>
            Don’t fill this out:{" "}
            <input name="bot-field" value={form["bot-field"]} onChange={onChange("bot-field")} />
          </label>
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium" htmlFor="name">
              Name *
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={onChange("name")}
              onBlur={onBlur("name")}
              className="mt-2 w-full px-4 py-3 text-sm outline-none"
              style={{
                borderRadius: 14,
                border: fieldError("name") ? "1px solid rgba(239,68,68,0.45)" : "1px solid var(--border)",
                boxShadow: "var(--shadow-soft)",
              }}
              placeholder="Your name"
              autoComplete="name"
            />
            {fieldError("name") ? (
              <div className="mt-1 text-xs" style={{ color: "rgba(185,28,28,1)" }}>
                {errors.name}
              </div>
            ) : null}
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="email">
              Email *
            </label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={onChange("email")}
              onBlur={onBlur("email")}
              className="mt-2 w-full px-4 py-3 text-sm outline-none"
              style={{
                borderRadius: 14,
                border: fieldError("email") ? "1px solid rgba(239,68,68,0.45)" : "1px solid var(--border)",
                boxShadow: "var(--shadow-soft)",
              }}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {fieldError("email") ? (
              <div className="mt-1 text-xs" style={{ color: "rgba(185,28,28,1)" }}>
                {errors.email}
              </div>
            ) : null}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="phone">
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={onChange("phone")}
            className="mt-2 w-full px-4 py-3 text-sm outline-none"
            style={{
              borderRadius: 14,
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-soft)",
            }}
            placeholder="+94 7X XXX XXXX"
            autoComplete="tel"
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="subject">
            Subject *
          </label>
          <input
            id="subject"
            name="subject"
            value={form.subject}
            onChange={onChange("subject")}
            onBlur={onBlur("subject")}
            className="mt-2 w-full px-4 py-3 text-sm outline-none"
            style={{
              borderRadius: 14,
              border: fieldError("subject") ? "1px solid rgba(239,68,68,0.45)" : "1px solid var(--border)",
              boxShadow: "var(--shadow-soft)",
            }}
            placeholder="Tour inquiry / Package booking / Custom trip"
          />
          {fieldError("subject") ? (
            <div className="mt-1 text-xs" style={{ color: "rgba(185,28,28,1)" }}>
              {errors.subject}
            </div>
          ) : null}
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="message">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={onChange("message")}
            onBlur={onBlur("message")}
            rows={5}
            className="mt-2 w-full px-4 py-3 text-sm outline-none resize-none"
            style={{
              borderRadius: 14,
              border: fieldError("message") ? "1px solid rgba(239,68,68,0.45)" : "1px solid var(--border)",
              boxShadow: "var(--shadow-soft)",
            }}
            placeholder="Tell us your travel dates, number of travelers, and what you’d like to see."
          />
          {fieldError("message") ? (
            <div className="mt-1 text-xs" style={{ color: "rgba(185,28,28,1)" }}>
              {errors.message}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn w-full px-6 py-3 text-sm"
          style={{
            background: "var(--accent)",
            color: "white",
            opacity: status === "sending" ? 0.75 : 1,
          }}
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        <div className="text-xs text-muted">
          This form is powered by Netlify Forms (no backend).
        </div>
      </form>
    </div>
  );
}