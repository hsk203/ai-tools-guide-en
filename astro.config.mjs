// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";

const { SITE_URL = "http://localhost:4321" } = loadEnv(
  process.env.NODE_ENV ?? "production",
  process.cwd(),
  "SITE_URL",
);
const site = new URL(SITE_URL);
if (
  !["http:", "https:"].includes(site.protocol) ||
  site.pathname !== "/" ||
  site.search ||
  site.hash ||
  site.username ||
  site.password
) {
  throw new Error(
    "SITE_URL must be an HTTP(S) origin, such as https://example.com, without a path, credentials, query, or fragment.",
  );
}

// PUBLIC_BASE_PATH: subpath this language build is served under on the
// merged aitech8.com domain ("" for the root Simplified build, "/zh-hant"
// or "/en" for the language builds). Leading slash, no trailing slash.
const basePath = process.env.PUBLIC_BASE_PATH ?? "";
if (basePath && (!basePath.startsWith("/") || basePath.endsWith("/"))) {
  throw new Error(
    "PUBLIC_BASE_PATH must be empty or a path like /zh-hant (leading slash, no trailing slash).",
  );
}

// https://astro.build/config
export default defineConfig({
  site: site.href,
  base: basePath === "" ? "/" : basePath,
  output: "static",
  trailingSlash: "always",
  // Preserve the spacing between inline elements when migrating from Astro 5.
  compressHTML: true,
  integrations: [
    vue(),
    sitemap({
      filter: (page) => {
        // Strip the language base path before comparing, so /articles/ is
        // excluded from every language build's sitemap.
        const path = new URL(page).pathname;
        const logical =
          basePath && path.startsWith(basePath)
            ? path.slice(basePath.length) || "/"
            : path;
        return !["/404/", "/404.html", "/articles/"].includes(logical);
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
