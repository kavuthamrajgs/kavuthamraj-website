// All content for the site lives here.
// Sources: kavuthamraj.framer.website (live site), LinkedIn profile, Naukri profile.
// Left out on purpose: phone number, personal email, and any figure not yet verified
// (app/website/screen counts beyond the employment record, award claims, client logos, downloads, percentages).

export const profile = {
  name: "Kavuthamraj Geetha Senthilkumar",
  short: "Kavuthamraj",
  role: "Senior UI/UX & Product Designer",
  location: "From Tiruppur, Tamil Nadu",
  url: "https://www.kavuthamraj.com",
  email: "kavutham99raj@gmail.com",
  availability: "Available for new opportunities",
  headline: ["Kavuthamraj", "Geetha Senthilkumar"],
  intro:
    "I design end-to-end digital products (B2B, B2C, SaaS, ERP and back-office systems) that are clear to use and hard to forget.",
  about: [
    "I'm a senior UI/UX and product designer with 5+ years of experience turning messy, real-world workflows into calm, usable interfaces.",
    "My work spans research, information architecture, interaction design, visual systems and hand-off. I care about the details that make a product feel inevitable: spacing, states, edge cases, and the words on the button.",
    "I've worked on enterprise dashboards, B2C booking and ordering apps, and full product design for startups. I build accessible design systems (WCAG 2.1 AA), design AI products, and prototype in Figma, Framer and Claude.",
  ],
  industries: ["Sports", "Retail", "E-commerce", "Healthcare", "AI", "Accounts & Finance"],
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kavuthamraj/" },
    { label: "Behance", href: "https://www.behance.net/gallery/224132329/ERP-Solutionfor-Sports-Industry" },
  ],
  oldSite: "https://kavuthamraj.framer.website/",
};

// Every project from the live Framer "Work" list (14), plus the ERP case study.
// `case` = internal case page (slug). Otherwise the card links to the Framer case study.
export const projects = [
  {
    key: "cyberdine",
    title: "Cyberdine: QR dine-in ordering",
    tags: ["UX Case Study", "B2B SaaS"],
    cover: "cyberdine.png",
    summary: "Don't wait for the captain. Order from the table. Cyberdine's shortlist-only menu became QR ordering that diners complete on their own.",
    case: "cyberdine",
  },
  {
    key: "payroll",
    title: "Payroll Module for Sports ERP",
    tags: ["Case study", "Payroll", "Accounts"],
    cover: "payroll.png",
    summary: "Payroll built into a mobile-first sports ERP, for organisations and their staff.",
    case: "payroll",
  },
  {
    key: "erp",
    title: "ERP Solution for Sports Industry",
    tags: ["ERP", "Payroll", "Mobile"],
    cover: "erp-solution.png",
    summary: "An end-to-end ERP for the sports industry, designed mobile-first for Sporfy.",
    case: "erp",
  },
  {
    key: "titan",
    title: "Titan: Skeleton Loading for B2B SaaS",
    tags: ["UX Case Study", "B2B SaaS", "Design System"],
    cover: "titan.png",
    summary: "Stop the spinner. Keep the work moving. How full-page loaders became skeleton states across Titan.",
    case: "titan",
  },
  {
    key: "educonnect",
    title: "Educonnect: Tuition and Online Education",
    tags: ["App Design", "UI/UX Design", "Research"],
    cover: "educonnect.png",
    summary: "A tuition and online-education platform connecting students, tutors and parents in one place.",
    case: "educonnect",
  },
  {
    key: "m-music",
    title: "M: Music",
    tags: ["Web Design", "UI Design", "Research"],
    cover: "m-music.png",
    summary: "A music platform designed around discovery and listening flow, from research to web UI.",
    case: "m-music",
  },
  {
    key: "redbus",
    title: "RedBus: Daily Rider Pass",
    tags: ["UX Case Study", "New Feature", "Research"],
    cover: "redbus.png",
    summary: "A UX case study exploring a daily rider pass for regular bus commuters.",
    case: "redbus",
  },
  {
    key: "customerlabs",
    title: "CustomerLabs: First Party Data",
    tags: ["Web App Design", "Branding", "Marketing"],
    cover: "customerlabs.png",
    case: "customerlabs",
  },
  {
    key: "rang",
    title: "Rang Clothing: E-commerce Transformation",
    tags: ["Web Design", "Branding", "Marketing"],
    cover: "rang-clothing.png",
    summary: "Turning an established apparel manufacturer into a digital brand, with a new e-commerce presence.",
    case: "rang-clothing",
  },
  {
    key: "present-onboard",
    title: "Present Onboard",
    tags: ["Healthcare", "Login"],
    cover: "present-onboard.png",
    summary: "A clean, trustworthy login and onboarding interface for a healthcare product.",
    case: "present-onboard",
  },
  {
    key: "evento",
    title: "Evento: Event Booking App",
    tags: ["Web Design", "Booking App", "Event"],
    cover: "evento.png",
    case: "evento",
  },
  {
    key: "sports-ecommerce",
    title: "Sports E-Commerce",
    tags: ["Web Design", "Branding", "Marketing"],
    cover: "sports-ecommerce.png",
    case: "sports-ecommerce",
  },
  {
    key: "next-messenger",
    title: "Next Messenger",
    tags: ["Chatting App", "Communication"],
    cover: "next-messenger.png",
    case: "next-messenger",
  },
  {
    key: "slay",
    title: "Slay: Simplify Financial Transactions",
    tags: ["Web Design", "Branding", "Marketing"],
    cover: "slay.webp",
    summary: "A modern digital payment concept for individuals, teams and enterprises. Clean layouts, clear flows and a calm visual hierarchy.",
    case: "slay",
  },
];

