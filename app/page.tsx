import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import Landscape from "@/components/Landscape";
import SportsMenu from "@/components/SportsMenu";
import { site } from "@/site.config";

function Heading() {
  // Set the last word in italic for a little flourish.
  const words = site.heading.split(" ");
  const last = words.pop();
  return (
    <>
      {words.join(" ")} <em className="italic">{last}</em>
    </>
  );
}

export default function Home() {
  const year = new Date().getFullYear();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: site.name,
    description: site.seoDescription,
    url: site.url,
    email: site.email,
    address: { "@type": "PostalAddress", addressRegion: site.region, addressCountry: "US" },
    areaServed: { "@type": "AdministrativeArea", name: "Westchester County, New York" },
    ...(site.social.length && { sameAs: site.social.map((s) => s.href) }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="absolute inset-x-0 top-0 z-20">
        <nav aria-label="Main" className="mx-auto flex h-20 max-w-6xl items-center justify-end gap-7 px-4 sm:px-8">
          <SportsMenu sports={site.sports} />
          <a href="#contact" className="py-2 text-sm text-chalk/80 transition hover:text-chalk">
            Contact
          </a>
        </nav>
      </header>

      <main>
        {/* Hero
            Phones & tablets: the scene fills the screen and the words sit in the sky above it.
            Laptops & up: the whole scene is shown zoomed out, with the words underneath the courts. */}
        <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-turf-deep">
          <div className="absolute inset-0 lg:relative lg:inset-auto lg:h-[min(calc(100svh-13rem),38.75vw)] lg:w-full lg:shrink-0">
            {site.heroImage ? (
              <Image src={site.heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
            ) : (
              <>
                {/* Taller crop on phones keeps the peaks below the heading */}
                <Landscape id="ls-m" viewBox="0 -320 1600 1320" className="sm:hidden" />
                <Landscape id="ls-t" viewBox="0 0 1600 1000" className="hidden sm:block lg:hidden" />
                {/* Laptops: the whole scene, from just above the peaks down to the courts, always in view */}
                <Landscape id="ls-d" viewBox="0 380 1600 620" fit className="hidden lg:block" />
              </>
            )}
            {/* Shade the sky slightly so the words and menu always read clearly */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(6_18_16/0.55),rgb(6_18_16/0.15)_45%,transparent_70%)] lg:bg-[linear-gradient(to_bottom,rgb(6_18_16/0.5),transparent_22%)]"
            />
            {/* Laptops: let the meadow melt into the dark green below */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 hidden h-1/4 bg-gradient-to-b from-transparent to-turf-deep lg:block"
            />
          </div>
          <div className="relative mx-auto w-full max-w-6xl px-4 pt-32 sm:px-8 sm:pt-36 lg:flex lg:flex-1 lg:flex-col lg:items-center lg:justify-center lg:pb-14 lg:pt-4 lg:text-center">
            <p className="rise flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-chalk/75">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ball" />
              {site.eyebrow}
            </p>
            <h1 className="rise rise-2 mt-5 font-display text-7xl leading-[0.92] tracking-tight drop-shadow-[0_2px_24px_rgb(0_0_0/0.35)] sm:text-8xl lg:mt-4 lg:text-[7.5rem]">
              <Heading />
            </h1>
            <p className="rise rise-3 mt-5 max-w-lg text-lg text-chalk/80 sm:text-xl lg:mt-4">{site.subheading}</p>
          </div>
        </section>

        {/* Values */}
        <section id="values" aria-label="Our values" className="border-y border-chalk/10 bg-turf-deep">
          <ul className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
            {site.values.map((v, i) => (
              <li
                key={v}
                className={`px-4 py-14 sm:px-8 sm:py-20 ${i % 2 ? "border-l border-chalk/10" : ""} ${
                  i > 1 ? "border-t border-chalk/10 lg:border-t-0" : ""
                } ${i === 2 ? "lg:border-l" : ""}`}
              >
                <span className="font-display text-4xl sm:text-5xl">{v}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section id="contact" className="turf relative overflow-hidden">
          <div className="relative mx-auto grid max-w-6xl gap-14 px-4 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:gap-24">
            <div>
              <h2 className="font-display text-6xl leading-none tracking-tight sm:text-7xl">{site.contactHeading}</h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-8 inline-block text-lg text-chalk-muted underline decoration-chalk/30 underline-offset-8 transition hover:text-chalk hover:decoration-chalk"
              >
                {site.email}
              </a>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="bg-turf-deep">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-xs tracking-wide text-chalk-muted sm:flex-row sm:justify-between sm:px-8">
          <p>
            © {year} {site.name}
          </p>
          <p>
            {site.location}
            {site.legalNote && ` · ${site.legalNote}`}
            {site.social.map((s) => (
              <span key={s.href}>
                {" · "}
                <a href={s.href} className="hover:text-chalk" target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </footer>
    </>
  );
}
