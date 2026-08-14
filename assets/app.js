const root = document.getElementById("app");
const pageKey = document.body.dataset.page || "home";
window.PCGEN_JS_ENABLED = true;

const siteBasePath = location.hostname.endsWith("github.io") ? "/Pcgen-website" : "";
const currentPath = (() => {
  const pathname = location.pathname.replace(/\/index\.html$/, "/");
  if (siteBasePath && pathname.startsWith(`${siteBasePath}/`)) return pathname.slice(siteBasePath.length) || "/";
  if (siteBasePath && pathname === siteBasePath) return "/";
  return pathname;
})();

function siteUrl(value) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) return value;
  if (!siteBasePath || value.startsWith(`${siteBasePath}/`)) return value;
  return `${siteBasePath}${value}`;
}

function rewriteSiteUrls(html) {
  return html.replace(/\b(href|src)="\/(?!\/)/g, `$1="${siteBasePath || ""}/`);
}

const contact = {
  phone: "+356 2146 1111",
  tel: "0035621461111",
  email: "info@pcgen.mt",
  support: "support@pcgen.mt",
  address: "21, Triq Hal Dwin, Haz-Zebbug, Malta",
  hours: "Mon - Fri: 08:30 - 17:30",
  remoteSupport: "https://my.anydesk.com/",
  remoteSupportApple: "https://anydesk.com/en/downloads/mac-os",
  remoteSupportWindows: "https://anydesk.com/en/downloads/windows",
  facebook: "https://www.facebook.com/pcgen.mt",
  instagram: "https://www.instagram.com/pcgen.mt",
  linkedin: "https://www.linkedin.com/company/pcgen/"
};

const assets = {
  logo: "/assets/brand/logo.png",
  favicon: "/assets/brand/favicon.png",
  heroIcon: "/assets/brand/PCG-Icon-3D.png",
  heroVideo: "https://pcgen.mt/wp-content/uploads/2024/10/StoryBlock-jHQ3cBoeDl.mp4",
  aboutVideo: "https://pcgen.mt/wp-content/uploads/2024/10/StoryBlock-SO7rcnPFTE.mp4",
  clientsVideo: "https://pcgen.mt/wp-content/uploads/2024/10/StoryBlock-6JfWql180h.mp4",
  growthVideo: "/assets/principles.webm",
  founder: "https://pcgen.mt/wp-content/uploads/2024/10/Ken-Cauchi-BIO-V1.2.png",
  mission: "https://pcgen.mt/wp-content/uploads/2022/10/MissionStatement-Image.png",
  teamThumb: "/assets/brand/team-nev-thumbnail.png",
  team: "https://pcgen.mt/wp-content/uploads/elementor/thumbs/meet-the-Team--scaled-rampnlpjz033ne104htxkj3ebt5mhuabw47e75f3eo.jpg"
};

const nav = [
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Clients", href: "/clients/" },
  { label: "Careers", href: "/careers/" },
  { label: "Contact", href: "/contact/" }
];

const clientLogos = [
  ["Danzah Group", "https://pcgen.mt/wp-content/uploads/2024/10/Danzah_Group-preview.png"],
  ["BETA Paints", "https://pcgen.mt/wp-content/uploads/2024/10/logo-dark.png"],
  ["Andrew Vassallo", "https://pcgen.mt/wp-content/uploads/2024/10/Logo-Andrew-Vassallo-300x201-1.png"],
  ["ACM", "https://pcgen.mt/wp-content/uploads/2024/10/ACMalta-logo-1.png"],
  ["V&C Group", "https://pcgen.mt/wp-content/uploads/2024/10/VC-1.png"],
  ["Smart Effects", "https://pcgen.mt/wp-content/uploads/2024/10/Smart-Effects-Logo-02_09f4b862ce80add98c61bf3d53033050-min.png"],
  ["VGB", "https://pcgen.mt/wp-content/uploads/2024/10/VGB-main-logo@1.5x.svg"],
  ["TUM Invest", "https://pcgen.mt/wp-content/uploads/2024/10/TUMInvest_Logo_FullColour-e1562143591464.png"],
  ["Pitstop", "https://pcgen.mt/wp-content/uploads/2024/10/Pitstop-Logo.png"],
  ["J&G", "https://pcgen.mt/wp-content/uploads/2024/10/JG-LOGO.png"],
  ["FSH", "https://pcgen.mt/wp-content/uploads/2024/10/FSH-Logo.png"],
  ["Kencar", "https://pcgen.mt/wp-content/uploads/2024/10/Kencar-_Full-Logo-160x111-1.png"],
  ["Camel Brand", "https://pcgen.mt/wp-content/uploads/2024/10/camel-brand-logo.png"],
  ["GARD", "https://pcgen.mt/wp-content/uploads/2024/10/GARD.jpeg"],
  ["Fino", "/assets/Fino.png"]
];

const partnerLogos = [
  ["Microsoft Silver Partner", "https://pcgen.mt/wp-content/uploads/2024/09/27-274949_microsoft-silver-partner-logo-hd-png-download.png"],
  ["3CX Advanced Silver", "https://pcgen.mt/wp-content/uploads/2024/10/3CX-Advanced-Silver.png"],
  ["Technology Partner", "https://pcgen.mt/wp-content/uploads/2024/09/Screenshot-2024-09-24-164638.png"],
  ["CodeTwo Reseller", "https://pcgen.mt/wp-content/uploads/2024/09/codetwo-reseller-400x56-1-300x42-1.png"],
  ["Dell EMC Gold Partner", "https://pcgen.mt/wp-content/uploads/2024/09/DellEMC-Partner-Gold-01.png"],
  ["Bitdefender", "https://pcgen.mt/wp-content/uploads/2024/09/bitdefender.png"]
];

const services = [
  ["Business IT Support", "Keep your office devices functioning properly and your business running smoothly with desktop support services.", "Software standardisation, application support, equipment setup, and problem resolution."],
  ["Remote Support", "Get instant support through remote troubleshooting services.", "Our specialists connect securely to investigate and resolve technical issues with minimal downtime."],
  ["Bespoke Projects", "Get the IT package your business actually needs.", "From new office systems to industry-specific software configuration, we assess, recommend, and implement."],
  ["On-site Support", "Localised IT support when remote work is not the right option.", "Break/fix support, cabling, hardware work, and practical offline IT assistance."],
  ["IT Consultation", "New office setups, upgrade solutions and everything in between.", "Recommendations for hardware, software, cybersecurity, budgets, technology plans, and training."],
  ["Backup Recovery", "Protect business continuity in the event of data loss or system failure.", "Backup strategy, data classification, recovery planning, and disaster-readiness."],
  ["Security", "Protect systems, networks, and sensitive information.", "Access control, data encryption, security audits, breach prevention, and ongoing mitigation."],
  ["Industry Software", "Specialised software that meets your industry's needs.", "Vendor partnerships, consultancy, and software management to streamline operations."],
  ["Patch & Updates", "Keep systems protected against known vulnerabilities.", "Software patching, stability updates, and cyber-risk reduction."],
  ["Policy Management", "Protect sensitive data from unauthorised access or misuse.", "Security protocols and compliance measures for stronger business operations."],
  ["Network Administration", "Keep your network reliable, secure, and available.", "Network configuration, cabling, troubleshooting, and administration."],
  ["Server Administration", "Manage and maintain your computer servers.", "Server security, monitoring, maintenance, upgrades, and optimisation."],
  ["Antivirus Protection", "Detect, prevent and remove malware from computer systems.", "Antivirus management with updated, compatible protection."],
  ["Dedicated Hosting", "Gain control over your server configuration.", "Dedicated server setup, software changes, tuning, and ongoing server support."],
  ["Disaster Recovery", "Minimise the impact of disruptive events.", "Equipment replacement, Business Impact Analysis, Disaster Recovery Plans, backup and recovery."],
  ["Cloud Services Management", "Harness the full potential of the cloud.", "Migration and support for Office 365 and other cloud environments with high availability and security."]
];

const testimonials = [
  ["We have been working with PCGen for our IT services across all our group of companies, and the experience has been nothing short of exceptional. Their expertise has improved our operational efficiency and given us confidence that our technology needs are in capable hands.", "Christabelle Camilleri", "V&C Group"],
  ["Since we started to use the services of PC Gen our IT infrastructure became secure, reliable and efficient including amazing customer support. Definitely the right choice for every business looking for IT support.", "Daniel", "GARD Group"],
  ["Outstanding IT services with unmatched speed. They quickly resolved our issues, leaving us highly impressed.", "James Bonnici", "Danzah Group"],
  ["PCgen has been incredibly efficient and responsive, always solving our IT issues with speed and precision. Availability via phone, WhatsApp, and remote support makes assistance easy.", "Abigail Vella", "ACM"]
];

const team = [
  ["Founder & CEO", "Kenneth Cauchi"],
  ["IT Specialist & Team Leader", "Andre' Bartolo"],
  ["Full-Stack Support Engineer", "Gerald Lluca"],
  ["IT Support Engineer", "Rajul Raj"],
  ["IT Support Engineer", "Joe Smart"],
  ["IT Support Officer", "Sphamandla Maduna"],
  ["Accounts Executive", "Bridget Muscat"],
  ["IT Support Engineer", "Team Member"],
  ["IT Support Engineer", "Team Member"],
  ["Systems Administrator", "Team Member"],
  ["Technical Support Officer", "Team Member"],
  ["Client Support Coordinator", "Team Member"]
];

const jobs = {
  "technical-support-engineer": {
    title: "Technical Support Engineer",
    intro: "We are looking to hire an experienced, professional, motivated and efficient Technical Support Engineer to join our support team.",
    url: "/jobs/technical-support-engineer/",
    live: "https://pcgen.mt/jobs/technical-support-engineer/"
  },
  "junior-it-support-officer": {
    title: "Junior IT Support Officer",
    intro: "We are looking for a young and cheerful Junior IT Support Officer to join our support team.",
    url: "/jobs/junior-it-support-officer/",
    live: "https://pcgen.mt/jobs/junior-it-support-officer/"
  }
};

const jobRequirements = [
  "Hold a degree in computer science or equivalent.",
  "Have a minimum of 2 years' experience in a similar post.",
  "Provide technical support on Microsoft server platforms including installation, configuration, upgrades and maintenance.",
  "Be experienced with routers, firewalls, switches, server technologies, wireless infrastructure, IP telephony, installation and configuration.",
  "VMware and Hyper-V installation, configuration and monitoring.",
  "Office 365 and SharePoint configuration and monitoring.",
  "Be familiar with network design and infrastructure and document systems or network problems for future reference.",
  "Work effectively under pressure, multitask and meet deadlines.",
  "Be highly motivated, meticulous and possess excellent organisational and communication skills."
];

const jobAssets = [
  "Industry certification from Microsoft, HP, Cisco, Mikrotik, or other IT industry leaders.",
  "Certifications including MCP, MCSA, MCSE, ITIL, CCNA and 3CX.",
  "A clean driving licence and own transport."
];

const staticImageAssets = [
  "/assets/apple-logo-icon-14895.png",
  "/assets/Fino.png",
  "/assets/backgrounds/3D-Glass-Clones.png",
  "/assets/backgrounds/HeaderBG-2.png",
  "/assets/backgrounds/HeaderBG.png",
  "/assets/backgrounds/hero-flow.jpg",
  "/assets/brand/favicon.png",
  "/assets/brand/hero-3d-icon.png",
  "/assets/brand/hero-pcg-icon-3d-4.png",
  "/assets/brand/logo.png",
  "/assets/brand/PCG-Icon-3D.png",
  "/assets/brand/team-nev-thumbnail.png"
];

const sitePages = [
  "/",
  "/index.html",
  "/about/",
  "/services/",
  "/clients/",
  "/client-login/",
  "/client-portal/",
  "/client-admin/",
  "/careers/",
  "/contact/",
  "/meet-the-team/",
  "/remote-support.html",
  "/jobs/technical-support-engineer/",
  "/jobs/junior-it-support-officer/"
];

function isImageSource(src) {
  return typeof src === "string" && /\.(avif|gif|ico|jpe?g|png|svg|webp)(\?.*)?$/i.test(src);
}

function preloadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      resolve(src);
    };

    image.decoding = "async";
    image.loading = "eager";
    image.onload = () => {
      if (image.decode) image.decode().catch(() => {}).finally(done);
      else done();
    };
    image.onerror = done;
    image.src = siteUrl(src);
    if (image.complete) done();
  });
}

function preloadSiteImages() {
  const sources = [
    ...Object.values(assets),
    ...staticImageAssets,
    ...clientLogos.map(([, src]) => src),
    ...partnerLogos.map(([, src]) => src)
  ].filter(isImageSource);
  const uniqueSources = [...new Set(sources)];
  const imageLoads = Promise.allSettled(uniqueSources.map(preloadImage));
  const fallback = new Promise((resolve) => setTimeout(resolve, 4500));
  return Promise.race([imageLoads, fallback]);
}

function preloadPage(url) {
  return fetch(siteUrl(url), {
    cache: "force-cache",
    credentials: "same-origin",
    priority: "low"
  }).catch(() => null);
}

function preloadSitePages() {
  const uniquePages = [...new Set(sitePages)];
  const pageLoads = Promise.allSettled(uniquePages.map(preloadPage));
  const fallback = new Promise((resolve) => setTimeout(resolve, 2500));
  return Promise.race([pageLoads, fallback]);
}

function preloadWholeSite() {
  return Promise.allSettled([
    preloadSiteImages(),
    preloadSitePages()
  ]);
}

function header() {
  const active = currentPath;
  const links = nav.map((item) => `<a class="${active.startsWith(item.href) ? "is-active" : ""}" href="${item.href}">${item.label}</a>`).join("");
  return `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="/" aria-label="PC Gen home"><img src="${assets.logo}" alt="PC Gen"></a>
        <nav class="main-nav" id="main-nav">
          <span class="nav-group">
            <a class="${active.startsWith("/about/") || active.startsWith("/meet-the-team/") ? "is-active" : ""}" href="/about/">About</a>
            <span class="sub-menu">
              <a href="/about/"><strong>Company</strong><span>Purpose, history, and mission.</span></a>
              <a href="/meet-the-team/"><strong>PCGEN Team</strong><span>The people supporting your business.</span></a>
            </span>
          </span>
          ${links.replace('<a class="is-active" href="/about/">About</a>', "").replace('<a class="" href="/about/">About</a>', "")}
        </nav>
        <div class="support-downloads" aria-label="Header actions">
          <a class="remote-header-link" href="/remote-support.html">Remote Support</a>
        </div>
        <button class="menu-toggle" type="button" aria-label="Open menu" aria-controls="main-nav" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </header>`;
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <img class="footer-logo" src="${assets.logo}" alt="PC Gen">
            <p>IT solutions for businesses across Malta, from desktop support to bespoke infrastructure projects.</p>
            <div class="socials">
              <a href="${contact.facebook}" target="_blank" rel="noopener" aria-label="Facebook">f</a>
              <a href="${contact.instagram}" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
              <a href="${contact.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
            </div>
          </div>
          <div>
            <h3>Get in touch</h3>
            <ul>
              <li><a href="tel:${contact.tel}">${contact.phone}</a></li>
              <li><a href="mailto:${contact.email}">${contact.email}</a></li>
              <li><a href="mailto:${contact.support}">${contact.support}</a></li>
            </ul>
          </div>
          <div>
            <h3>Pages</h3>
            <ul>${nav.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h3>Popular services</h3>
            <ul>
              <li>Business IT support</li>
              <li>Help desk services</li>
              <li>Backup recovery</li>
              <li>Network administration</li>
              <li>Antivirus protection</li>
            </ul>
          </div>
        </div>
        <div class="copyright">
          <span>©2026 PC Generation LTD. All rights reserved.</span>
          <a href="https://pcgen.mt/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>
        </div>
      </div>
    </footer>
    <aside class="cookie" id="cookie">
      <p>We use cookies to improve your browsing experience. By clicking "Accept Cookies", you agree to storage that enhances navigation, analytics, and marketing.</p>
      <button class="button" type="button" data-accept-cookies>Accept Cookies</button>
    </aside>`;
}

function hero({ eyebrow, title, text, primary = ["Our services", "/services/"], secondary = ["Get in touch", "/contact/"], media = assets.heroVideo, showStats = false, showActions = true }) {
  const isImage = typeof media === "string" && /\.(avif|gif|jpe?g|png|webp|svg)$/i.test(media);
  const mediaMarkup = media
    ? isImage
      ? `<img class="hero-grid-image" src="${media}" alt="PC Gen 3D logo" loading="eager">`
      : `<div class="hero-media"><video src="${media}" autoplay loop muted playsinline></video></div>`
    : "";
  const statsMarkup = showStats
    ? `<div class="stats-strip">
        <div class="stat"><strong>200+</strong><span>Trusted clients</span></div>
        <div class="stat"><strong>16</strong><span>Years thriving</span></div>
        <div class="stat"><strong>24/7</strong><span>Business support</span></div>
      </div>`
    : "";
  const actionsMarkup = showActions
    ? `<div class="actions">
        <a class="button" href="${primary[1]}">${primary[0]}</a>
        <a class="button secondary" href="${secondary[1]}">${secondary[0]}</a>
      </div>`
    : "";

  return `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-content">
          ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
          <h1>${title}</h1>
          <p class="lead">${text}</p>
          ${statsMarkup}
          ${actionsMarkup}
        </div>
        ${mediaMarkup}
      </div>
    </section>`;
}

function homeHero() {
  return `
    <section class="hero home-hero">
      <div class="container home-hero-stage">
        <div class="home-hero-copy">
          <h1><span>YOUR IT<span class="title-accent-dot" aria-hidden="true"></span></span><span>OUR PASSION</span></h1>
          <div class="home-stats-line" aria-label="PC Gen highlights">
            <span style="padding-right: 8px;">24/7 Business Support</span>
            <span style="padding-left: 8px; padding-right: 8px;">16 Years of Experience</span>
            <span style="padding-left: 8px;">200+ Clients</span>
          </div>
          <p class="lead">PC Gen delivers end-to-end IT services without the cost and complexity of maintaining an in-house team. From technical support and managed IT to cybersecurity, infrastructure, and bespoke technology projects, we provide the expertise your business needs through a single trusted partner.</p>
        </div>
        <div class="home-hero-actions" aria-label="Home actions">
          <a class="home-action-tile" href="/services/"><span aria-hidden="true">+</span><strong>Our<br>Services</strong></a>
          <a class="home-action-tile secondary" href="/contact/"><span aria-hidden="true">+</span><strong>Get in<br>Touch</strong></a>
        </div>
      </div>
    </section>`;
}

function sectionHead(label, title, text) {
  return `<p class="eyebrow section-eyebrow">${label}</p><h2 class="section-title">${title}</h2>${text ? `<p class="section-copy">${text}</p>` : ""}`;
}

function logoGrid(items, klass = "logos") {
  return `<div class="${klass}">${items.map(([alt, src]) => `<div class="logo-tile"><img src="${src}" alt="${alt}" loading="lazy"></div>`).join("")}</div>`;
}

function logoCarousel(items) {
  const tiles = items.map(([alt, src]) => `<div class="logo-tile"><img src="${src}" alt="${alt}" loading="lazy"></div>`).join("");
  return `<div class="logo-carousel" aria-label="Client logos"><div class="logo-carousel-track"><div class="logo-carousel-set">${tiles}</div><div class="logo-carousel-set" aria-hidden="true">${tiles}</div></div></div>`;
}

function logoShowcase(items) {
  const tiles = items.map(([alt, src]) => `<div class="logo-tile"><img src="${src}" alt="${alt}" loading="lazy"></div>`).join("");
  return `
    <div class="logo-showcase" aria-label="Client logos carousel">
      <div class="logo-showcase-viewport" data-logo-viewport>
        <div class="logo-showcase-track">
          <div class="logo-showcase-set">${tiles}</div>
          <div class="logo-showcase-set" aria-hidden="true">${tiles}</div>
        </div>
      </div>
    </div>`;
}

function serviceCards(limit) {
  return `<div class="grid ${limit ? "three" : "four"}">${services.slice(0, limit || services.length).map((service) => `
    <article class="service-card">
      <h3>${service[0]}</h3>
      <details><summary>Read More</summary><p>${service[2]}</p></details>
    </article>`).join("")}</div>`;
}

function testimonialsMarkup(limit = testimonials.length) {
  return `<div class="grid two">${testimonials.slice(0, limit).map((item) => `
    <blockquote class="testimonial">
      <p>${item[0]}</p>
      <cite>${item[1]}<br><span>${item[2]}</span></cite>
    </blockquote>`).join("")}</div>`;
}

function newsletter() {
  return `
    <section class="section dark newsletter-section">
      <div class="container split">
        <div>
          <p class="eyebrow">Newsletter</p>
          <h2>Sign up for our newsletter</h2>
          <p class="lead">Be the first to know about releases, industry news, and insights.</p>
        </div>
        <form class="form-shell" action="mailto:${contact.email}" method="post" enctype="text/plain">
          <input type="email" name="email" placeholder="Email" required>
          <button class="button" type="submit">Subscribe</button>
        </form>
      </div>
    </section>`;
}

function mapSection() {
  const mapQuery = encodeURIComponent(contact.address);
  return `
    <section class="section map-section">
      <div class="map-frame">
        <a class="button map-link" href="https://maps.app.goo.gl/PJMP368dZn7D2Bxo6" target="_blank" rel="noopener">Open in Google Maps</a>
        <iframe
          title="PC Gen location map"
          src="https://www.google.com/maps?q=${mapQuery}&output=embed"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </section>`;
}

function money(amount, currency = "EUR") {
  const value = Number(amount || 0);
  return `${escapeHtml(currency)} ${value.toFixed(2)}`;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function apiRequest(url, options = {}) {
  return fetch(siteUrl(url), {
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  }).then(async (response) => {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Request failed.");
    return data;
  });
}

function licenceRows(licences = []) {
  if (!licences.length) return `<p class="notice">No licences have been added yet.</p>`;
  return licences.map((licence) => `
    <article class="portal-item">
      <div>
        <strong>${escapeHtml(licence.product || "Licence")}</strong>
        <span>${Number(licence.seats || 0)} seats</span>
      </div>
      <div>
        <span>Expires</span>
        <strong>${escapeHtml(licence.expires || "Not set")}</strong>
      </div>
      <span class="portal-status">${escapeHtml(licence.status || "Active")}</span>
    </article>`).join("");
}

function billRows(bills = []) {
  if (!bills.length) return `<p class="notice">No bills have been added yet.</p>`;
  return bills.map((bill) => `
    <article class="portal-item">
      <div>
        <strong>${escapeHtml(bill.invoice || "Invoice")}</strong>
        <span>Due ${escapeHtml(bill.dueDate || "Not set")}</span>
      </div>
      <div>
        <span>Amount</span>
        <strong>${money(bill.amount, bill.currency)}</strong>
      </div>
      <span class="portal-status">${escapeHtml(bill.status || "Pending")}</span>
    </article>`).join("");
}

function serialisePortalLines(items = [], type) {
  return items.map((item) => type === "licence"
    ? `${item.product || ""} | ${item.seats || 0} | ${item.expires || ""} | ${item.status || ""}`
    : `${item.invoice || ""} | ${item.amount || 0} | ${item.currency || "EUR"} | ${item.dueDate || ""} | ${item.status || ""}`
  ).join("\n");
}

function parsePortalLines(value, type) {
  return String(value || "").split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
    const parts = line.split("|").map((part) => part.trim());
    return type === "licence"
      ? { product: parts[0] || "Licence", seats: Number(parts[1] || 0), expires: parts[2] || "", status: parts[3] || "Active" }
      : { invoice: parts[0] || "Invoice", amount: Number(parts[1] || 0), currency: parts[2] || "EUR", dueDate: parts[3] || "", status: parts[4] || "Pending" };
  });
}

