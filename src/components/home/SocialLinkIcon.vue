<template>
  <span
    class="social-link-icon flex h-6 w-6 items-center justify-center rounded-xl text-2xl transition-all duration-300 hover:shadow-lg"
  >
    <slot></slot>
  </span>
</template>

<style scoped>
.social-link-icon {
  color: var(--accent);
  background: var(--accent-soft);
}
</style>
