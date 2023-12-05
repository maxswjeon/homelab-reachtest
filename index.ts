const certPath = Bun.env.CERT_FILE_PATH || "certs/fullchain.pem";
const keyPath = Bun.env.CERT_KEY_PATH || "certs/privkey.pem";

console.log(`Using cert: ${certPath}`);
console.log(`Using key: ${keyPath}`);

const cert = Bun.file(certPath);
const key = Bun.file(keyPath);

const server = Bun.serve({
  port: 3000,
  fetch(request) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const message = searchParams.get("message");

    const result = message ? { message } : {};

    const headers = new Headers();
    headers.set("Allow-Access-Control-Origin", "*");
    headers.set("Allow-Access-Control-Methods", "GET, OPTIONS");
    headers.set("Allow-Access-Control-Headers", "Content-Type");
    headers.set("Content-Type", "application/json");

    return new Response(JSON.stringify(result), { headers });
  },
  tls: { cert, key },
});

console.log(`Listening on localhost: ${server.port}`);