function clientLoginPage() {
  return `
    <section class="section dark portal-auth">
      <div class="container">
        <div class="portal-auth-grid">
          <div>
            <p class="eyebrow">Client Login</p>
            <h1>Access your client area</h1>
            <p class="lead">Clients can review company details, licence expiry dates, pending bills, and request new licence purchases.</p>
          </div>
          <div class="portal-auth-cards">
            <form class="form-shell portal-form portal-auth-card" data-client-login>
              <h2>Client access</h2>
              <input type="email" name="email" placeholder="Client email" autocomplete="email" required>
              <input type="password" name="accessCode" placeholder="Access code" autocomplete="current-password" required>
              <button class="button" type="submit">Login</button>
            </form>
            <form class="form-shell portal-form portal-auth-card" data-admin-login>
              <h2>Web admin</h2>
              <input type="password" name="password" placeholder="Admin password" autocomplete="current-password" required>
              <button class="button" type="submit">Admin login</button>
            </form>
          </div>
        </div>
      </div>
    </section>
    ${newsletter()}`;
}

function clientPortalPage() {
  return `
    <section class="section dark portal-section">
      <div class="container portal-shell" data-client-portal>
        <p class="eyebrow">Client Portal</p>
        <h1>Loading client details</h1>
        <p class="lead">Please wait while we load your account.</p>
      </div>
    </section>
    ${newsletter()}`;
}

