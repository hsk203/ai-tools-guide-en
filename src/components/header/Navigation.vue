<script setup lang="ts">
import { t } from "../../i18n";
import { ref, onMounted, onUnmounted } from "vue";
import { headerConfig } from "../../config";
import { withBase } from "../../lib/url";
import { initTheme, toggleTheme } from "../../scripts/theme";
const props = defineProps<{
  pathname: string;
}>();
const isDark = ref(false);
const isAtTop = ref(true);
const menuOpen = ref(false);
const navDropOpen = ref<string | null>(null);
const homeUrl = withBase("/");
const active = (url: string) =>
  url === homeUrl ? props.pathname === homeUrl : props.pathname.startsWith(url);
const handleScroll = () => {
  isAtTop.value = window.scrollY < 48;
};
const toggle = () => {
  isDark.value = toggleTheme() === "dark";
};
const openSearch = () => {
  menuOpen.value = false;
  window.dispatchEvent(new Event("kanade:search"));
};
const handleKey = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    menuOpen.value = false;
    navDropOpen.value = null;
  }
};
const toggleNavDrop = (url: string) => {
  navDropOpen.value = navDropOpen.value === url ? null : url;
};
onMounted(() => {
  isDark.value = initTheme() === "dark";
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("keydown", handleKey);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("keydown", handleKey);
});
</script>

