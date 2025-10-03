<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer
    class="flex flex-col-reverse sm:flex-row px-2 py-2 sm:px-6 sm:py-4 gap-2 bg-slate-50 justify-between items-center border-t border-slate-200 text-xs font-sans">
    <p class="text-slate-950 text-center sm:text-left text-xs">Created 2025 with ❤️ love from LHCA Group 4. Version
      1.0.0 </p>
    <RouterLink :to="{ name: 'about' }" class="text-emerald-600 underline font-bold">About Us</RouterLink>
  </footer>
</template>