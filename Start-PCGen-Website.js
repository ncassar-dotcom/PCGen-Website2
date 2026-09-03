const crypto = require("crypto");
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = 4174;
const host = "127.0.0.1";
const dataPath = path.join(root, "data", "client-portal.json");
const exampleDataPath = path.join(root, "data", "client-portal.example.json");
const vacancyDataPath = path.join(root, "data", "vacancies.json");
const vacancyExampleDataPath = path.join(root, "data", "vacancies.example.json");
const adminPassword = process.env.PCGEN_ADMIN_PASSWORD || "";
const sessions = new Map();

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webm": "video/webm",
  ".mp4": "video/mp4",
};

function send(res, status, body, type = "text/plain; charset=utf-8", headers = {}) {
  res.writeHead(status, { "Content-Type": type, ...headers });
  res.end(body);
}

function sendJson(res, status, body, headers = {}) {
  send(res, status, JSON.stringify(body), "application/json; charset=utf-8", headers);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Request too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function parseCookies(req) {
  const header = req.headers.cookie || "";
  return Object.fromEntries(header.split(";").map((part) => {
    const [key, ...value] = part.trim().split("=");
    return [key, decodeURIComponent(value.join("=") || "")];
  }).filter(([key]) => key));
}

function createSession(kind, id) {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, { kind, id, createdAt: Date.now() });
  return token;
}

function sessionFromRequest(req, expectedKind) {
  const token = parseCookies(req).pcgen_portal_session;
  const session = token ? sessions.get(token) : null;
  if (!session || session.kind !== expectedKind) return null;
  return session;
}

function sessionCookie(token) {
  return `pcgen_portal_session=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=28800`;
}

function clearSessionCookie() {
  return "pcgen_portal_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0";
}

function readDatabase() {
  if (!fs.existsSync(dataPath) && fs.existsSync(exampleDataPath)) {
    fs.copyFileSync(exampleDataPath, dataPath);
  }
  const raw = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(raw);
}

function writeDatabase(database) {
  fs.writeFileSync(dataPath, `${JSON.stringify(database, null, 2)}\n`, "utf8");
}

function readVacancyDatabase() {
  if (!fs.existsSync(vacancyDataPath) && fs.existsSync(vacancyExampleDataPath)) {
    fs.copyFileSync(vacancyExampleDataPath, vacancyDataPath);
  }
  const raw = fs.readFileSync(vacancyDataPath, "utf8");
  return JSON.parse(raw);
}

function writeVacancyDatabase(database) {
  fs.writeFileSync(vacancyDataPath, `${JSON.stringify(database, null, 2)}\n`, "utf8");
}

function publicClient(client) {
  return {
    id: client.id,
    companyName: client.companyName,
    contactName: client.contactName,
    email: client.email,
    phone: client.phone,
    accountManager: client.accountManager,
    status: client.status,
    licences: client.licences || [],
    bills: client.bills || []
  };
}

function publicVacancy(vacancy) {
  return {
    id: vacancy.id,
    title: vacancy.title,
    company: vacancy.company,
    logo: vacancy.logo,
    employmentType: vacancy.employmentType,
    applyBy: vacancy.applyBy,
    applyByLabel: vacancy.applyByLabel,
    location: vacancy.location,
    category: vacancy.category,
    intro: vacancy.intro,
    summary: vacancy.summary,
    responsibilities: vacancy.responsibilities || [],
    requirements: vacancy.requirements || [],
    assets: vacancy.assets || [],
    apply: vacancy.apply || {},
    createdAt: vacancy.createdAt
  };
}

function parseList(value, fallback = []) {
  if (Array.isArray(value)) return value.map((item) => String(item || "").trim()).filter(Boolean);
  if (typeof value === "string") return value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
  return fallback;
}

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || crypto.randomUUID();
}