<template>
  <header
    class="nav-header"
    :class="{ scrolled: !isAtTop, 'menu-open': menuOpen }"
  >
    <div class="nav-inner shell">
      <a
        :href="homeUrl"
        class="brand"
        :aria-label="t('nav.brandHome', { site: headerConfig.title })"
        ><span class="brand-flower">✿</span>{{ headerConfig.title
        }}<span class="brand-dot">.</span></a
      >
      <nav
        :aria-label="t('nav.main')"
        :class="{ expanded: menuOpen }"
        id="main-navigation"
      >
        <template v-for="item in headerConfig.navLinks" :key="item.url">
          <div
            v-if="item.children?.length"
            class="nav-drop"
            @mouseenter="navDropOpen = item.url"
            @mouseleave="navDropOpen = null"
          >
            <a
              :href="item.url"
              :aria-current="active(item.url) ? 'page' : undefined"
              :class="{ active: active(item.url) }"
              :aria-expanded="navDropOpen === item.url"
              aria-haspopup="true"
              @click.prevent="toggleNavDrop(item.url)"
            >
              <span :class="item.icon" aria-hidden="true"></span
              ><span>{{ item.name }}</span>
              <span
                :class="
                  navDropOpen === item.url
                    ? 'icon-[lucide--chevron-up]'
                    : 'icon-[lucide--chevron-down]'
                "
                class="drop-caret"
                aria-hidden="true"
              ></span>
            </a>
            <div
              v-show="navDropOpen === item.url"
              class="nav-dropdown"
              role="menu"
            >
              <a
                v-for="child in item.children"
                :key="child.url"
                :href="child.url"
                role="menuitem"
                :aria-current="active(child.url) ? 'page' : undefined"
                :class="{ active: active(child.url) }"
              >
                <span :class="child.icon" aria-hidden="true"></span
                ><span>{{ child.name }}</span>
              </a>
            </div>
          </div>
          <a
            v-else
            :href="item.url"
            :aria-current="active(item.url) ? 'page' : undefined"
            :class="{ active: active(item.url) }"
          >
            <span :class="item.icon" aria-hidden="true"></span
            ><span>{{ item.name }}</span>
          </a>
        </template>
      </nav>
      <div class="nav-actions">
        <button
          @click="openSearch"
          :aria-label="t('nav.search')"
          :title="t('nav.searchHint')"
        >
          <span class="icon-[lucide--search]"></span>
        </button>
        <button
          @click="toggle"
          :aria-label="isDark ? t('nav.light') : t('nav.dark')"
          :title="t('nav.theme')"
        >
          <span
            :class="isDark ? 'icon-[lucide--moon]' : 'icon-[lucide--sun]'"
          ></span>
        </button>
        <button
          class="menu-toggle"
          @click="menuOpen = !menuOpen"
          :aria-expanded="menuOpen"
          aria-controls="main-navigation"
          :aria-label="menuOpen ? t('nav.closeMenu') : t('nav.openMenu')"
        >
          <span
            :class="menuOpen ? 'icon-[lucide--x]' : 'icon-[lucide--menu]'"
          ></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-header {
  position: fixed;
  inset: 0 0 auto;
  height: 70px;
  z-index: 40;
  color: #fff;
  transition:
    background 0.25s,
    color 0.25s,
    box-shadow 0.25s;
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}
.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font:
    600 27px "Oxanium-Medium",
    var(--font-body);
  letter-spacing: -0.8px;
  white-space: nowrap;
}
.brand-flower {
  font-size: 29px;
  font-family: var(--font-body);
  font-weight: 400;
}
.brand-dot {
  color: #818cf8;
  margin-left: -7px;
}
nav {
  display: flex;
  gap: 15px;
  padding-left: 0;
}
nav a {
  display: flex;
  align-items: center;
  position: relative;
  gap: 7px;
  padding: 22px 13px;
  font-size: 15px;
  opacity: 0.85;
}
nav a:hover,
nav a.active {
  opacity: 1;
}
nav a.active::after {
  content: "";
  position: absolute;
  bottom: 13px;
  height: 3px;
  width: 19px;
  border-radius: 2px;
  background: currentColor;
  left: calc(50% - 9px);
}
.nav-drop {
  position: relative;
  display: flex;
}
.nav-drop .drop-caret {
  font-size: 13px;
  margin-left: 2px;
}
.nav-dropdown {
  position: absolute;
  top: calc(100% + 2px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 180px;
  padding: 6px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: var(--card);
  color: var(--text);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  z-index: 50;
}
.nav-dropdown a {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  color: var(--text);
  text-decoration: none;
  white-space: nowrap;
  opacity: 1;
}
.nav-dropdown a:hover {
  background: var(--accent-soft);
}
.nav-dropdown a.active {
  color: var(--accent);
  font-weight: 600;
}
.nav-dropdown a.active::after {
  display: none;
}
.nav-actions {
  display: flex;
  gap: 10px;
}
.nav-actions button {
  width: 35px;
  height: 35px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  font-size: 19px;
}
.nav-actions button:hover {
  background: #ffffff25;
  transform: rotate(-8deg);
}
.lang-switch {
  display: grid;
  place-items: center;
  height: 35px;
  padding: 0 12px;
  border-radius: 999px;
  background: transparent;
  color: inherit;
  font-size: 12px;
  text-decoration: none;
  white-space: nowrap;
}
.lang-switch:hover {
  background: #ffffff25;
}
.lang-menu {
  position: relative;
}
.lang-menu .lang-switch {
  display: flex;
  align-items: center;
  gap: 6px;
  width: auto;
  height: 35px;
  padding: 0 12px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: inherit;
  font-family: inherit;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
}
.lang-menu .lang-switch:hover {
  transform: none;
}
.lang-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 150px;
  padding: 6px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: var(--card);
  color: var(--text);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
}
.lang-dropdown a {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 12px;
  border-radius: 8px;
  font-size: 13px;
  color: var(--text);
  text-decoration: none;
  white-space: nowrap;
}
.lang-dropdown a:hover {
  background: var(--accent-soft);
}
.lang-dropdown a.current {
  color: var(--accent);
  font-weight: 600;
}
.nav-header.scrolled,
.nav-header.menu-open {
  background: color-mix(in srgb, var(--card) 92%, transparent);
  color: var(--text);
  backdrop-filter: blur(18px);
  box-shadow: 0 3px 18px #4b314511;
}
.scrolled nav a.active,
.scrolled .brand-flower {
  color: var(--accent);
}
.nav-actions .menu-toggle {
  display: none;
}
@media (max-width: 760px) {
  .nav-header {
    height: 62px;
  }
  .brand {
    font-size: 25px;
  }
  .nav-actions {
    gap: 5px;
  }
  .nav-actions .menu-toggle {
    display: grid;
  }
  nav {
    display: none;
  }
  nav.expanded {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: absolute;
    inset: 62px 12px auto;
    padding: 9px;
    border-radius: 0 0 16px 16px;
    border: 1px solid var(--line);
    background: var(--card);
    color: var(--text);
    box-shadow: var(--shadow);
  }
  nav a {
    padding: 12px 18px;
    border-radius: 8px;
  }
  nav a.active {
    background: var(--accent-soft);
    color: var(--accent);
  }
  nav a.active::after {
    display: none;
  }
  .nav-drop {
    flex-direction: column;
  }
  .nav-dropdown {
    position: static;
    transform: none;
    border: 0;
    box-shadow: none;
    background: transparent;
    padding: 2px 0 2px 20px;
    min-width: 0;
  }
  .nav-dropdown a {
    padding: 9px 14px;
  }
}
@media (min-width: 760px) and (max-width: 990px) {
  nav {
    gap: 7px;
  }
  nav a {
    font-size: 14px;
  }
}

.brand-flower {
  color: #65ead6;
  filter: drop-shadow(0 0 11px #65ead65c);
}
.nav-header:not(.scrolled) .brand-dot {
  color: #65ead6;
}
.nav-header.scrolled,
.nav-header.menu-open {
  background: color-mix(in srgb, var(--card) 92%, transparent);
  box-shadow: 0 10px 32px color-mix(in srgb, #10244a 12%, transparent);
}
.scrolled .brand-flower,
.scrolled nav a.active,
.menu-open nav a.active {
  color: var(--accent);
}
.nav-actions button:hover {
  color: var(--accent-2);
}
nav a.active::after {
  height: 3px;
  width: 24px;
  left: calc(50% - 12px);
  background: var(--accent-gradient);
}
.nav-dropdown a:hover,
.lang-dropdown a:hover {
  color: var(--accent);
}
</style>
