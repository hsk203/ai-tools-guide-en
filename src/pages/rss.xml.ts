import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getPosts, getPostId } from "../lib/posts";
import { categoryLabel } from "../data/post-options";
import { siteInfo } from "../config";
import { withBase } from "../lib/url";

export const GET: APIRoute = async ({ site }) =>
  rss({
    title: siteInfo.title,
    description: siteInfo.description,
    // Feed site is the language section homepage, so the channel <link>
    // and item links carry the language prefix.
    site: new URL(withBase("/"), site).href,
    items: (await getPosts()).map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: withBase(`/posts/${getPostId(post)}/`),
      categories: [categoryLabel(post.data.category)],
    })),
    customData: `<language>${siteInfo.language}</language>`,
  });