function normaliseVacancy(input, existing = {}) {
  const title = String(input.title || existing.title || "").trim();
  const id = String(input.id || existing.id || slugify(title)).trim();
  const apply = input.apply || existing.apply || {};
  return {
    id,
    status: String(input.status || existing.status || "published").trim(),
    title,
    company: String(input.company || existing.company || "PC Gen").trim(),
    logo: String(input.logo || existing.logo || "/assets/brand/favicon.png").trim(),
    employmentType: String(input.employmentType || existing.employmentType || "Full-Time").trim(),
    applyBy: String(input.applyBy || existing.applyBy || "").trim(),
    applyByLabel: String(input.applyByLabel || existing.applyByLabel || "Open application").trim(),
    location: String(input.location || existing.location || "Malta").trim(),
    category: String(input.category || existing.category || "Support").trim(),
    intro: String(input.intro || existing.intro || "").trim(),
    summary: String(input.summary || existing.summary || "").trim(),
    responsibilities: parseList(input.responsibilities, existing.responsibilities || []),
    requirements: parseList(input.requirements, existing.requirements || []),
    assets: parseList(input.assets, existing.assets || []),
    apply: {
      heading: String(apply.heading || "Apply for this position").trim(),
      email: String(apply.email || "info@pcgen.mt").trim(),
      liveUrl: String(apply.liveUrl || "").trim(),
      instructions: String(apply.instructions || "").trim()
    },
    createdAt: existing.createdAt || new Date().toISOString()
  };
}

function normaliseClient(input, existing = {}) {
  return {
    id: existing.id || crypto.randomUUID(),
    companyName: String(input.companyName || existing.companyName || "").trim(),
    contactName: String(input.contactName || existing.contactName || "").trim(),
    email: String(input.email || existing.email || "").trim().toLowerCase(),
    phone: String(input.phone || existing.phone || "").trim(),
    accountManager: String(input.accountManager || existing.accountManager || "PC Gen Support").trim(),
    status: String(input.status || existing.status || "Active").trim(),
    accessCode: String(input.accessCode || existing.accessCode || crypto.randomBytes(4).toString("hex").toUpperCase()).trim(),
    licences: Array.isArray(input.licences) ? input.licences : existing.licences || [],
    bills: Array.isArray(input.bills) ? input.bills : existing.bills || []
  };
}