export const experience = [
  {
    role: "Senior UI/UX Designer",
    company: "AffinityX",
    tags: ["B2B SaaS", "ERP", "Order management", "Dynamic QR"],
    dates: "Sep 2025 to present",
    note: "Co-owns UX and UI for Titan, a B2B SaaS back-office and ERP product. Redesigning high-volume order screens for the product. Also designed and built QR Raj, AffinityX's dynamic QR code studio, end to end.",
  },
  {
    role: "Founding Member and Design Lead",
    company: "Liffto Technologies",
    tags: ["Founding team", "Hospitality", "AI SaaS", "E-commerce"],
    dates: "Nov 2024 to Jul 2025",
    note: "Led design for hospitality, retail and logistics software, including a B2B e-commerce website, an AI-powered client management SaaS, and the Cyberdine restaurant ordering product.",
  },
  {
    role: "UI/UX Designer",
    company: "SRM Technologies",
    tags: ["Enterprise apps", "Agile teams", "Design system"],
    dates: "Nov 2023 to Sep 2024",
    note: "Designed enterprise application and website UI/UX in Figma within Agile teams, and built and maintained design system components.",
  },
  {
    role: "Visual and UI/UX Designer",
    company: "Sporfy",
    tags: ["B2C app", "Sports ERP", "User research", "Google Play"],
    dates: "Jul 2021 to Oct 2023",
    note: "Designed Sporfy, a B2C turf and event booking app on Google Play, end to end with user research. Also worked on Sporfy Tracker, the sports ERP and payroll system, and other product work.",
  },
];

export const skills = {
  Design: [
    "Product design", "UX research", "Interaction design", "Information architecture",
    "Wireframing and prototyping", "Usability testing", "Visual design", "Design systems",
    "Accessibility (WCAG 2.1 AA)", "AI product design",
  ],
  Tools: ["Figma", "Framer", "Adobe XD", "After Effects", "Figma AI", "Claude", "Jira", "Slack"],
  Build: ["HTML", "CSS", "JavaScript", "React", "MUI v6"],
};

export const education = [
  { title: "MBA, Business Administration and Management (online)", org: "SRM University, Kattankulathur", dates: "Feb 2023 to Jan 2025" },
  { title: "Bachelor's degree in Visual Communication", org: "PSG College of Arts & Science", dates: "2018 to 2021" },
  { title: "User Experience (UX) Design certificate", org: "Google", dates: "" },
];

