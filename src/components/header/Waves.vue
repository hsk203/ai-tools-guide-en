<template>
  <div class="w-full overflow-hidden leading-none">
    <svg
      class="relative w-full h-[70px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      shape-rendering="auto"
      aria-hidden="true"
    >
      <polygon points="0,100 1200,100 1200,6 0,100" class="wave-accent" />
      <polygon points="0,100 1200,100 1200,24 0,100" class="wave-background" />
    </svg>
  </div>
</template>

<style scoped>
.wave-accent {
  fill: color-mix(in srgb, var(--accent) 22%, transparent);
}
.wave-background {
  fill: var(--bg);
}
</style>