function clientAdminPage() {
  return `
    <section class="section dark portal-section">
      <div class="container portal-shell" data-client-admin>
        <p class="eyebrow">Web Admin</p>
        <h1>Client database</h1>
        <p class="lead">Login to add, edit, or remove client records.</p>
        <form class="form-shell portal-form admin-login-inline" data-admin-login>
          <input type="password" name="password" placeholder="Admin password" autocomplete="current-password" required>
          <button class="button" type="submit">Admin login</button>
          <p class="notice" data-admin-message></p>
        </form>
      </div>
    </section>
    ${newsletter()}`;
}

const pages = {
  home: () => `
    ${homeHero()}
    <section class="section">
      <div class="container">
        ${sectionHead("Trusted by 200+ clients", "Supporting IT needs across global businesses", "")}
        ${logoShowcase(clientLogos)}
      </div>
    </section>
    <section class="section soft section-soft-media">
      <video class="soft-section-video" src="${assets.growthVideo}" autoplay loop muted playsinline></video>
      <div class="container split soft-section-content">
        <div aria-hidden="true"></div>
        <div class="copy">
          <p class="eyebrow">Since 2008</p>
          <h2>We have been thriving for 16 years</h2>
          <p>First founded in 2008 on the Island of Malta, PCGEN was launched with the aim of providing regional small businesses with the tools they need to increase productivity and efficiency.</p>
          <p>We treat our clients as business partners and take pride in their success. Our work is built around proactive solutions designed for each client's specific needs.</p>
        </div>
      </div>
    </section>
    <section class="section dark">
      <div class="container">
        ${sectionHead("Why outsource?", "An expert IT team without the in-house overhead", "Outsourcing IT support gives businesses skilled people, lower risk, and predictable support without building an internal department from scratch.")}
        <div class="grid three">
          <article class="card"><span class="icon">01</span><h3>Cost-Effective</h3><p>Benefit from an entire team of experts at a fraction of the cost of a full in-house team.</p></article>
          <article class="card"><span class="icon">02</span><h3>Skilled & Experienced</h3><p>Get instant access to trained IT engineers with years of practical experience.</p></article>
          <article class="card"><span class="icon">03</span><h3>Reduce Risk</h3><p>Use experienced providers with industry-specific knowledge and proactive monitoring.</p></article>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        ${sectionHead("Managed services", "Data analytics, content & IT managed services", "PC Gen manages a wide range of company IT needs under one roof.")}
        ${serviceCards(6)}
      </div>
    </section>
    <section class="section soft"><div class="container">${sectionHead("Technology partners", "Our technology partners", "Recognised vendor relationships that support reliable business IT delivery.")}${logoGrid(partnerLogos)}</div></section>
    ${newsletter()}
  `,

  about: () => `
    ${hero({
      eyebrow: "About PC Gen",
      title: "We operate in a unique way",
      text: "Like an extension of your company, we work alongside you to help your business thrive while your employees focus on core operations.",
      media: null
    })}
    <section class="section">
      <div class="container">
        ${sectionHead("Why choose us", "Experience, colleagues, clients, and services working together", "Founded in 2008, PC Gen was built to help Maltese small businesses increase productivity through streamlined IT operations.")}
        <div class="grid four">
          <article class="card"><span class="icon">16</span><h3>Years of experience</h3><p>Practical knowledge across changing business IT environments.</p></article>
          <article class="card"><span class="icon">+</span><h3>Expert colleagues</h3><p>Qualified technicians and consultants for day-to-day and project work.</p></article>
          <article class="card"><span class="icon">200</span><h3>Clients</h3><p>Trusted by more than 200 organisations.</p></article>
          <article class="card"><span class="icon">IT</span><h3>Different services</h3><p>Support, security, cloud, disaster recovery, hosting, and more.</p></article>
        </div>
      </div>
    </section>
    <section class="section soft">
      <div class="container split">
        <div class="portrait"><img src="${assets.founder}" alt="Kenneth Cauchi" loading="lazy"></div>
        <div class="copy">
          <p class="eyebrow">Founder vision</p>
          <h2>Kenneth Cauchi has a purpose and a vision</h2>
          <p>Founded in 2008 by Kenneth Cauchi, PC Generation Ltd. was created with a singular purpose: to help small businesses in Malta increase productivity and efficiency through streamlined IT operations.</p>
          <p>At PC Gen, IT is our passion. We stay abreast of technological advancements so companies can make informed decisions and keep succeeding in a contemporary business environment.</p>
        </div>
      </div>
    </section>
    <section class="section dark">
      <div class="container split">
        <div class="copy">
          <p class="eyebrow">Mission statement</p>
          <h2>Your company deserves IT support that understands your needs</h2>
          <p>We believe our clients' success is our success. That means proactive support, clear guidance, and practical solutions tailored to real business requirements.</p>
        </div>
        <div class="feature-media"><img src="${assets.mission}" alt="PC Gen mission" loading="lazy"></div>
      </div>
    </section>
    <section class="section"><div class="container">${sectionHead("Trusted by 200+ clients", "Businesses using PC Gen", "A selection of client logos retained from the current site.")}${logoCarousel(clientLogos)}</div></section>
    ${newsletter()}
  `,

  team: () => `
    <section class="team-section">
      <div class="container">
        <div class="team-panel">
          <p class="eyebrow">Team Section</p>
          <h2>Meet the Team</h2>
          <p class="team-intro">Meet our team of professionals serving businesses across Malta.</p>
          <div class="team-actions">
            <a class="button" href="/about/">About us</a>
            <a class="button secondary" href="/contact/">Contact</a>
          </div>
          <div class="team-card-grid">
            ${team.map(([role, name]) => `
              <article class="team-card">
                <img src="${assets.teamThumb}" alt="${name}" loading="lazy">
                <div class="team-card-body">
                  <p>${role}</p>
                  <h3>${name}</h3>
                  <span class="team-card-dots" aria-hidden="true"><i></i><i></i><i></i></span>
                </div>
              </article>`).join("")}
          </div>
        </div>
      </div>
    </section>
    ${newsletter()}
  `,

  services: () => `
    ${hero({
      eyebrow: "Services",
      title: "Our wide range of services",
      text: "From desktop support to bespoke projects, PC Gen is every business's one-stop-shop for IT solutions.",
      media: null,
      primary: ["Get in touch", "/contact/"],
      secondary: ["View clients", "/clients/"],
      showActions: false
    })}
    <section class="section">
      <div class="container">
        ${sectionHead("All services", "Built around the needs of business IT", "Every service from the current website is preserved, with expandable details for easier browsing on desktop and mobile.")}
        ${serviceCards()}
      </div>
    </section>
    <section class="section dark">
      <div class="container split">
        <div><p class="eyebrow">Interested?</p><h2>Any of our services pique your interest?</h2></div>
        <div><p class="lead">Our team is available to offer support whenever you need it.</p></div>
      </div>
    </section>
    ${newsletter()}
  `,

  "remote-support": () => `
    <section class="section dark remote-support-page">
      <div class="container">
        ${sectionHead("Remote Support", "Remote Support", "Choose your device to download the PC Gen remote-support application.")}
        <div class="remote-support-grid">
          <a class="remote-support-card" href="https://my.anydesk.com/v2/api/v2/custom-clients/downloads/public/FY8O7MPM13EK/AnyDeskClient.exe" target="_blank" rel="noopener">
            <span class="platform-icon windows" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <rect x="2" y="2" width="9" height="9" rx="0.8"></rect>
                <rect x="13" y="2" width="9" height="9" rx="0.8"></rect>
                <rect x="2" y="13" width="9" height="9" rx="0.8"></rect>
                <rect x="13" y="13" width="9" height="9" rx="0.8"></rect>
              </svg>
            </span>
            <span>Anydesk for Windows</span>
            <strong aria-hidden="true">-&gt;</strong>
          </a>
          <a class="remote-support-card" href="https://my.anydesk.com/v2/api/v2/custom-clients/downloads/public/AEBHO13ZS2OL/Customers-copy.dmg" target="_blank" rel="noopener">
            <span class="platform-icon apple-logo" aria-hidden="true"><img src="/assets/apple-logo-icon-14895.png" alt=""></span>
            <span>Anydesk for macOS</span>
            <strong aria-hidden="true">-&gt;</strong>
          </a>
        </div>
        <p class="remote-support-note">Open the downloaded file and share the displayed address with your support engineer.</p>
      </div>
    </section>
    ${newsletter()}
  `,

  "client-login": () => clientLoginPage(),

  "client-portal": () => clientPortalPage(),

  "client-admin": () => clientAdminPage(),

  clients: () => `
    ${hero({
      eyebrow: "Clients",
      title: '<span class="hero-title-line">Trusted by 200+</span><span class="hero-title-line">Customers</span>',
      text: "PC Gen provides IT services and solutions to over 200 businesses, supported by a reliable team and consistent results.",
      media: null,
      primary: ["Get in touch", "/contact/"],
      secondary: ["View services", "/services/"],
      showActions: false
    })}
    <section class="section">
      <div class="container">
        ${sectionHead("Client satisfaction", "Beneficial to our business", "Current customer stories kept intact and redesigned for quicker scanning.")}
        ${testimonialsMarkup()}
      </div>
    </section>
    <section class="section soft"><div class="container">${sectionHead("Local businesses", "Many local businesses have used our services", "The client logos from the existing site are retained as live media links.")}${logoGrid(clientLogos)}</div></section>
    <section class="section dark">
      <div class="container split">
        <div><p class="eyebrow">Next success story</p><h2>Become the next in PC Gen's success story.</h2></div>
        <div><p class="lead">Outsource to PC Gen and give your business the tools it needs to thrive.</p></div>
      </div>
    </section>
    ${newsletter()}
  `,

  careers: () => `
    ${hero({
      eyebrow: "Careers",
      title: "We're looking for IT experts",
      text: "Our company is growing and we are always looking for talented IT experts to join our dynamic team.",
      media: null,
      primary: ["View openings", "#openings"],
      secondary: ["Contact us", "/contact/"],
      showActions: false
    })}
    <section class="section" id="openings">
      <div class="container">
        ${sectionHead("Support", "Start doing work that matters", "Open positions in our support team.")}
        <div class="grid">
          ${Object.values(jobs).map((job) => `<article class="job-card"><div><h3>${job.title}</h3><p>Job Type: Full Time</p></div><a class="button" href="${job.url}">More Details</a></article>`).join("")}
        </div>
      </div>
    </section>
    ${newsletter()}
  `,

  contact: () => `
    ${hero({
      eyebrow: "Get in touch",
      title: "Talk to the PC Gen team",
      text: "The existing contact details and service options are preserved, with a cleaner responsive form.",
      media: null,
      primary: ["Call us", `tel:${contact.tel}`],
      secondary: ["Email us", `mailto:${contact.email}`],
      showActions: false
    })}
    <section class="section dark">
      <div class="container">
        <div class="split">
          <div class="card">
            <ul class="contact-list">
              <li><strong>Find us</strong><span>${contact.address}</span></li>
              <li><strong>Call</strong><a href="tel:${contact.tel}">${contact.phone}</a></li>
              <li><strong>Email</strong><a href="mailto:${contact.email}">${contact.email}</a><a href="mailto:${contact.support}">${contact.support}</a></li>
              <li><strong>Opening Hours</strong><span>${contact.hours}</span></li>
            </ul>
          </div>
          <form class="form-shell" action="mailto:${contact.email}" method="post" enctype="text/plain">
            <input type="hidden" name="post_id" value="452">
            <input type="hidden" name="form_id" value="cd9d219">
            <input type="text" name="form_fields[name]" placeholder="Full Name">
            <input type="email" name="form_fields[email]" placeholder="Email address" required>
            <input type="tel" name="form_fields[field_bcbd461]" placeholder="Contact number" required>
            <select name="form_fields[field_d07a9d7]" required>
              <option>Business IT support</option>
              <option>Remote support</option>
              <option>On-site support</option>
              <option>Disaster recovery</option>
              <option>IT consultation</option>
              <option>Security</option>
            </select>
            <textarea name="form_fields[message]" placeholder="Your message here..."></textarea>
            <button class="button" type="submit">Submit now</button>
          </form>
        </div>
      </div>
    </section>
    ${mapSection()}
    ${newsletter()}
  `
};

