/// <reference types="astro/client" />

declare namespace Cloudflare {
  interface Env {
    GITHUB_APP_CLIENT_ID?: string;
    GITHUB_APP_INSTALLATION_ID?: string;
    GITHUB_APP_PRIVATE_KEY?: string;
  }
}
