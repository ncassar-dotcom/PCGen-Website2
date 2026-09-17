const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const config=JSON.parse(fs.readFileSync(path.join(root,'seo.config.json'),'utf8'));
const titles=new Set(),descriptions=new Set();
let preRendered=0;
for(const page of config.pages){
  const html=fs.readFileSync(path.join(root,page.file),'utf8');
  assert.equal((html.match(/<title>/g)||[]).length,1,page.file+': title count');
  assert.equal((html.match(/name="description"/g)||[]).length,1,page.file+': description count');
  assert.equal((html.match(/rel="canonical"/g)||[]).length,1,page.file+': canonical count');
  assert(html.includes(`href="${new URL(page.path,config.baseUrl)}"`),page.file+': canonical');
  assert(!titles.has(page.title),'Duplicate title'); titles.add(page.title);
  assert(!descriptions.has(page.description),'Duplicate description'); descriptions.add(page.description);
  assert(html.includes(`name="robots" content="${page.noindex?'noindex, nofollow':config.indexingEnabled?'index, follow, max-image-preview:large':'noindex, follow'}"`),page.file+': indexing policy');
  for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){
    const data=JSON.parse(match[1]);assert.equal(data['@context'],'https://schema.org');assert(data['@graph'].length>=3);
  }
  if(!page.noindex && !page.dynamic){
    preRendered++;
    assert(html.includes(`data-prerendered="${page.key}"`));
    assert.equal((html.match(/<h1[ >]/g)||[]).length,1,page.file+': heading');
    assert.equal((html.match(/<main /g)||[]).length,1,page.file+': main');
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,page.file+': duplicate IDs');
  }
  for(const match of html.matchAll(/\b(?:href|src)="([^"]*)"/g)){
    const value=match[1];if(!value||/^(?:https?:|mailto:|tel:|data:|#)/.test(value)) continue;
    const local=new URL(value,'https://preview.test/'+page.path);
    let file=path.join(root,decodeURIComponent(local.pathname));
    if(fs.existsSync(file)&&fs.statSync(file).isDirectory()) file=path.join(file,'index.html');
    assert(fs.existsSync(file),page.file+': missing local asset/link '+value);
  }
}
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
assert.equal((sitemap.match(/<loc>/g)||[]).length,preRendered);
for(const page of config.pages) assert.equal(sitemap.includes(`<loc>${new URL(page.path,config.baseUrl)}</loc>`),!page.noindex&&!page.dynamic,page.file+': sitemap membership');
assert(!sitemap.includes('127.0.0.1'));
console.log(`PASS: ${titles.size} unique metadata sets; ${preRendered} prerendered pages; canonical URLs, robots flags, JSON-LD, sitemap, IDs and local links/assets verified.`);