// Long-form case studies (text from the live Framer pages, or written from the owner's own notes).
export const cases = {
  titan: {
    title: "Titan: Skeleton Loading for B2B SaaS",
    lead: "Stop the spinner. Keep the work moving.",
    summary: "How I replaced Titan's full-page loaders with skeleton states, so operations teams kept working while their data loaded.",
    meta: [
      ["Role", "Senior UI/UX Designer, 1 of 2 designers"],
      ["Team", "Product manager, stakeholders and developers"],
      ["Timeline", "2 weeks, wireframe to release"],
      ["Scope", "Loading audit, research, wireframes, UI, handoff"],
      ["Tools", "Figma, MUI v6 design system"],
    ],
    body: [
      "It started with a message from the PM. Every time a table loaded in Titan, users saw a full-page loader and couldn't touch anything else until it finished. One slow table, and the whole product was frozen.",
      "That sounded bigger than one screen. So I went through the tables, dashboards and data panels, and the same loader was waiting everywhere. The question changed from \"how do I fix this table?\" to \"how should Titan load, everywhere?\"",
      "I studied how Jira handles loading in its data-heavy views, compared the patterns side by side, and proposed skeleton loaders.",
    ],
    cover: "titan.png",
  },
  cyberdine: {
    title: "Cyberdine: QR dine-in ordering",
    lead: "Don't wait for the captain. Order from the table.",
    summary: "How I turned Cyberdine's shortlist-only menu into QR ordering that diners complete on their own, with staff still checking each dish.",
    meta: [
      ["Role", "UI/UX and product designer, the only designer on Cyberdine"],
      ["Team", "Design by me; developers built it from my handoff"],
      ["Timeline", "About 1 year, design through developer handoff"],
      ["Scope", "Customer app (35 screens), restaurant app (about 200), flows, UI, states, handoff"],
    ],
    body: [
      "QR dine-in ordering for Indian restaurants, a product of Liffto Technologies.",
      "Diners could browse and shortlist dishes, but they couldn't order. After that, diners waited for a captain (the waiter who takes orders) to come and take the order.",
      "The dish sheet only asked for quantity. Portion, spice and notes were settled outside the app.",
    ],
    cover: "cyberdine.png",
  },
  erp: {
    title: "ERP Solution for Sports Industry",
    lead: "Run the whole game.",
    summary: "An end-to-end ERP for the sports industry, designed mobile-first for Sporfy, with payroll built into the Sporfy Tracker app.",
    meta: [
      ["Role", "Planned and designed end to end, on my own"],
      ["Team", "Worked under the CEO and CTO"],
      ["Client", "Sporfy"],
      ["Focus", "ERP, payroll, mobile"],
    ],
    body: [
      "Bring an ERP for the sports industry into a mobile-first app. The work started from the users' vision and goals, then looked at where the product stood as an ERP, and then carried those needs into the app's screens.",
      "I planned and designed the project end to end on my own, working under the CEO and CTO.",
      "Payroll is part of the Sporfy Tracker app, alongside the attendance, schedules and fee tracking the app already covers.",
    ],
    cover: "erp-solution.png",
    link: "https://www.behance.net/gallery/224132329/ERP-Solutionfor-Sports-Industry",
  },
};

// ---------- sections for the editorial home page ----------
export const heroCopy = [
  "I design end-to-end products for B2B SaaS, ERP and consumer apps, so they are clear to use and hard to forget.",
  "Now Senior UI/UX Designer at AffinityX, working on Titan, a B2B SaaS back-office product, and QR Raj, a dynamic QR studio I designed and built.",
];

// Only figures with a public or published source.
export const impact = [
  { value: "50K+", label: "Sporfy installs", text: "Designed Sporfy, a B2C turf and event booking app, end to end with user research. 50K+ installs on Google Play.", cta: "See the app", href: "https://play.google.com/store/apps/details?id=com.sporfy.customer", tone: "mocha", ext: true },
  { value: "~235", label: "Cyberdine screens", text: "Sole designer on Cyberdine, QR dine-in ordering for Indian restaurants: a 35-screen customer app and a ~200-screen restaurant app.", cta: "See case study", href: "work/cyberdine.html", tone: "clay" },
  { value: "2 wks", label: "Titan, wireframe to release", text: "Replaced Titan's full-page loaders with skeleton states, so operations teams kept working while data loaded.", cta: "See case study", href: "work/titan.html", tone: "sage" },
];