function jobPage(slug) {
  const job = jobs[slug];
  return `
    <section class="section dark">
      <div class="container">
        ${sectionHead("Careers", job.title, job.intro)}
        <div class="split">
          <div class="card">
            <h3>Job Requirements</h3>
            <ul>${jobRequirements.map((item) => `<li>${item}</li>`).join("")}</ul>
            <h3 style="margin-top:28px">Assets to the role</h3>
            <ul>${jobAssets.map((item) => `<li>${item}</li>`).join("")}</ul>
            <p class="notice">Job Type: Full Time</p>
          </div>
          <form class="form-shell" action="mailto:${contact.email}" method="post" enctype="text/plain">
            <h2>Apply for this position</h2>
            <input type="hidden" name="position" value="${job.title}">
            <input type="text" name="awsm_applicant_name" placeholder="Full Name" required>
            <input type="email" name="awsm_applicant_email" placeholder="Email" required>
            <input type="tel" name="awsm_applicant_phone" placeholder="Phone" required>
            <textarea name="awsm_applicant_letter" placeholder="Cover Letter" required></textarea>
            <p class="notice">CV upload requires the live WordPress application form. The original application link is preserved below.</p>
            <button class="button" type="submit">Email application</button>
            <a class="button secondary" href="${job.live}" target="_blank" rel="noopener">Apply on live site</a>
          </form>
        </div>
      </div>
    </section>
    ${newsletter()}
  `;
}

