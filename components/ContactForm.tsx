"use client";

import { useState } from "react";
import { site } from "@/site.config";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "block w-full border-0 border-b border-chalk/25 bg-transparent px-0 py-3 text-base text-chalk placeholder:text-chalk-muted/70 focus:border-chalk focus:outline-none focus:ring-0 transition";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company")) return; // spam trap

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    if (!site.formEndpoint) {
      const subject = encodeURIComponent(`Hello from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="font-display text-3xl italic text-chalk">
        Thank you. We&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Name</span>
          <input name="name" type="text" required autoComplete="name" placeholder="Name" className={field} />
        </label>
        <label className="block">
          <span className="sr-only">Email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="Email" className={field} />
        </label>
      </div>
      <label className="block">
        <span className="sr-only">Message</span>
        <textarea name="message" required rows={3} placeholder="Message" className={`${field} resize-none`} />
      </label>

      <div aria-hidden className="hidden">
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-chalk-muted">
          Something went wrong — please email{" "}
          <a className="underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex items-center gap-3 rounded-full border border-chalk/40 px-6 py-3 text-sm font-medium tracking-wide text-chalk transition hover:border-chalk hover:bg-chalk hover:text-turf-deep disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send"}
        <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
      </button>
    </form>
  );
}