async function handleApi(req, res, url) {
  try {
    if (req.method === "POST" && url.pathname === "/api/client/login") {
      const body = await readBody(req);
      const database = readDatabase();
      const email = String(body.email || "").trim().toLowerCase();
      const accessCode = String(body.accessCode || "").trim();
      const client = database.clients.find((item) => item.email.toLowerCase() === email && item.accessCode === accessCode);
      if (!client) {
        sendJson(res, 401, { error: "Invalid client login details." });
        return;
      }
      const token = createSession("client", client.id);
      sendJson(res, 200, { client: publicClient(client) }, { "Set-Cookie": sessionCookie(token) });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/admin/login") {
      const body = await readBody(req);
      if (!adminPassword) {
        sendJson(res, 503, { error: "Admin login is not configured." });
        return;
      }
      if (String(body.password || "") !== adminPassword) {
        sendJson(res, 401, { error: "Invalid admin password." });
        return;
      }
      const token = createSession("admin", "admin");
      sendJson(res, 200, { ok: true }, { "Set-Cookie": sessionCookie(token) });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/logout") {
      sendJson(res, 200, { ok: true }, { "Set-Cookie": clearSessionCookie() });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/vacancies") {
      const database = readVacancyDatabase();
      const vacancies = (database.vacancies || [])
        .filter((vacancy) => String(vacancy.status || "").toLowerCase() === "published")
        .map(publicVacancy);
      sendJson(res, 200, { vacancies });
      return;
    }

    const publicVacancyMatch = url.pathname.match(/^\/api\/vacancies\/([^/]+)$/);
    if (req.method === "GET" && publicVacancyMatch) {
      const database = readVacancyDatabase();
      const vacancy = (database.vacancies || []).find((item) => item.id === publicVacancyMatch[1] && String(item.status || "").toLowerCase() === "published");
      if (!vacancy) {
        sendJson(res, 404, { error: "Vacancy not found." });
        return;
      }
      sendJson(res, 200, { vacancy: publicVacancy(vacancy) });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/client/me") {
      const session = sessionFromRequest(req, "client");
      if (!session) {
        sendJson(res, 401, { error: "Login required." });
        return;
      }
      const database = readDatabase();
      const client = database.clients.find((item) => item.id === session.id);
      if (!client) {
        sendJson(res, 404, { error: "Client not found." });
        return;
      }
      sendJson(res, 200, { client: publicClient(client) });
      return;
    }

    if (url.pathname === "/api/admin/clients") {
      const session = sessionFromRequest(req, "admin");
      if (!session) {
        sendJson(res, 401, { error: "Admin login required." });
        return;
      }
      const database = readDatabase();
      if (req.method === "GET") {
        sendJson(res, 200, { clients: database.clients });
        return;
      }
      if (req.method === "POST") {
        const body = await readBody(req);
        const client = normaliseClient(body);
        if (!client.companyName || !client.email) {
          sendJson(res, 400, { error: "Company name and email are required." });
          return;
        }
        database.clients.push(client);
        writeDatabase(database);
        sendJson(res, 201, { client });
        return;
      }
    }

    if (url.pathname === "/api/admin/vacancies") {
      const session = sessionFromRequest(req, "admin");
      if (!session) {
        sendJson(res, 401, { error: "Admin login required." });
        return;
      }
      const database = readVacancyDatabase();
      database.vacancies = database.vacancies || [];
      if (req.method === "GET") {
        sendJson(res, 200, { vacancies: database.vacancies });
        return;
      }
      if (req.method === "POST") {
        const body = await readBody(req);
        const vacancy = normaliseVacancy(body);
        if (!vacancy.title) {
          sendJson(res, 400, { error: "Vacancy title is required." });
          return;
        }
        if (database.vacancies.some((item) => item.id === vacancy.id)) {
          sendJson(res, 409, { error: "A vacancy with this ID already exists." });
          return;
        }
        database.vacancies.push(vacancy);
        writeVacancyDatabase(database);
        sendJson(res, 201, { vacancy });
        return;
      }
    }

    const vacancyMatch = url.pathname.match(/^\/api\/admin\/vacancies\/([^/]+)$/);
    if (vacancyMatch) {
      const session = sessionFromRequest(req, "admin");
      if (!session) {
        sendJson(res, 401, { error: "Admin login required." });
        return;
      }
      const database = readVacancyDatabase();
      database.vacancies = database.vacancies || [];
      const vacancyIndex = database.vacancies.findIndex((item) => item.id === vacancyMatch[1]);
      if (vacancyIndex === -1) {
        sendJson(res, 404, { error: "Vacancy not found." });
        return;
      }
      if (req.method === "PUT") {
        const body = await readBody(req);
        database.vacancies[vacancyIndex] = normaliseVacancy(body, database.vacancies[vacancyIndex]);
        writeVacancyDatabase(database);
        sendJson(res, 200, { vacancy: database.vacancies[vacancyIndex] });
        return;
      }
      if (req.method === "DELETE") {
        const [removed] = database.vacancies.splice(vacancyIndex, 1);
        writeVacancyDatabase(database);
        sendJson(res, 200, { vacancy: removed });
        return;
      }
    }

    const clientMatch = url.pathname.match(/^\/api\/admin\/clients\/([^/]+)$/);
    if (clientMatch) {
      const session = sessionFromRequest(req, "admin");
      if (!session) {
        sendJson(res, 401, { error: "Admin login required." });
        return;
      }
      const database = readDatabase();
      const clientIndex = database.clients.findIndex((item) => item.id === clientMatch[1]);
      if (clientIndex === -1) {
        sendJson(res, 404, { error: "Client not found." });
        return;
      }
      if (req.method === "PUT") {
        const body = await readBody(req);
        database.clients[clientIndex] = normaliseClient(body, database.clients[clientIndex]);
        writeDatabase(database);
        sendJson(res, 200, { client: database.clients[clientIndex] });
        return;
      }
      if (req.method === "DELETE") {
        const [removed] = database.clients.splice(clientIndex, 1);
        writeDatabase(database);
        sendJson(res, 200, { client: removed });
        return;
      }
    }

    sendJson(res, 404, { error: "API endpoint not found." });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Server error." });
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${host}:${port}`);
  if (url.pathname.startsWith("/api/")) {
    handleApi(req, res, url);
    return;
  }

  let pathname = decodeURIComponent(url.pathname);
  if (pathname.endsWith("/")) pathname += "index.html";

  if (pathname.startsWith("/data/")) {
    send(res, 403, "Forbidden");
    return;
  }

  const filePath = path.normalize(path.join(root, pathname));
  if (!filePath.startsWith(root)) {
    send(res, 403, "Forbidden");
    return;
  }

  fs.stat(filePath, (statError, stat) => {
    if (statError) {
      send(res, 404, "Not found");
      return;
    }

    const resolvedPath = stat.isDirectory() ? path.join(filePath, "index.html") : filePath;
    const type = types[path.extname(resolvedPath).toLowerCase()] || "application/octet-stream";
    const stream = fs.createReadStream(resolvedPath);
    stream.on("error", () => send(res, 500, "Server error"));
    res.writeHead(200, { "Content-Type": type });
    stream.pipe(res);
  });
});

server.listen(port, host);
