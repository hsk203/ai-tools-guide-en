<script setup lang="ts">
import { t } from "../../i18n";
defineProps<{
  kind: string;
  featured?: boolean;
  image?: string;
  alt?: string;
}>();
const labels: Record<string, { icon: string; title: string; sub: string }> = {
  astro: {
    icon: "icon-[simple-icons--astro]",
    title: "Astro",
    sub: t("cover.astroSubtitle"),
  },
  vue: {
    icon: "icon-[simple-icons--vuedotjs]",
    title: "Vue.js",
    sub: t("cover.vueSubtitle"),
  },
  css: {
    icon: "icon-[lucide--palette]",
    title: t("cover.cssTitle"),
    sub: t("cover.cssSubtitle"),
  },
  notes: {
    icon: "icon-[lucide--coffee]",
    title: t("cover.notesTitle"),
    sub: t("cover.notesSubtitle"),
  },
  life: {
    icon: "icon-[lucide--sprout]",
    title: t("cover.lifeTitle"),
    sub: t("cover.lifeSubtitle"),
  },
  typescript: {
    icon: "icon-[simple-icons--typescript]",
    title: "TypeScript",
    sub: t("cover.typescriptSubtitle"),
  },
  git: {
    icon: "icon-[simple-icons--git]",
    title: t("cover.gitTitle"),
    sub: t("cover.gitSubtitle"),
  },
  design: {
    icon: "icon-[lucide--sparkles]",
    title: t("cover.designTitle"),
    sub: t("cover.designSubtitle"),
  },
  tool: {
    icon: "icon-[lucide--wrench]",
    title: t("cover.toolTitle"),
    sub: t("cover.toolSubtitle"),
  },
};
</script>
<template>
  <div
    class="post-cover"
    :class="[kind, { featured, 'has-image': !!image }]"
    aria-hidden="true"
  >
    <img
      v-if="image"
      :src="image"
      :alt="alt || labels[kind]?.title || ''"
      loading="lazy"
      class="cover-image"
    />
    <template v-else>
      <div class="cover-grid"></div>
      <span class="cover-orbit"></span><span class="cover-dot"></span>
      <span class="cover-corner">{{ t("cover.journal") }}</span>
      <span class="cover-icon" :class="labels[kind]?.icon"></span>
      <strong>{{
        featured ? t("cover.featuredTitle") : labels[kind]?.title
      }}</strong>
      <small>{{
        featured ? t("cover.featuredSubtitle") : labels[kind]?.sub
      }}</small>
      <span class="cover-star">✧</span>
    </template>
  </div>
</template>
<style scoped>
.post-cover {
  min-height: 180px;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #394fc4;
  background: linear-gradient(145deg, #e8ebff, #dce4ff);
  padding: 28px 12px;
  isolation: isolate;
}
.post-cover.has-image {
  padding: 0;
}
.cover-image {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 180px;
  object-fit: cover;
}
.cover-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(#ffffff42 1px, transparent 1px),
    linear-gradient(90deg, #ffffff42 1px, transparent 1px);
  background-size: 23px 23px;
  z-index: -1;
  mask-image: linear-gradient(30deg, black, transparent 80%);
}
.cover-orbit {
  position: absolute;
  height: 190px;
  width: 190px;
  border: 1px solid #ffffff70;
  border-radius: 50%;
  right: -75px;
  top: -80px;
  box-shadow:
    0 0 0 20px #ffffff15,
    0 0 0 40px #ffffff15;
  z-index: -1;
}
.cover-dot {
  position: absolute;
  bottom: -35px;
  left: -40px;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  background: #ffffff25;
}
.cover-corner {
  position: absolute;
  top: 13px;
  left: 15px;
  font:
    7px "Oxanium-Medium",
    var(--font-body);
  letter-spacing: 0.14em;
  opacity: 0.6;
}
.cover-icon {
  display: block;
  font-size: 43px;
  margin: 4px 0 7px;
  opacity: 0.86;
}
strong {
  font:
    600 25px "Oxanium-Medium",
    var(--font-body);
  letter-spacing: -0.6px;
  white-space: nowrap;
}
small {
  font:
    6px "Oxanium-Medium",
    var(--font-body);
  letter-spacing: 0.12em;
  margin-top: 9px;
  opacity: 0.75;
  white-space: nowrap;
}
.cover-star {
  position: absolute;
  font-size: 30px;
  bottom: 16px;
  right: 18px;
  opacity: 0.5;
}
.css {
  background: linear-gradient(145deg, #e4e8ff, #d6dcff);
  color: #4558df;
}
.vue,
.life {
  background: linear-gradient(145deg, #dff5ec, #ccefe4);
  color: #178b70;
}
.notes {
  background: linear-gradient(145deg, #d4f8f4, #b9eee7);
  color: #087f83;
}
.typescript {
  background: linear-gradient(145deg, #e0efff, #cfe1fa);
  color: #2866a5;
}
.git {
  background: linear-gradient(145deg, #e4e8ff, #d6dcff);
  color: #4558df;
}
.design {
  background: linear-gradient(145deg, #f2e7ff, #e6dcff);
  color: #8150c4;
}
.tool {
  background: linear-gradient(145deg, #e2f0ff, #d1e8fa);
  color: #3065a5;
}
.featured {
  background: linear-gradient(140deg, #515fe9, #8956e8 58%, #11a99c);
  color: #fff;
}
:global(.dark .post-cover) {
  filter: brightness(0.75) saturate(0.8);
}
</style>
