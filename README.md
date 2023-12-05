# Simple Homelab Reachability Test Server

This is a simple Homelab Reachability Test Server, which is a simple HTTP echo server. Made with [Bun](https://bun.sh)

## DNS Setup

### Without Internal CA

This setup requires a **valid, registered domain**. You should add the **Interal IP** address to **Public DNS** server to check access. This allows to issue SSL certificates by DNS-01 challenge.

Set the domain and copy the domain, and set the environment variable `VITE_REACHABILITY_SERVER_PUBLIC_DOMAIN` of the frontend service.

#### Test Internal DNS

You can test the internal DNS in this setup.
Set the domain to the internal DNS server, and set the environment variable `VITE_REACHABILITY_SERVER_PRIVATE_DOMAIN` of the frontend service. This domain should be **not added on Public DNS** but **valid, registered domain**

### With Internal CA

This setup requires a **internal SSL certifiate**. You should make the clients to install CAs before the connectivity test. This requires **Internal DNS Server**.

Set the domain to the internal DNS server, and set the environment variable `VITE_REACHABILITY_SERVER_PRIVATE_DOMAIN` of the frontend service.

## Certificate Setup

Copy certs or link to certs to `certs/fullchain.pem` and `certs/privkey.pem`. Those file names can be customized with the environment variables, `CERT_FILE_PATH` and `CERT_KEY_PATH`.
