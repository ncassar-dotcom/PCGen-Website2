const root = document.getElementById("app");
const pageKey = document.body.dataset.page || "home";
window.PCGEN_JS_ENABLED = true;

const githubPagesBasePath = "/PCGen-Website2";
const siteBasePath = location.hostname === "ncassar-dotcom.github.io" ? githubPagesBasePath : "";
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
  growthVideo: "/assets/hero-flow-wiggle-loop.webm",
  founder: "https://pcgen.mt/wp-content/uploads/2024/10/Ken-Cauchi-BIO-V1.2.png",
  mission: "https://pcgen.mt/wp-content/uploads/2022/10/MissionStatement-Image.png",
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
  ["Camel Brand", "/assets/clients-logos/CamelBrand-white.svg", "/assets/clients-logos/CamelBrand.svg"],
  ["GARD", "https://pcgen.mt/wp-content/uploads/2024/10/GARD.jpeg"],
  ["Fino", "/assets/Fino.png"]
];

const clientsHeroLogos = [
  ["Andrew Vassallo", "/assets/clients-logos/AV.png"],
  ["Camel Brand", "/assets/clients-logos/CamelBrand-white.svg", "/assets/clients-logos/CamelBrand.svg"],
  ["Danzah Group", "/assets/clients-logos/Danzah.png"],
  ["FSH", "/assets/clients-logos/FSH-Logo.png"],
  ["GARD", "/assets/clients-logos/GARD.png"],
  ["Client logo", "/assets/clients-logos/image002.png"],
  ["J&G", "/assets/clients-logos/JG-LOGO.png"],
  ["Kencar", "/assets/clients-logos/Kencar-_Full-Logo-160x111-1.png"],
  ["Pitstop", "/assets/clients-logos/Pitstop-Logo.png"],
  ["Smart Effects", "/assets/clients-logos/smart-effects-color-logo.png"],
  ["TUM Invest", "/assets/clients-logos/TUMInvest_Logo_FullColour-e1562143591464.png"],
  ["V&C Group", "/assets/clients-logos/VC-1.png"],
  ["VGB", "/assets/clients-logos/VGB-main-logo@1.png"]
];

