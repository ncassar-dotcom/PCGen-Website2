// Regenerate metadata, crawl files and public HTML from the site's own templates.
// Run after changing app.js content, page metadata or the production domain.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'seo.config.json'), 'utf8'));
const base = new URL(config.baseUrl);
if (base.protocol !== 'https:' || !base.pathname.endsWith('/')) throw new Error('baseUrl must be an HTTPS URL ending in /.');
const source = fs.readFileSync(path.join(root, 'assets/app.js'), 'utf8');
const marker = '// Public pages include their real content in HTML';
if (!source.includes(marker)) throw new Error('Missing prerender boundary in app.js');
const templates = source.slice(0, source.indexOf(marker));
const version = crypto.createHash('sha256').update(source).digest('hex').slice(0, 12);
const cssVersion = crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'assets/styles.css'))).digest('hex').slice(0,12);
const attr = value => String(value).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const url = value => new URL(value, base).href;
const id = value => url('') + '#' + value;
const publicPages = config.pages.filter(page => !page.noindex && !page.dynamic);
const context = vm.createContext({document:{getElementById:()=>({}),body:{dataset:{page:'home'}}},window:{},location:{hostname:'localhost',pathname:'/'}});
vm.runInContext(templates, context);
const businessContact = vm.runInContext('contact', context);
const business = {
  '@type':'LocalBusiness', '@id':id('business'), name:'PC Gen', legalName:'PC Generation Ltd.',
  url:url(''), logo:url('assets/brand/logo.png'), image:url('assets/brand/logo.png'),
  telephone:businessContact.phone, email:businessContact.email,
  address:{'@type':'PostalAddress',streetAddress:'21, Triq Hal Dwin',addressLocality:'Haz-Zebbug',addressCountry:'MT'},
  areaServed:{'@type':'Country',name:'Malta'},
  openingHoursSpecification:[{'@type':'OpeningHoursSpecification',dayOfWeek:['Monday','Tuesday','Wednesday','Thursday','Friday'],opens:'08:30',closes:'17:30'}],
  sameAs:[businessContact.facebook,businessContact.instagram,businessContact.linkedin]
};
const outputs = new Map();
for (const page of config.pages) {
  const filename = path.join(root,page.file);
  let html = fs.readFileSync(filename,'utf8').replace(/\r\n/g,'\n');
  const canonical = url(page.path);
  const graph = [business, {'@type':'WebSite','@id':id('website'),url:url(''),name:'PC Gen',publisher:{'@id':id('business')},inLanguage:'en-MT'},
    {'@type':page.key==='about'?'AboutPage':page.key==='contact'?'ContactPage':'WebPage','@id':canonical+'#webpage',url:canonical,name:page.title,description:page.description,inLanguage:'en-MT',isPartOf:{'@id':id('website')},about:{'@id':id('business')}}];
  if (page.path) graph.push({'@type':'BreadcrumbList','@id':canonical+'#breadcrumb',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:url('')},{'@type':'ListItem',position:2,name:page.title.split(' | ')[0],item:canonical}]});
  if (page.key==='services') {
    const services = vm.runInContext('serviceExplorerItems()',context);
    graph.push({'@type':'OfferCatalog',name:'PC Gen IT services in Malta',itemListElement:services.map(([name, intro])=>({'@type':'Offer',itemOffered:{'@type':'Service',name,description:intro,provider:{'@id':id('business')},areaServed:{'@type':'Country',name:'Malta'},url:canonical}}))});
  }
  const metadata = `<!-- SEO:START -->
  <meta name="description" content="${attr(page.description)}">
  <meta name="robots" content="${page.noindex?'noindex, nofollow':config.indexingEnabled?'index, follow, max-image-preview:large':'noindex, follow'}">
  <link rel="canonical" href="${attr(canonical)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="PC Gen">
  <meta property="og:locale" content="en_MT">
  <meta property="og:title" content="${attr(page.title)}">
  <meta property="og:description" content="${attr(page.description)}">
  <meta property="og:url" content="${attr(canonical)}">
  <meta property="og:image" content="${url('assets/brand/logo.png')}">
  <meta property="og:image:alt" content="PC Gen IT support in Malta">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${attr(page.title)}">
  <meta name="twitter:description" content="${attr(page.description)}">
  <meta name="twitter:image" content="${url('assets/brand/logo.png')}">
  ${page.noindex?'':`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c')}</script>`}
  <!-- SEO:END -->`;
  html=html.replace(/\s*<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/g,'');
  html=html.replace(/\s*<meta name="description"[^>]*>/g,'');
  html=html.replace(/<title>[^<]*<\/title>/,`<title>${attr(page.title)}</title>\n  ${metadata}`);
  html=html.replace(/assets\/app\.js\?v=[^"\s]+/g,`assets/app.js?v=${version}`);
  html=html.replace(/assets\/styles\.css\?v=[^"\s]+/g,`assets/styles.css?v=${cssVersion}`);
  if (!page.noindex && !page.dynamic) {
    context.renderPageKey=page.key;
    let rendered=vm.runInContext(`header() + '<main id="main-content">' + pages[renderPageKey]() + '</main>' + footer() + '<button class="scroll-top-toggle" type="button" aria-label="Back to top" data-scroll-top><span aria-hidden="true"></span></button>'`,context);
    // Relative links work on localhost, GitHub project pages and a custom domain.
    const prefix='../'.repeat(page.file.split('/').length-1) || './';
    rendered=rendered.replace(/\b(href|src|data-logo-default|data-logo-hover)="\/(?!\/)([^"]*)"/g,(_,key,value)=>`${key}="${prefix}${value}"`);
    const block=`<!-- PRERENDER:START -->\n  <div id="app" class="app-ready" data-prerendered="${page.key}">${rendered}</div>\n  <!-- PRERENDER:END -->`;
    if (html.includes('<!-- PRERENDER:START -->')) html=html.replace(/<!-- PRERENDER:START -->[\s\S]*?<!-- PRERENDER:END -->/,()=>block);
    else html=html.replace('<div id="app"></div>',()=>block);
    html=html.replace(/\s*<noscript>This website needs JavaScript enabled[^<]*<\/noscript>/,'');
  }
  outputs.set(filename, html.replace(/[ \t]+$/gm,''));
}
const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicPages.map(page=>`  <url><loc>${attr(url(page.path))}</loc></url>`).join('\n')}\n</urlset>\n`;
outputs.set(path.join(root,'sitemap.xml'),sitemap);
outputs.set(path.join(root,'robots.txt'),`User-agent: *\nAllow: /\n\n# Login and admin pages use HTML noindex; they must remain crawlable.\nSitemap: ${url('sitemap.xml')}\n`);
for(const [filename,contents] of outputs) fs.writeFileSync(filename,contents);
console.log(`Updated ${config.pages.length} page metadata sets, ${publicPages.length} public HTML pages and sitemap URLs. Canonical base: ${base.href}`);