function render() {
  let content;
  if (pageKey.startsWith("job:")) content = jobPage(pageKey.split(":")[1]);
  else content = pages[pageKey] ? pages[pageKey]() : pages.home();
  root.innerHTML = rewriteSiteUrls(header() + content + footer());
  bindUI();
}

function bindLoginForms() {
  document.querySelectorAll("[data-client-login]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const message = form.querySelector("[data-login-message]");
      const formData = new FormData(form);
      if (message) message.textContent = "Checking details...";
      try {
        await apiRequest("/api/client/login", {
          method: "POST",
          body: JSON.stringify({
            email: formData.get("email"),
            accessCode: formData.get("accessCode")
          })
        });
        location.href = siteUrl("/client-portal/");
      } catch (error) {
        if (message) message.textContent = error.message;
      }
    });
  });

  document.querySelectorAll("[data-admin-login]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const message = form.querySelector("[data-admin-message]");
      const formData = new FormData(form);
      if (message) message.textContent = "Checking admin access...";
      try {
        await apiRequest("/api/admin/login", {
          method: "POST",
          body: JSON.stringify({ password: formData.get("password") })
        });
        location.href = siteUrl("/client-admin/");
      } catch (error) {
        if (message) message.textContent = error.message;
      }
    });
  });
}

function renderClientPortal(client) {
  const portal = document.querySelector("[data-client-portal]");
  if (!portal) return;
  const pendingBills = (client.bills || []).filter((bill) => String(bill.status || "").toLowerCase() !== "paid");
  portal.innerHTML = `
    <div class="portal-topline">
      <div>
        <p class="eyebrow">Client Portal</p>
        <h1>${escapeHtml(client.companyName)}</h1>
        <p class="lead">Welcome ${escapeHtml(client.contactName || "to your PC Gen client area")}.</p>
      </div>
      <button class="button secondary" type="button" data-portal-logout>Logout</button>
    </div>
    <div class="portal-summary">
      <article><span>Status</span><strong>${escapeHtml(client.status || "Active")}</strong></article>
      <article><span>Account manager</span><strong>${escapeHtml(client.accountManager || "PC Gen Support")}</strong></article>
      <article><span>Pending bills</span><strong>${pendingBills.length}</strong></article>
    </div>
    <div class="portal-grid">
      <section class="portal-card">
        <h2>Company details</h2>
        <ul class="contact-list">
          <li><strong>Contact</strong><span>${escapeHtml(client.contactName || "-")}</span></li>
          <li><strong>Email</strong><a href="mailto:${encodeURIComponent(client.email)}">${escapeHtml(client.email)}</a></li>
          <li><strong>Phone</strong><span>${escapeHtml(client.phone || "-")}</span></li>
        </ul>
      </section>
      <section class="portal-card">
        <div class="portal-card-head">
          <h2>Licences</h2>
          <a class="button" href="mailto:${contact.email}?subject=New%20licence%20request%20-%20${encodeURIComponent(client.companyName)}">Request new licence</a>
        </div>
        <div class="portal-list">${licenceRows(client.licences)}</div>
      </section>
      <section class="portal-card portal-wide">
        <h2>Billing</h2>
        <div class="portal-list">${billRows(client.bills)}</div>
      </section>
    </div>`;
  bindPortalLogout();
}

