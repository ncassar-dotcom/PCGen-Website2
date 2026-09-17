const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../assets/app.js'), 'utf8');
const binder = source.slice(source.indexOf('function bindServiceExplorer()'), source.indexOf('function servicePills('));
function element() {
  const handlers = {}, attributes = {}, properties = {}, classes = new Set();
  return {
    handlers, attributes, properties, dataset: {}, hidden: true,
    addEventListener(type, fn) { handlers[type] = fn; },
    setAttribute(key, value) { attributes[key] = value; },
    style: { setProperty(key, value) { properties[key] = value; } },
    classList: { add: key => classes.add(key), remove: key => classes.delete(key), contains: key => classes.has(key) },
    focus() {}, querySelector() { return element(); }
  };
}
const tabs = Array.from({length: 16}, (_, i) => Object.assign(element(), {id: `service-${i}`}));
const panel = element(), copy = element(), form = element(), dialog = element(), reducedMotion = element();
form.elements = {company: element()};
dialog.querySelector = selector => selector === 'form' ? form : element();
const arrows = [-1, 1].map(step => Object.assign(element(), {dataset: {serviceStep: String(step)}}));
const explorer = {
  querySelector: selector => ({'[role="tabpanel"]': panel, '#service-contact-dialog': dialog, '[data-service-copy]': copy})[selector],
  querySelectorAll: selector => selector === '[data-service-index]' ? tabs : arrows
};
let timerId = 0;
const timers = new Map();
const context = vm.createContext({
  document: {querySelector: () => explorer},
  window: {matchMedia: () => reducedMotion},
  serviceExplorerCopy: index => `content-${index}`,
  setTimeout: (fn, delay) => { assert.equal(delay, 350); timers.set(++timerId, fn); return timerId; },
  clearTimeout: id => timers.delete(id)
});
vm.runInContext(binder + '\nbindServiceExplorer();', context);
const click = arrow => arrows[arrow].handlers.click();
const midpoint = () => { const pending = [...timers.values()]; timers.clear(); pending.forEach(fn => fn()); };
const end = () => panel.handlers.animationend({target: panel, animationName: 'service-panel-turn'});
const html = fs.readFileSync(path.join(__dirname, '../services/index.html'), 'utf8');
assert(html.includes('id="service-tab-0" aria-controls="service-detail" aria-selected="true" tabindex="0"'));
assert(html.includes('id="service-detail" aria-labelledby="service-tab-0"'));
assert(html.includes('<h2>Business IT Support</h2>'));
copy.innerHTML = 'content-0';
click(1); midpoint(); end();
assert.equal(copy.innerHTML, 'content-1', 'first right click advances from Business IT Support');
click(0);
assert.equal(panel.properties['--service-turn-out'], '-90deg');
assert.equal(panel.properties['--service-turn-in'], '90deg');
assert.equal(copy.innerHTML, 'content-1', 'old service remains until midpoint');
midpoint(); assert.equal(copy.innerHTML, 'content-0'); end();
assert(!panel.classList.contains('is-rotating'));
click(0); midpoint();
assert.equal(copy.innerHTML, 'content-15', 'left wraps to last service');
assert.equal(panel.properties['--service-turn-out'], '-90deg');
click(1); midpoint();
assert.equal(copy.innerHTML, 'content-0', 'right wraps to first service');
assert.equal(panel.properties['--service-turn-out'], '90deg');
click(1); click(1); click(0);
assert.equal(timers.size, 1, 'rapid clicks cancel stale timers');
midpoint(); assert.equal(copy.innerHTML, 'content-1');
click(1);
reducedMotion.matches = true;
reducedMotion.handlers.change();
assert.equal(timers.size, 0);
assert.equal(copy.innerHTML, 'content-2');
assert(!panel.classList.contains('is-rotating'));
click(0);
assert.equal(copy.innerHTML, 'content-1');
assert.equal(timers.size, 0, 'reduced motion changes service immediately');
reducedMotion.matches = false;
tabs[5].handlers.click(); midpoint();
assert.equal(copy.innerHTML, 'content-5');
assert.equal(panel.attributes['aria-labelledby'], 'service-5');
console.log('PASS: directional flips, midpoint content swap, wraparound, rapid clicks, reduced motion and tab selection.');

// Check the contact fields without opening an email client or sending mail.
context.contact = {email: 'test@example.invalid'};
context.serviceExplorerItems = () => tabs.map((_, i) => [`Service ${i}`]);
context.window.location = {};
vm.runInContext(source.slice(source.indexOf('function serviceContactForm()'), source.indexOf('function serviceExplorer()')), context);
const markup = vm.runInContext('serviceContactForm()', context);
for (const label of ['Company Name', 'Full Name', 'Address', 'Tel', 'Email', 'Message']) {
  assert(markup.includes(`>${label}:<`), `${label} ends with a colon`);
}
assert(markup.includes('pattern="[0-9+]+"'));
for (const name of ['company', 'fullName', 'address', 'tel', 'email', 'message']) {
  form.elements[name] = {
    name, value: 'Example', validityMessage: '',
    setCustomValidity(value) { this.validityMessage = value; },
    setSelectionRange(start) { this.selectionStart = start; }
  };
}
const tel = form.elements.tel;
for (const [value, expected] of [['+356 2146-1111abc', '+35621461111'], ['(123).45#', '12345'], ['+0123456789', '+0123456789'], ['letters', '']]) {
  tel.value = value; tel.selectionStart = value.length;
  form.handlers.input({target: tel});
  assert.equal(tel.value, expected);
}
form.reportValidity = () => Object.values(form.elements).every(input => !input.validityMessage);
tel.value = '12-34';
form.handlers.submit({preventDefault() {}});
assert(tel.validityMessage.includes('digits'));
assert.equal(context.window.location.href, undefined, 'invalid phone prevents email launch');
tel.value = '+35621461111';
form.elements.message.value = 'Please help with IT & backups.\nThank you.';
form.handlers.submit({preventDefault() {}});
const body = new URL(context.window.location.href).searchParams.get('body');
assert(body.includes('Tel: +35621461111'));
assert(body.includes('Message: Please help with IT & backups.\nThank you.'));
console.log('PASS: six colon labels, telephone filtering and validation, and Message included in email body.');