const partnerLogos = [
  ["Microsoft Silver Partner", "/assets/ms.png"],
  ["3CX", "/assets/3cx-logo.png"],
  ["Acronis", "/assets/Acronis-logo-white.svg"],
  ["CodeTwo", "/assets/codetwo-logo.webp"],
  ["Dell Technologies", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dell_Technologies_logo.svg"],
  ["Bitdefender", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Bitdefender_logo.svg"]
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
  { name: "Kenneth Cauchi", role: "Owner", image: "/assets/team/kenneth-cauchi.png" },
  { name: "Andre Bartolo", role: "Team Lead", image: "/assets/team/andre-bartolo.png" },
  { name: "Gerald Lluca", role: "Full-Stack Support Engineer", image: "/assets/team/gerald-lluca.png" },
  { name: "Bridget Muscat", role: "Accounts Executive", image: "/assets/team/bridget-muscat.png" },
  { name: "Joe Smart", role: "IT Support Engineer", image: "/assets/team/joe-smart.png" },
  { name: "Rajul Raj", role: "IT Support Engineer", image: "/assets/team/rajul-raj.png" },
  { name: "Sphamandla Maduna", role: "IT Support Officer" },
  { name: "Nipuna Athauda", role: "IT Support Engineer", image: "/assets/team/nipuna-athauda.png" },
  { name: "Asma Troudi", role: "Client Support Coordinator", image: "/assets/team/asma-troudi.jpg" },
  { name: "Neville Cassar", role: "Technical Support Officer", image: "/assets/team/neville-cassar.png" },
  { name: "Kiran Kumar Dandu", role: "IT Support Engineer" },
  { name: "Rishwik", role: "IT Support Engineer" }
];

const staticImageAssets = [
  "/assets/apple-logo-icon-14895.png",
  "/assets/Fino.png",
  "/assets/backgrounds/3D-Glass-Clones.png",
  "/assets/backgrounds/HeaderBG-2.png",
  "/assets/backgrounds/HeaderBG.png",
  "/assets/backgrounds/hero-flow.jpg",
  "/assets/3cx-logo.png",
  "/assets/Acronis-logo-white.svg",
  "/assets/brand/favicon.png",
  "/assets/brand/hero-3d-icon.png",
  "/assets/brand/hero-pcg-icon-3d-4.png",
  "/assets/brand/logo.png",
  "/assets/brand/PCG-Icon-3D.png",
  "/assets/brand/team-nev-thumbnail.png",
  "/assets/codetwo-logo.webp",
  "/assets/ms.png"
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
    ...team.map((member) => member.image),
    ...clientLogos.flatMap(([, src, hoverSrc]) => [src, hoverSrc]),
    ...clientsHeroLogos.flatMap(([, src, hoverSrc]) => [src, hoverSrc]),
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
  const menuLinks = [
    ["About", "/about/"],
    ["The Team", "/meet-the-team/"],
    ["Services", "/services/"],
    ["Clients", "/clients/"],
    ["Careers", "/careers/"],
    ["Contact", "/contact/"]
  ].map(([label, href]) => `<a class="" href="${href}">${label}</a>`).join("");
  return `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="/" aria-label="PC Gen home"><img src="${assets.logo}" alt="PC Gen"></a>
        <nav class="main-nav" id="main-nav">
          <div class="main-nav-top">
            <a class="main-nav-support" href="/remote-support.html">Remote Support</a>
          </div>
          <div class="main-nav-links">
            ${menuLinks}
          </div>
          <div class="main-nav-footer">
            <div class="socials">
              <a href="${contact.facebook}" target="_blank" rel="noopener" aria-label="Facebook">f</a>
              <a href="${contact.instagram}" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
              <a href="${contact.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
            </div>
            <a href="" title="Call 0035621461111 via 3CX" tcxhref="0035621461111" target="_blank">${contact.phone}</a>
            <a href="mailto:${contact.support}">${contact.support}</a>
          </div>
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
          <h1>${title}<span class="title-accent-dot" aria-hidden="true"></span></h1>
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
          <h1><span>YOUR IT</span><span>OUR PASSION<span class="title-accent-dot" aria-hidden="true"></span></span></h1>
          <p class="home-hero-kicker">Managed IT. Secure Infrastructure. Results.</p>
        </div>
        ${logoGrid(partnerLogos, "logos home-hero-logos")}
        <div class="home-hero-actions" aria-label="Home actions">
          <a class="home-action-tile" href="/services/"><span aria-hidden="true">+</span><strong>Our<br>Services</strong></a>
          <a class="home-action-tile secondary" href="/contact/"><span aria-hidden="true">+</span><strong>Get in<br>Touch</strong></a>
        </div>
      </div>
    </section>`;
}

function homeProofSection() {
  return `
    <section class="section home-proof-section">
      <div class="container home-proof-grid">
        <div class="home-proof-copy">
          <p>PC Gen delivers end-to-end IT services without the cost and complexity of maintaining an in-house team. From technical support and managed IT to cybersecurity, infrastructure, and bespoke technology projects, we provide the expertise your business needs through a single trusted partner.</p>
        </div>
        <div class="home-proof-metrics" aria-label="PC Gen highlights">
          <article>
            <strong>24/7</strong>
            <span>Business support</span>
          </article>
          <article>
            <strong>16+</strong>
            <span>Years of experience</span>
          </article>
          <article>
            <strong>200+</strong>
            <span>Clients supported</span>
          </article>
        </div>
      </div>
    </section>`;
}

function sectionHead(label, title, text) {
  return `<h2 class="section-title">${title}</h2>${text ? `<p class="section-copy">${text}</p>` : ""}`;
}

function logoTile([alt, src, hoverSrc]) {
  const swap = hoverSrc
    ? ` data-logo-default="${siteUrl(src)}" data-logo-hover="${siteUrl(hoverSrc)}" style="filter: none"`
    : "";
  return `<div class="logo-tile"><img src="${src}" alt="${alt}" loading="lazy"${swap}></div>`;
}

function logoGrid(items, klass = "logos") {
  return `<div class="${klass}">${items.map(logoTile).join("")}</div>`;
}

function logoCarousel(items) {
  const tiles = items.map(logoTile).join("");
  return `<div class="logo-carousel" aria-label="Client logos"><div class="logo-carousel-track"><div class="logo-carousel-set">${tiles}</div><div class="logo-carousel-set" aria-hidden="true">${tiles}</div></div></div>`;
}

function logoShowcase(items) {
  const tiles = items.map(logoTile).join("");
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
      <span class="service-card-dot" aria-hidden="true"></span>
      <h3>${service[0]}</h3>
      <p>${service[2]}</p>
      <span class="service-card-bar" aria-hidden="true"></span>
    </article>`).join("")}</div>`;
}

function servicePills(limit = 6) {
  return `<div class="home-services-pills">${services.slice(0, limit).map((service) => `
    <a class="home-service-pill" href="/services/">
      <span class="home-service-ring" aria-hidden="true"></span>
      <span>${service[0]}</span>
    </a>`).join("")}</div>`;
}

function testimonialsMarkup(limit = testimonials.length) {
  return `<div class="grid two">${testimonials.slice(0, limit).map((item) => `
    <blockquote class="testimonial">
      <p>${item[0]}</p>
      <cite>${item[1]}<br><span>${item[2]}</span></cite>
    </blockquote>`).join("")}</div>`;
}

function clientHeroStories() {
  return `<div class="clients-hero-stories" aria-label="Client satisfaction stories">${testimonials.map((item, index) => `
    <blockquote class="clients-hero-story">
      <span class="clients-hero-story-number">${String(index + 1).padStart(2, "0")}</span>
      <p>${item[0]}</p>
      <cite>${item[1]}<br><span>${item[2]}</span></cite>
    </blockquote>`).join("")}</div>`;
}

function newsletter() {
  return "";
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

function escapeAttribute(value = "") {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function formatVacancyDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, "-");
}

function vacancyMeta(vacancy) {
  return [
    vacancy.employmentType,
    vacancy.applyBy ? `Apply by ${formatVacancyDate(vacancy.applyBy)}` : vacancy.applyByLabel,
    vacancy.location
  ].filter(Boolean);
}

function vacancyLogo(vacancy) {
  if (vacancy.logo) {
    return `<img src="${escapeAttribute(siteUrl(vacancy.logo))}" alt="" loading="lazy">`;
  }
  return `<span>${escapeHtml((vacancy.company || vacancy.title || "PC").slice(0, 2).toUpperCase())}</span>`;
}

function vacancyListItem(vacancy, selectedId) {
  const meta = vacancyMeta(vacancy);
  return `
    <button class="vacancy-list-item${vacancy.id === selectedId ? " is-selected" : ""}" type="button" data-vacancy-id="${escapeAttribute(vacancy.id)}">
      <span class="vacancy-logo">${vacancyLogo(vacancy)}</span>
      <span class="vacancy-list-copy">
        <span class="vacancy-company">${escapeHtml(vacancy.company || "PC Gen")}</span>
        <strong>${escapeHtml(vacancy.title)}</strong>
        <span class="vacancy-meta">${meta.map(escapeHtml).join(" <b>·</b> ")}</span>
      </span>
    </button>`;
}

function vacancyDetailSection(title, items = []) {
  if (!Array.isArray(items) || !items.length) return "";
  return `
    <section>
      <h3>${escapeHtml(title)}</h3>
      <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </section>`;
}

function vacancyApplyMarkup(vacancy) {
  const apply = vacancy.apply || {};
  const email = apply.email || contact.email;
  const subject = encodeURIComponent(`${vacancy.title} application`);
  return `
    <form class="vacancy-apply form-shell" action="mailto:${escapeAttribute(email)}?subject=${subject}" method="post" enctype="text/plain">
      <h3>${escapeHtml(apply.heading || "Apply for this position")}</h3>
      <input type="hidden" name="position" value="${escapeAttribute(vacancy.title)}">
      <input type="text" name="name" placeholder="Full Name" required>
      <input type="email" name="email" placeholder="Email" required>
      <input type="tel" name="phone" placeholder="Phone" required>
      <textarea name="message" placeholder="Cover Letter" required></textarea>
      ${apply.instructions ? `<p class="notice">${escapeHtml(apply.instructions)}</p>` : ""}
      <button class="button" type="submit">Email application</button>
      ${apply.liveUrl ? `<a class="button secondary" href="${escapeAttribute(apply.liveUrl)}" target="_blank" rel="noopener">Apply on live site</a>` : ""}
    </form>`;
}

function vacancyPreviewMarkup(vacancy) {
  const meta = vacancyMeta(vacancy);
  return `
    <article class="vacancy-detail-card">
      <div class="vacancy-detail-head">
        <div>
          <span class="vacancy-company">${escapeHtml(vacancy.company || "PC Gen")}</span>
          <h2>${escapeHtml(vacancy.title)}</h2>
          <p>${meta.map(escapeHtml).join(" <b>·</b> ")}</p>
        </div>
      </div>
      <p class="vacancy-intro">${escapeHtml(vacancy.intro || "")}</p>
      ${vacancyDetailSection("Responsibilities", vacancy.responsibilities)}
      ${vacancyDetailSection("Job Requirements", vacancy.requirements)}
      ${vacancyDetailSection("Assets to the role", vacancy.assets)}
      ${vacancyApplyMarkup(vacancy)}
    </article>`;
}

function renderVacancyBoard(board, vacancies, selectedId = "") {
  const list = board.querySelector("[data-vacancy-list]");
  const preview = board.querySelector("[data-vacancy-preview]");
  const filter = board.querySelector("[data-vacancy-filter]");
  const search = board.querySelector("[data-vacancy-search]");
  const sort = board.querySelector("[data-vacancy-sort]");
  const query = String(search?.value || "").trim().toLowerCase();
  const category = filter?.value || "all";
  const sorted = [...vacancies].sort((a, b) => {
    if (sort?.value === "title") return String(a.title).localeCompare(String(b.title));
    if (sort?.value === "applyBy") return String(a.applyBy || "9999-12-31").localeCompare(String(b.applyBy || "9999-12-31"));
    return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
  });
  const visible = sorted.filter((vacancy) => {
    const haystack = [vacancy.title, vacancy.company, vacancy.location, vacancy.category, vacancy.intro].join(" ").toLowerCase();
    return (!query || haystack.includes(query)) && (category === "all" || vacancy.category === category);
  });
  const selected = vacancies.find((vacancy) => vacancy.id === selectedId);

  if (list) {
    list.innerHTML = visible.length
      ? visible.map((vacancy) => vacancyListItem(vacancy, selectedId)).join("")
      : `<p class="notice">No vacancies match your search.</p>`;
    list.querySelectorAll("[data-vacancy-id]").forEach((button) => {
      button.addEventListener("click", () => renderVacancyBoard(board, vacancies, button.dataset.vacancyId));
    });
  }

  if (preview) {
    preview.innerHTML = selected
      ? vacancyPreviewMarkup(selected)
      : `<div class="vacancy-empty-preview"><span aria-hidden="true">←</span> Click a job to preview</div>`;
  }
}

async function bindVacancyBoard() {
  const board = document.querySelector("[data-vacancy-board]");
  if (!board) return;
  const list = board.querySelector("[data-vacancy-list]");
  const filter = board.querySelector("[data-vacancy-filter]");
  try {
    const data = await apiRequest("/api/vacancies");
    const vacancies = data.vacancies || [];
    const categories = [...new Set(vacancies.map((vacancy) => vacancy.category).filter(Boolean))].sort();
    if (filter) {
      filter.innerHTML = `<option value="all">Filter</option>${categories.map((category) => `<option value="${escapeAttribute(category)}">${escapeHtml(category)}</option>`).join("")}`;
    }
    renderVacancyBoard(board, vacancies);
    board.querySelector("[data-vacancy-search]")?.addEventListener("input", () => renderVacancyBoard(board, vacancies, board.querySelector(".vacancy-list-item.is-selected")?.dataset.vacancyId || ""));
    board.querySelector("[data-vacancy-filter]")?.addEventListener("change", () => renderVacancyBoard(board, vacancies, board.querySelector(".vacancy-list-item.is-selected")?.dataset.vacancyId || ""));
    board.querySelector("[data-vacancy-sort]")?.addEventListener("change", () => renderVacancyBoard(board, vacancies, board.querySelector(".vacancy-list-item.is-selected")?.dataset.vacancyId || ""));
  } catch (error) {
    if (list) list.innerHTML = `<p class="notice">${escapeHtml(error.message || "Vacancies could not be loaded.")}</p>`;
  }
}

async function bindVacancyJobPage() {
  const shell = document.querySelector("[data-job-slug]");
  if (!shell) return;
  try {
    const data = await apiRequest(`/api/vacancies/${shell.dataset.jobSlug}`);
    shell.innerHTML = vacancyPreviewMarkup(data.vacancy);
  } catch (error) {
    shell.innerHTML = `
      <h1>Vacancy not found<span class="title-accent-dot" aria-hidden="true"></span></h1>
      <p class="lead">${escapeHtml(error.message || "This vacancy is no longer available.")}</p>
      <a class="button" href="${siteUrl("/careers/")}">View vacancies</a>`;
  }
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
        <h1>Access your client area<span class="title-accent-dot" aria-hidden="true"></span></h1>
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
        <h1>Loading client details<span class="title-accent-dot" aria-hidden="true"></span></h1>
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
        <h1>Client database<span class="title-accent-dot" aria-hidden="true"></span></h1>
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
    ${homeProofSection()}
    <section class="section home-client-section">
      <div class="container">
        ${logoShowcase(clientsHeroLogos)}
      </div>
    </section>
    <section class="section dark why-section">
      <video class="why-section-video" src="${assets.growthVideo}" autoplay loop muted playsinline aria-hidden="true"></video>
      <div class="container why-section-content">
        <div class="why-section-intro">
          <h2 class="section-title"><span>AN EXPERT IT TEAM WITHOUT</span><span>THE IN-HOUSE OVERHEAD</span></h2>
          <p class="section-copy">Outsourcing IT support gives businesses skilled people, lower risk, and predictable support without building an internal department from scratch.</p>
        </div>
        <div class="grid three why-grid">
          <article class="card"><h3>Cost-Effective</h3><p>Benefit from an entire team of experts at a fraction of the cost of a full in-house team.</p></article>
          <article class="card"><h3>Skilled & Experienced</h3><p>Get instant access to trained IT engineers with years of practical experience.</p></article>
          <article class="card"><h3>Reduce Risk</h3><p>Use experienced providers with industry-specific knowledge and proactive monitoring.</p></article>
        </div>
        <div class="home-services-row">
          <div>
            <h2 class="section-title">Our Services</h2>
          </div>
          <a class="home-services-view" href="/services/">View all</a>
        </div>
        ${servicePills(6)}
      </div>
    </section>
    ${newsletter()}
  `,

  about: () => `
    <section class="hero about-hero">
      <div class="container about-hero-stage">
        <div class="about-hero-title">
          <h1><span>WE OPERATE IN</span><span>A UNIQUE WAY<span class="title-accent-dot" aria-hidden="true"></span></span></h1>
        </div>
        <div class="about-hero-body">
          <div class="about-hero-copy">
            <p>PC Gen provides comprehensive, end-to-end IT services, giving your organisation access to specialist expertise without the cost, complexity, and administrative burden of maintaining an in-house IT team.</p>
            <p>From responsive technical support and fully managed IT services to cybersecurity, infrastructure solutions, and bespoke technology projects, we deliver reliable, scalable solutions tailored to your business needs. With PC Gen as your single trusted technology partner, you can simplify IT management, strengthen operational resilience, and focus confidently on growing your business.</p>
          </div>
          <div class="about-stat-grid" aria-label="PC Gen company highlights">
            <article class="about-stat-card"><span>16</span><h3>Years of experience</h3><p>Practical expertise across evolving business IT environments.</p></article>
            <article class="about-stat-card"><span>+</span><h3>Experienced IT Professionals</h3><p>Qualified technicians and consultants providing expert support for daily operations and specialised technology projects.</p></article>
            <article class="about-stat-card"><span>200</span><h3>Esteemed clients</h3><p>Trusted by over 200 organisations to deliver reliable, professional IT solutions.</p></article>
            <article class="about-stat-card"><span>IT</span><h3>Comprehensive IT Services</h3><p>A complete range of solutions, including technical support, cybersecurity, cloud services, disaster recovery, hosting, and more.</p></article>
          </div>
        </div>
      </div>
    </section>
    <section class="section about-founder-section">
      <div class="container about-founder-grid">
        <div class="about-founder-media">
          <img src="/assets/backgrounds/Kenneth.png" alt="Kenneth Cauchi" loading="lazy">
          <span aria-hidden="true">&gt;&gt;</span>
        </div>
        <div class="about-founder-copy">
          <div class="about-founder-heading">
            <h2>Founder Vision</h2>
            <a href="/meet-the-team/">View team <span aria-hidden="true">&#8599;</span></a>
          </div>
          <p>Founded in 2008 by Kenneth Cauchi, PC Generation Ltd. was established with a clear purpose: to help small businesses across Malta enhance productivity, improve efficiency, and achieve greater operational resilience through streamlined IT solutions.</p>
          <p>Technology is at the heart of everything we do. Our team remains at the forefront of the latest industry developments, enabling us to provide informed guidance and forward-thinking solutions that help organisations make confident technology decisions and succeed in an increasingly digital business environment.</p>
        </div>
      </div>
    </section>
    <section class="section about-support-section">
      <div class="container about-support-content">
        <h2 class="section-title about-support-title">IT Support Built<br>Around Your Business</h2>
        <p>We believe our success is directly linked to the success of our clients. That is why we take the time to understand each organisation's unique challenges, operational requirements, and long-term objectives.</p>
        <p>Through proactive support, clear expert guidance, and practical technology solutions, we help businesses improve efficiency, strengthen resilience, and make confident IT decisions. Our partnership-driven approach ensures that every solution delivers genuine value while supporting sustainable growth.</p>
        <div class="about-client-row">
          <h3>Some of our clients</h3>
          <a href="/clients/">View all <span aria-hidden="true">&#8599;</span></a>
        </div>
        ${logoShowcase(clientsHeroLogos)}
      </div>
    </section>
    ${newsletter()}
  `,

  team: () => `
    <section class="hero team-hero">
      <div class="container team-hero-stage">
        <div class="team-hero-top">
          <div class="team-hero-copy">
            <h1><span>MEET THE</span><span>TEAM<span class="title-accent-dot" aria-hidden="true"></span></span></h1>
            <div class="team-hero-text">
            <p>Meet the PC Gen professionals supporting businesses across Malta with practical technical expertise, managed IT services, cybersecurity, infrastructure, and responsive day-to-day support.</p>
            <p>Our team combines hands-on engineering experience with a service-first approach, helping clients make confident technology decisions and keep their operations running smoothly.</p>
            </div>
          </div>
          <a class="team-about-tile" href="/about/" aria-label="About us">
            <span aria-hidden="true">+</span>
            <strong>About us</strong>
          </a>
        </div>
        <div class="team-card-grid team-showcase-grid">
          ${team.map((member) => `
            <article class="team-card team-showcase-card team-flip-card" tabindex="0" aria-label="${member.name} — ${member.role}">
              <div class="team-flip-inner">
                <div class="team-flip-front team-photo-wrap" aria-hidden="true">
                  ${member.image ? `<img src="${member.image}" alt="" loading="lazy">` : `<span class="team-flip-initials">${member.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>`}
                </div>
                <div class="team-flip-back">
                  <h3>${member.name}</h3>
                  <p>${member.role}</p>
                  <a class="team-linkedin-button" href="${member.linkedin || contact.linkedin}" target="_blank" rel="noopener noreferrer">${member.linkedin ? "LinkedIn profile" : "PC Gen on LinkedIn"}<span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </article>`).join("")}
            </div>
      </div>
    </section>
    ${newsletter()}
  `,

  services: () => `
    <section class="hero services-hero">
      <div class="container hero-grid services-hero-grid">
        <div class="hero-content services-hero-copy">
          <h1><span>OUR</span><span>SERVICES<span class="title-accent-dot" aria-hidden="true"></span></span></h1>
          <p class="lead">From desktop support to bespoke projects, PC Gen is every business's one-stop-shop for IT solutions.</p>
        </div>
        <div class="services-hero-services">
          ${serviceCards()}
        </div>
      </div>
    </section>
    <section class="section dark services-cta-section">
      <div class="container split services-cta-grid">
        <div class="services-cta-copy">
          <h2>Any of our services<br>pique your interest<span class="services-cta-question">?</span></h2>
          <p class="lead">Our team is available to offer support whenever you need it.</p>
        </div>
        <div class="services-cta-action">
          <a class="home-action-tile secondary services-cta-button" href="/contact/"><span aria-hidden="true">+</span><strong>Get in<br>Touch</strong></a>
        </div>
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
    <section class="hero clients-hero">
      <div class="container clients-hero-grid">
        <div class="hero-content clients-hero-copy">
          <span class="clients-hero-kicker">Client satisfaction</span>
          <h1><span>TRUSTED</span><span>BY 200+</span><span>CUSTOMERS<span class="title-accent-dot" aria-hidden="true"></span></span></h1>
          <p class="lead">PC Gen provides IT services and solutions to over 200 businesses, supported by a reliable team and consistent results.</p>
        </div>
        ${clientHeroStories()}
      </div>
      <div class="container clients-hero-logo-panel">
        ${logoShowcase(clientsHeroLogos)}
      </div>
    </section>
    <section class="section dark">
      <div class="container split">
        <div><p class="eyebrow">Next success story</p><h2>Become the next in PC Gen's success story.</h2></div>
        <div><p class="lead">Outsource to PC Gen and give your business the tools it needs to thrive.</p></div>
      </div>
    </section>
    ${newsletter()}
  `,

  careers: () => `
    <section class="hero services-hero careers-services-hero">
      <div class="container hero-grid services-hero-grid careers-services-hero-grid">
        <div class="hero-content services-hero-copy careers-services-hero-copy">
          <h1>We're looking for IT experts<span class="title-accent-dot" aria-hidden="true"></span></h1>
          <p class="lead">Our company is growing and we are always looking for talented IT experts to join our dynamic team.</p>
        </div>
      </div>
      <div class="container careers-openings" id="openings">
        <div class="careers-vacancy-board" data-vacancy-board>
          <div class="vacancy-tools" aria-label="Vacancy controls">
            <label class="vacancy-search">
              <span>Search vacancies</span>
              <input type="search" placeholder="Search jobs" data-vacancy-search>
            </label>
            <select data-vacancy-filter aria-label="Filter vacancies">
              <option value="all">Filter</option>
            </select>
            <select data-vacancy-sort aria-label="Sort vacancies">
              <option value="newest">Sort</option>
              <option value="title">Title</option>
              <option value="applyBy">Apply date</option>
            </select>
          </div>
          <div class="vacancy-layout">
            <div class="vacancy-list" data-vacancy-list>
              <p class="notice">Loading vacancies...</p>
            </div>
            <aside class="vacancy-preview" data-vacancy-preview>
              <div class="vacancy-empty-preview"><span aria-hidden="true">←</span> Click a job to preview</div>
            </aside>
          </div>
        </div>
      </div>
    </section>
    ${newsletter()}
  `,

  contact: () => `
    <section class="hero contact-hero">
      <div class="container hero-grid contact-hero-grid">
        <div class="hero-content contact-hero-copy">
          <h1>Talk to the PC Gen team<span class="title-accent-dot" aria-hidden="true"></span></h1>
          <p class="lead">The existing contact details and service options are preserved, with a cleaner responsive form.</p>
        </div>
        <div class="split contact-hero-contact-grid">
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
  return `
    <section class="section dark">
      <div class="container vacancy-job-page" data-job-slug="${escapeHtml(slug)}">
        <p class="notice">Loading vacancy details...</p>
      </div>
    </section>
    ${newsletter()}
  `;
}

function render() {
  let content;
  if (pageKey.startsWith("job:")) content = jobPage(pageKey.split(":")[1]);
  else content = pages[pageKey] ? pages[pageKey]() : pages.home();
  root.innerHTML = rewriteSiteUrls(header() + content + footer() + `<button class="scroll-top-toggle" type="button" aria-label="Back to top" data-scroll-top><span aria-hidden="true"></span></button>`);
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
        <h1>${escapeHtml(client.companyName)}<span class="title-accent-dot" aria-hidden="true"></span></h1>
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
      <h1>Login required<span class="title-accent-dot" aria-hidden="true"></span></h1>
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

function serialiseListLines(items = []) {
  return Array.isArray(items) ? items.join("\n") : "";
}

function renderAdminVacancyList(vacancies) {
  return vacancies.map((vacancy) => `
    <article class="admin-client" data-vacancy-id="${escapeAttribute(vacancy.id)}">
      <div>
        <h3>${escapeHtml(vacancy.title)}</h3>
        <p>${escapeHtml(vacancy.company || "PC Gen")} &middot; ${escapeHtml(vacancy.employmentType || "Full-Time")} &middot; ${escapeHtml(vacancy.location || "Malta")}</p>
        <span>${escapeHtml(vacancy.status || "published")} &middot; ${escapeHtml(vacancy.category || "Support")}</span>
      </div>
      <div class="admin-actions">
        <button class="button secondary" type="button" data-edit-vacancy="${escapeAttribute(vacancy.id)}">Edit</button>
        <button class="button secondary" type="button" data-delete-vacancy="${escapeAttribute(vacancy.id)}">Remove</button>
      </div>
    </article>`).join("");
}

function adminVacancyForm(vacancy = {}) {
  const apply = vacancy.apply || {};
  return `
    <form class="form-shell portal-form admin-vacancy-form" data-admin-vacancy-form>
      <input type="hidden" name="id" value="${escapeAttribute(vacancy.id || "")}">
      <div class="form-grid-two">
        <input type="text" name="title" placeholder="Vacancy title" value="${escapeAttribute(vacancy.title || "")}" required>
        <input type="text" name="status" placeholder="Status: published or draft" value="${escapeAttribute(vacancy.status || "published")}">
        <input type="text" name="company" placeholder="Company" value="${escapeAttribute(vacancy.company || "PC Gen")}">
        <input type="text" name="category" placeholder="Category" value="${escapeAttribute(vacancy.category || "Support")}">
        <input type="text" name="employmentType" placeholder="Employment type" value="${escapeAttribute(vacancy.employmentType || "Full-Time")}">
        <input type="text" name="location" placeholder="Location" value="${escapeAttribute(vacancy.location || "Malta")}">
        <input type="date" name="applyBy" value="${escapeAttribute(vacancy.applyBy || "")}">
        <input type="text" name="applyByLabel" placeholder="Apply label" value="${escapeAttribute(vacancy.applyByLabel || "Open application")}">
        <input type="text" name="logo" placeholder="Logo path" value="${escapeAttribute(vacancy.logo || "/assets/brand/favicon.png")}">
        <input type="email" name="applyEmail" placeholder="Application email" value="${escapeAttribute(apply.email || contact.email)}">
      </div>
      <textarea name="intro" placeholder="Intro">${escapeHtml(vacancy.intro || "")}</textarea>
      <textarea name="summary" placeholder="Summary">${escapeHtml(vacancy.summary || "")}</textarea>
      <textarea name="responsibilities" placeholder="Responsibilities: one per line">${escapeHtml(serialiseListLines(vacancy.responsibilities))}</textarea>
      <textarea name="requirements" placeholder="Requirements: one per line">${escapeHtml(serialiseListLines(vacancy.requirements))}</textarea>
      <textarea name="assets" placeholder="Assets: one per line">${escapeHtml(serialiseListLines(vacancy.assets))}</textarea>
      <textarea name="applyInstructions" placeholder="Application instructions">${escapeHtml(apply.instructions || "")}</textarea>
      <input type="url" name="applyLiveUrl" placeholder="Live application URL" value="${escapeAttribute(apply.liveUrl || "")}">
      <div class="admin-form-actions">
        <button class="button" type="submit">${vacancy.id ? "Update vacancy" : "Add vacancy"}</button>
        <button class="button secondary" type="button" data-clear-vacancy-form>Clear</button>
      </div>
      <p class="notice" data-vacancy-save-message></p>
    </form>`;
}

async function bindClientAdmin() {
  const shell = document.querySelector("[data-client-admin]");
  if (!shell) return;

  async function loadAdmin(selectedClientId = "", selectedVacancyId = "") {
    try {
      const [clientData, vacancyData] = await Promise.all([
        apiRequest("/api/admin/clients"),
        apiRequest("/api/admin/vacancies")
      ]);
      const selected = clientData.clients.find((client) => client.id === selectedClientId) || {};
      const selectedVacancy = vacancyData.vacancies.find((vacancy) => vacancy.id === selectedVacancyId) || {};
      shell.innerHTML = `
        <div class="portal-topline">
          <div>
            <p class="eyebrow">Web Admin</p>
            <h1>Website database<span class="title-accent-dot" aria-hidden="true"></span></h1>
            <p class="lead">Add, edit, or remove client records, vacancies, and vacancy details.</p>
          </div>
          <button class="button secondary" type="button" data-portal-logout>Logout</button>
        </div>
        <div class="portal-grid admin-grid">
          <section class="portal-card">${adminForm(selected)}</section>
          <section class="portal-card">
            <h2>Clients</h2>
            <div class="admin-client-list">${renderAdminClientList(clientData.clients)}</div>
          </section>
          <section class="portal-card">${adminVacancyForm(selectedVacancy)}</section>
          <section class="portal-card">
            <h2>Vacancies</h2>
            <div class="admin-client-list">${renderAdminVacancyList(vacancyData.vacancies)}</div>
          </section>
        </div>`;
      bindClientAdminActions(loadAdmin);
      bindPortalLogout();
    } catch {
      shell.innerHTML = `
        <p class="eyebrow">Web Admin</p>
        <h1>Client database<span class="title-accent-dot" aria-hidden="true"></span></h1>
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

  const vacancyForm = document.querySelector("[data-admin-vacancy-form]");
  vacancyForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = vacancyForm.querySelector("[data-vacancy-save-message]");
    const formData = new FormData(vacancyForm);
    const id = formData.get("id");
    const payload = {
      id,
      title: formData.get("title"),
      status: formData.get("status"),
      company: formData.get("company"),
      category: formData.get("category"),
      employmentType: formData.get("employmentType"),
      location: formData.get("location"),
      applyBy: formData.get("applyBy"),
      applyByLabel: formData.get("applyByLabel"),
      logo: formData.get("logo"),
      intro: formData.get("intro"),
      summary: formData.get("summary"),
      responsibilities: String(formData.get("responsibilities") || "").split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
      requirements: String(formData.get("requirements") || "").split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
      assets: String(formData.get("assets") || "").split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
      apply: {
        heading: "Apply for this position",
        email: formData.get("applyEmail"),
        liveUrl: formData.get("applyLiveUrl"),
        instructions: formData.get("applyInstructions")
      }
    };
    message.textContent = "Saving...";
    try {
      await apiRequest(id ? `/api/admin/vacancies/${id}` : "/api/admin/vacancies", {
        method: id ? "PUT" : "POST",
        body: JSON.stringify(payload)
      });
      loadAdmin("", id || "");
    } catch (error) {
      message.textContent = error.message;
    }
  });

  document.querySelector("[data-clear-vacancy-form]")?.addEventListener("click", () => loadAdmin());
  document.querySelectorAll("[data-edit-vacancy]").forEach((button) => {
    button.addEventListener("click", () => loadAdmin("", button.dataset.editVacancy));
  });
  document.querySelectorAll("[data-delete-vacancy]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!confirm("Remove this vacancy record?")) return;
      await apiRequest(`/api/admin/vacancies/${button.dataset.deleteVacancy}`, { method: "DELETE" });
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
  document.querySelectorAll(".team-flip-card").forEach((card) => {
    card.addEventListener("pointerup", (event) => {
      if (event.pointerType !== "mouse" && !event.target.closest("a")) card.focus();
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Escape") document.activeElement?.blur();
    });
  });

  document.querySelectorAll("img[data-logo-hover]").forEach((image) => {
    const tile = image.closest(".logo-tile");
    tile.addEventListener("mouseenter", () => { image.src = image.dataset.logoHover; });
    tile.addEventListener("mouseleave", () => { image.src = image.dataset.logoDefault; });
  });

  const headerElement = document.querySelector(".site-header");
  const scrollTopButton = document.querySelector("[data-scroll-top]");
  const updateHeaderState = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const isScrolled = scrollTop > (headerElement?.offsetHeight || 96);
    headerElement?.classList.toggle("is-scrolled", scrollTop > 24);
    scrollTopButton?.classList.toggle("is-scrolled", isScrolled);
  };
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  scrollTopButton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

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
  bindVacancyBoard();
  bindVacancyJobPage();
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
