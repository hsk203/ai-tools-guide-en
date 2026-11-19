<script setup lang="ts"></script>

<template>
  <div class="flex flex-col">
    <div class="main-container flex-1 relative">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.main-container {
  min-height: 40vh;
  color: var(--text);
  background:
    radial-gradient(
      ellipse at 8% 18%,
      color-mix(in srgb, var(--accent) 6%, transparent),
      transparent 32rem
    ),
    radial-gradient(
      ellipse at 92% 44%,
      color-mix(in srgb, var(--accent-2) 5%, transparent),
      transparent 28rem
    ),
    var(--bg);
  transition:
    background-color 0.3s ease-in-out,
    color 0.3s ease-in-out;
}
</style>