export const strengths = [
  { t: "Product design", d: "End-to-end products for B2B SaaS, ERP and consumer apps, from first sketch to production-ready screens and handoff." },
  { t: "Design systems", d: "Accessible systems and component libraries (WCAG 2.1 AA, MUI v6) that keep product teams fast and consistent." },
  { t: "UX research", d: "Interviews, audits, flows and competitor studies, so the team designs the right thing first." },
  { t: "AI prototyping", d: "Working prototypes in Figma, Framer and Claude, so stakeholders try ideas before development starts." },
];

export const featured = [
  { key: "erp", stats: ["2 years, end to end", "Solo, under the CEO and CTO", "Live on Google Play"], title: "Bringing a sports ERP into a mobile-first app.", text: "Planned and designed end to end under the CEO and CTO: organisation, accounts and payroll, resources, classes, and slots and lockers.", href: "work/erp.html", cover: "erp-solution.png", tone: "dark" },
  { key: "titan", stats: ["Wireframe to release in 2 weeks", "~40% faster-feeling (PM estimate)", "Now a product-wide standard"], title: "Stop the spinner. Keep the work moving.", text: "How I replaced Titan's full-page loaders with skeleton states, so operations teams kept working while their data loaded.", href: "work/titan.html", cover: "titan.png", tone: "sage" },
  { key: "cyberdine", stats: ["Sole designer, ~235 screens", "6–15 restaurants at peak", "~600 orders a day at peak"], title: "Don't wait for the captain. Order from the table.", text: "QR ordering that diners complete on their own, with restaurant staff still checking each dish.", href: "work/cyberdine.html", cover: "cyberdine.png", tone: "mocha" },
  { key: "redbus", stats: ["Concept, 1 week", "New-feature research"], title: "A daily pass for regular bus commuters.", text: "A UX case study for RedBus: one subscription for fixed routes, with one-tap booking and live tracking.", href: "work/redbus.html", cover: "redbus.png", tone: "black" },
];

// PLACEHOLDERS: replace each with a real LinkedIn recommendation before going live.
export const testimonials = [
  { name: "Product Manager", role: "Titan, AffinityX", quote: "Replace with a real recommendation about working together on Titan: the loading audit, the skeleton states and the handoff.", placeholder: true },
  { name: "CEO or CTO", role: "Sporfy", quote: "Replace with a real recommendation about the sports ERP and payroll work, and what it was like to work with you.", placeholder: true },
  { name: "Developer", role: "Cyberdine, Liffto Technologies", quote: "Replace with a real recommendation about your handoff quality and how easy your designs were to build.", placeholder: true },
  { name: "Design Lead", role: "SRM Technologies", quote: "Replace with a real recommendation about your work on enterprise apps and the design system.", placeholder: true },
];



