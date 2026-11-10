/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE to change the words on the website.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Discovery Sports",

  /** Tiny line at the top of the page. */
  eyebrow: "Westchester, NY — Est. 2026",

  /** The big heading. The last word is set in italic. */
  heading: "Discovery Sports",

  /** One short line under the heading. */
  subheading: "Bringing people together.",

  /** Sports listed in the "Sports" dropdown at the top right. */
  sports: ["Golf", "Padel", "Skiing"],

  /**
   * Optional: use your own photo for the top of the page instead of the illustrated
   * mountain scene. Put the image in the /public folder (e.g. public/hero.jpg) and
   * write "/hero.jpg" here. Leave "" to use the illustration.
   */
  heroImage: "",

  /** Values — one word each. */
  values: ["Access", "Movement", "Community", "Joy"],

  /** Contact section heading. */
  contactHeading: "Come play.",

  /** What Google shows as the blue link title (keep under ~60 characters). */
  seoTitle: "Discovery Sports | Westchester, NY Sports Nonprofit",

  /** What Google shows under the title (keep under ~160 characters). */
  seoDescription:
    "Discovery Sports is a Westchester, NY nonprofit making sports accessible to everyone — more movement, more joy, more community.",

  keywords: [
    "Discovery Sports",
    "Discovery Sports Westchester",
    "sports nonprofit Westchester",
    "accessible sports Westchester NY",
    "community sports Westchester",
  ],

  /** The public web address (no trailing slash). */
  url: "https://www.discoverysports.org",

  /** Public contact email. */
  email: "hello@discoverysports.org",

  location: "Westchester, NY",
  region: "NY",

  /** e.g. "A 501(c)(3) nonprofit." — leave "" to hide. */
  legalNote: "",

  /**
   * Contact form delivery. Paste a form endpoint (e.g. from formspree.io) to have
   * messages emailed to you. If "", the form opens the visitor's email app instead.
   */
  formEndpoint: "",

  /** Optional social links. */
  social: [
    // { label: "Instagram", href: "https://instagram.com/yourpage" },
  ] as { label: string; href: string }[],
};
