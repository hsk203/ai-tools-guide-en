import settings from "./site.config.json" with { type: "json" };
import {
  language,
  locale,
  ogLocale,
  t,
  type Language,
  type TranslationKey,
} from "./i18n";
import { withBase } from "./lib/url";

// Configure language and identity in site.config.json; edit copy in i18n/*.json.
export const siteInfo = {
  title: settings.site.name,
  titleSuffix: t("site.titleSuffix"),
  language,
  locale: ogLocale,
  dateLocale: locale,
  favicon: settings.site.favicon,
  description: t("site.description"),
  keywords: settings.site.keywords[language],
  // SITE comes from astro.config.mjs and is shared by all generated metadata.
  url: import.meta.env.SITE,
};

// All three language versions of this site on the merged aitech8.com domain.
// Configure in site.config.json as
// { "zh-CN": "https://aitech8.com", "zh-Hant": "https://aitech8.com/zh-hant",
//   "en": "https://aitech8.com/en" } (trailing slash added if missing).
const alternateSiteConfig = (
  settings as { alternateSite?: Partial<Record<Language, string>> }
).alternateSite;
function siteUrlFor(lang: Language): string {
  const raw = alternateSiteConfig?.[lang] ?? "";
  return raw ? (raw.endsWith("/") ? raw : `${raw}/`) : "";
}
export const languageSites: Record<Language, string> = {
  "zh-CN": siteUrlFor("zh-CN"),
  "zh-Hant": siteUrlFor("zh-Hant"),
  en: siteUrlFor("en"),
  ja: siteUrlFor("ja"),
};
// BCP 47 tags for hreflang (zh-CN is emitted as zh-Hans).
export const hreflangCode: Record<Language, string> = {
  "zh-CN": "zh-Hans",
  "zh-Hant": "zh-Hant",
  en: "en",
  ja: "ja",
};
// Display names for the language switcher (each in its own script).
export const languageLabels: Record<Language, string> = {
  "zh-CN": "简体中文",
  "zh-Hant": "繁體中文",
  en: "English",
  ja: "日本語",
};

export const headerConfig = {
  title: settings.site.logoText,
  navLinks: settings.navigation.map(({ label, icon, url, children }) => ({
    name: t(label as TranslationKey),
    icon,
    url: withBase(url),
    children: children?.map((child) => ({
      name: t(child.label as TranslationKey),
      icon: child.icon,
      url: withBase(child.url),
    })),
  })),
};

export const welcomeConfig = {
  title: t("hero.title"),
  subTitle: t("hero.subtitle"),
  bgImage: settings.hero.image,
  imagePosition: settings.hero.imagePosition ?? "center 47%",
  overlayOpacity: settings.hero.overlayOpacity ?? 0.42,
};

export const personalInfo = {
  name: settings.author.name[language],
  englishName: settings.author.handle,
  avatar: settings.author.avatar,
  role: t("author.role"),
  bio: t("author.bio"),
  github: settings.author.github,
  socialLinks: settings.socialLinks.map(({ name, label, icon, url }) => ({
    name: label ? t(label as TranslationKey) : name,
    icon,
    url: url === "$author.github" ? settings.author.github : withBase(url),
  })),
};