// QR Raj: AffinityX's dynamic QR studio, designed and built end to end.
// Source: the AffinityX-QR repository (README, CHANGELOG, AUTHORS, DESIGN_SYSTEM.md, UI_PLAYBOOK.md).
// No scan figures here on purpose: the product removed invented numbers from its own demo, and so does this page.
export const qrRaj = {
  key: "qr-raj",
  name: "QR Raj",
  title: "QR Raj: dynamic QR codes for AffinityX",
  lead: "QR codes you can change after you print them.",
  summary: "I designed and built AffinityX's QR studio end to end: thirteen code types, a live design studio, and dynamic codes you can repoint after they are printed, with every scan landing on the dashboard as it happens.",
  live: "https://qr.kavuthamraj.com",
  liveLabel: "qr.kavuthamraj.com",
  demo: "No AffinityX account? Choose “Login as Tester” on the sign-in screen. It opens a shared demo with sample codes and sample scan data.",
  stats: [["13", "code types"], ["2048px", "print-ready export"], ["Live", "scan counts"], ["1", "designer and developer"]],
  meta: [
    ["Role", "Designer and developer, end to end. Sole author"],
    ["Product", "Internal tool for AffinityX, live at qr.kavuthamraj.com"],
    ["Scope", "Product design, design system, React front end, FastAPI back end, Postgres schema"],
    ["Status", "Live. Version 1.1.0, September 2026"],
  ],
  tldr: [
    ["Problem", "A printed QR code is a picture of its data. Change the link and every poster, sticker and box already printed is wrong."],
    ["Idea", "Encode a short link we own instead. The picture never changes; where it points is a database row anyone on the team can edit."],
    ["Outcome", "A live internal tool: 13 code types, a design studio, print-ready export and real-time scan analytics, behind company sign-in."],
  ],
  types: ["Website URL", "Contact card", "Wi-Fi", "Text", "Email", "SMS", "Phone", "WhatsApp", "Event", "App", "Link tree", "Coupon", "Feedback"],
  styling: ["6 body patterns", "Corner styles", "Separate corner and body colours", "Gradients", "6 frames with custom call to action", "Centre logo or your own upload", "Reusable templates", "PNG, JPEG, SVG, WEBP at 2048px"],
  destinations: ["/menu/spring", "/menu/summer", "/events/launch-night"],
  flow: [
    ["Scan", "A phone opens the short link. It hits the API first, because the API owns every short link."],
    ["Look up", "The API finds the code by its slug in Postgres."],
    ["Count", "The scan is recorded before the redirect, so nothing is lost, and the owner's dashboard ticks live over a WebSocket."],
    ["Land", "Codes with a destination redirect straight through. The rest open a branded page: contact card, Wi-Fi, event or coupon."],
  ],
  decisions: [
    ["The short link is fixed once saved", "The destination, design, name and on/off switch stay editable forever. The slug is what's printed on the poster, so changing it would orphan every copy instead of repointing them. It is editable while you create the code, read-only after, and the screen says why instead of leaving people to find out."],
    ["Two right numbers, labelled so they look right", "The analytics headline counts distinct devices across the whole range; each bar counts devices that day. A phone that scans on three days is one visitor in the first and three in the second, so both were correct and looked contradictory under the same label. The bars became Visitors that day plus Repeat scans. No number changed, only the words."],
    ["A demo that tells the truth", "The sign-in card started as a mockup with invented scan figures, then a still image. It now renders a real code through the product's own pipeline, says it is static, and says what dynamic adds. Someone can use the product before deciding whether to trust it with an account."],
    ["Bounded input keeps the promise", "A centre logo forces error correction H, and longer links mean denser codes. So the demo field is bounded, keeping “point your camera at it” true rather than hedging the sentence."],
    ["Interactive things sit flat", "The old demo card tilted in 3D. That suited a display object, but on something you type into it blurs the text and moves the hit area away from where it is painted, so the operated card sits flat."],
    ["Save without downloading", "Editing a code offers Save as well as Save and download, because fixing a typo should not mean taking a second copy of an image you already have."],
    ["Refusals that say what works", "Sign-in is limited to AffinityX addresses, on every route rather than only the Google button. A refused colleague gets a message that names both company domains, so they know what will work."],
  ],
  system: {
    intro: "I wrote the design system down as one document that designers, developers and AI assistants can all follow, and built it so other AffinityX products can adopt it while keeping their own brand colour.",
    ramp: [["100", "#E4E6F3"], ["200", "#C7CBE7"], ["300", "#9EA5D6"], ["400", "#6E78C1"], ["500", "#3E4BAC"], ["600", "#364196"], ["700", "#2D367C"], ["800", "#232A60"], ["900", "#1B204A"]],
    rules: [
      ["10px radius on almost everything", "The most repeated value in the product, 218 uses, and the fastest way to make a new screen belong."],
      ["Hairlines before shadows", "Surfaces are separated by a border first. Shadow is kept for things that genuinely float."],
      ["One accent, used sparingly", "Indigo marks the path forward: the primary action, the current place, the live state."],
      ["Skeletons, not spinners", "And never a confident zero while data is still loading."],
    ],
  },
  engineering: [
    ["Refuses to boot on a bad deploy", "If the database is behind the code's migrations, the API will not start and names the missing revisions, instead of failing three hours later from deep inside a query."],
    ["Guards the signing key", "In production, placeholder or short secrets are rejected at startup, because that key is a full authentication bypass in the wrong hands."],
    ["Printed codes resolve forever", "A code in the world carries whatever short-link host was current when it was printed, so old hosts must keep resolving. Retiring one would kill every code already out there."],
  ],
  stack: ["React 18", "Vite 5", "Tailwind 3", "TanStack Query", "FastAPI", "SQLAlchemy 2", "Postgres", "WebSockets", "Vitest", "pytest"],
};