async function bindClientPortal() {
  const portal = document.querySelector("[data-client-portal]");
  if (!portal) return;
  try {
    const data = await apiRequest("/api/client/me");
    renderClientPortal(data.client);
  } catch {
    portal.innerHTML = `
      <p class="eyebrow">Client Portal</p>
      <h1>Login required</h1>
      <p class="lead">Please login to view your client details, licence expiry dates, and pending bills.</p>
      <a class="button" href="/client-login/">Client login</a>`;
  }
}

function renderAdminClientList(clients) {
  return clients.map((client) => `
    <article class="admin-client" data-client-id="${client.id}">
      <div>
        <h3>${escapeHtml(client.companyName)}</h3>
        <p>${escapeHtml(client.contactName || "No contact")} &middot; ${escapeHtml(client.email)}</p>
        <span>${(client.licences || []).length} licences &middot; ${(client.bills || []).length} bills &middot; ${escapeHtml(client.status || "Active")}</span>
      </div>
      <div class="admin-actions">
        <button class="button secondary" type="button" data-edit-client="${client.id}">Edit</button>
        <button class="button secondary" type="button" data-delete-client="${client.id}">Remove</button>
      </div>
    </article>`).join("");
}

function adminForm(client = {}) {
  return `
    <form class="form-shell portal-form admin-client-form" data-admin-client-form>
      <input type="hidden" name="id" value="${escapeHtml(client.id || "")}">
      <div class="form-grid-two">
        <input type="text" name="companyName" placeholder="Company name" value="${escapeHtml(client.companyName || "")}" required>
        <input type="text" name="contactName" placeholder="Contact name" value="${escapeHtml(client.contactName || "")}">
        <input type="email" name="email" placeholder="Client email" value="${escapeHtml(client.email || "")}" required>
        <input type="text" name="phone" placeholder="Phone" value="${escapeHtml(client.phone || "")}">
        <input type="text" name="accessCode" placeholder="Access code" value="${escapeHtml(client.accessCode || "")}">
        <input type="text" name="status" placeholder="Status" value="${escapeHtml(client.status || "Active")}">
        <input type="text" name="accountManager" placeholder="Account manager" value="${escapeHtml(client.accountManager || "PC Gen Support")}">
      </div>
      <textarea name="licences" placeholder="Licences: Product | Seats | Expiry date | Status">${escapeHtml(serialisePortalLines(client.licences, "licence"))}</textarea>
      <textarea name="bills" placeholder="Bills: Invoice | Amount | Currency | Due date | Status">${escapeHtml(serialisePortalLines(client.bills, "bill"))}</textarea>
      <div class="admin-form-actions">
        <button class="button" type="submit">${client.id ? "Update client" : "Add client"}</button>
        <button class="button secondary" type="button" data-clear-admin-form>Clear</button>
      </div>
      <p class="notice" data-admin-save-message></p>
    </form>`;
}

