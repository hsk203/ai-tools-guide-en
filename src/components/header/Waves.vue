<script setup></script>

<template>
  <div class="w-full overflow-hidden leading-none">
    <!-- Diagonal slant divider -->
    <svg
      class="relative w-full h-[80px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      shape-rendering="auto"
    >
      <!-- indigo accent stripe (behind) -->
      <polygon
        points="0,100 1200,100 1200,6 0,100"
        class="fill-indigo-200/80 dark:fill-indigo-900/80"
      />
      <!-- page background diagonal (front) -->
      <polygon
        points="0,100 1200,100 1200,24 0,100"
        class="fill-white dark:fill-kanadeDark"
      />
    </svg>
  </div>
</template>