async function bindClientAdmin() {
  const shell = document.querySelector("[data-client-admin]");
  if (!shell) return;

  async function loadAdmin(selectedId = "") {
    try {
      const data = await apiRequest("/api/admin/clients");
      const selected = data.clients.find((client) => client.id === selectedId) || {};
      shell.innerHTML = `
        <div class="portal-topline">
          <div>
            <p class="eyebrow">Web Admin</p>
            <h1>Client database</h1>
            <p class="lead">Add, edit, or remove client records, licences, and pending bills.</p>
          </div>
          <button class="button secondary" type="button" data-portal-logout>Logout</button>
        </div>
        <div class="portal-grid admin-grid">
          <section class="portal-card">${adminForm(selected)}</section>
          <section class="portal-card">
            <h2>Clients</h2>
            <div class="admin-client-list">${renderAdminClientList(data.clients)}</div>
          </section>
        </div>`;
      bindClientAdminActions(loadAdmin);
      bindPortalLogout();
    } catch {
      shell.innerHTML = `
        <p class="eyebrow">Web Admin</p>
        <h1>Client database</h1>
        <p class="lead">Login to add, edit, or remove client records.</p>
        <form class="form-shell portal-form admin-login-inline" data-admin-login>
          <input type="password" name="password" placeholder="Admin password" autocomplete="current-password" required>
          <button class="button" type="submit">Admin login</button>
          <p class="notice" data-admin-message></p>
        </form>`;
      bindLoginForms();
    }
  }

  loadAdmin();
}

function bindClientAdminActions(loadAdmin) {
  const form = document.querySelector("[data-admin-client-form]");
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = form.querySelector("[data-admin-save-message]");
    const formData = new FormData(form);
    const id = formData.get("id");
    const payload = {
      companyName: formData.get("companyName"),
      contactName: formData.get("contactName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      accessCode: formData.get("accessCode"),
      status: formData.get("status"),
      accountManager: formData.get("accountManager"),
      licences: parsePortalLines(formData.get("licences"), "licence"),
      bills: parsePortalLines(formData.get("bills"), "bill")
    };
    message.textContent = "Saving...";
    try {
      await apiRequest(id ? `/api/admin/clients/${id}` : "/api/admin/clients", {
        method: id ? "PUT" : "POST",
        body: JSON.stringify(payload)
      });
      loadAdmin();
    } catch (error) {
      message.textContent = error.message;
    }
  });

  document.querySelector("[data-clear-admin-form]")?.addEventListener("click", () => loadAdmin());
  document.querySelectorAll("[data-edit-client]").forEach((button) => {
    button.addEventListener("click", () => loadAdmin(button.dataset.editClient));
  });
  document.querySelectorAll("[data-delete-client]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!confirm("Remove this client record?")) return;
      await apiRequest(`/api/admin/clients/${button.dataset.deleteClient}`, { method: "DELETE" });
      loadAdmin();
    });
  });
}

function bindPortalLogout() {
  document.querySelectorAll("[data-portal-logout]").forEach((button) => {
    button.addEventListener("click", async () => {
      await apiRequest("/api/logout", { method: "POST", body: "{}" }).catch(() => null);
      location.href = siteUrl("/client-login/");
    });
  });
}

function bindHeaderBgParallax() {
  const heroes = [...document.querySelectorAll(".hero")].filter((heroElement) => {
    const backgroundImage = getComputedStyle(heroElement).backgroundImage;
    const overlayImage = getComputedStyle(heroElement, "::after").backgroundImage;
    return backgroundImage.includes("HeaderBG") || overlayImage.includes("hero-flow.jpg");
  });
  if (!heroes.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const state = heroes.map((heroElement) => ({ heroElement, current: 0, target: 0 }));
  let animationFrame = 0;

  const measure = () => {
    state.forEach((item) => {
      const { heroElement } = item;
      const rect = heroElement.getBoundingClientRect();
      item.target = Math.max(-90, Math.min(90, -rect.top * 0.16));
    });
  };

  const animate = () => {
    let active = false;
    state.forEach((item) => {
      item.current += (item.target - item.current) * 0.09;
      if (Math.abs(item.target - item.current) > 0.08) active = true;
      item.heroElement.style.setProperty("--header-bg-parallax", `${item.current.toFixed(2)}px`);
      item.heroElement.style.setProperty("--hero-flow-parallax", `${item.current.toFixed(2)}px`);
    });
    animationFrame = active ? requestAnimationFrame(animate) : 0;
  };

  const requestUpdate = () => {
    measure();
    if (!animationFrame) animationFrame = requestAnimationFrame(animate);
  };

  requestUpdate();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}

function bindNewsletterParallax() {
  const sections = [...document.querySelectorAll(".newsletter-section")];
  if (!sections.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const state = sections.map((section) => ({ section, current: 0, target: 0 }));
  let animationFrame = 0;

  const measure = () => {
    state.forEach((item) => {
      const rect = item.section.getBoundingClientRect();
      item.target = Math.max(-80, Math.min(80, -rect.top * 0.12));
    });
  };

  const animate = () => {
    let active = false;
    state.forEach((item) => {
      item.current += (item.target - item.current) * 0.09;
      if (Math.abs(item.target - item.current) > 0.08) active = true;
      item.section.style.setProperty("--newsletter-bg-parallax", `${item.current.toFixed(2)}px`);
    });
    animationFrame = active ? requestAnimationFrame(animate) : 0;
  };

  const requestUpdate = () => {
    measure();
    if (!animationFrame) animationFrame = requestAnimationFrame(animate);
  };

  requestUpdate();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}

function bindUI() {
  const headerElement = document.querySelector(".site-header");
  const updateHeaderState = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    headerElement?.classList.toggle("is-scrolled", scrollTop > 24);
  };
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  document.querySelectorAll("video[data-playback-rate]").forEach((video) => {
    const rate = Number(video.dataset.playbackRate);
    if (Number.isFinite(rate) && rate > 0) {
      video.defaultPlaybackRate = rate;
      video.playbackRate = rate;
    }
  });

  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".main-nav");
  toggle?.addEventListener("click", () => {
    const open = !menu.classList.contains("is-open");
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  const cookie = document.getElementById("cookie");
  const storage = (() => {
    try {
      return typeof localStorage === "undefined" ? null : localStorage;
    } catch {
      return null;
    }
  })();
  if (storage?.getItem("pcgenCookieOK")) cookie?.classList.add("hidden");
  document.querySelector("[data-accept-cookies]")?.addEventListener("click", () => {
    storage?.setItem("pcgenCookieOK", "1");
    cookie?.classList.add("hidden");
  });

  const revealItems = document.querySelectorAll(".section, .card, .service-card, .testimonial, .job-card, .team-card");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => {
      item.classList.add("reveal");
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  bindLoginForms();
  bindClientPortal();
  bindClientAdmin();
  bindPortalLogout();
  bindHeaderBgParallax();
  bindNewsletterParallax();
}

root.setAttribute("aria-busy", "true");
preloadWholeSite().finally(() => {
  render();
  root.removeAttribute("aria-busy");
  requestAnimationFrame(() => root.classList.add("app-ready"));
});
