<script setup>
import { RouterView } from 'vue-router'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="flex flex-col h-screen w-screen font-sans bg-white overflow-hidden">
    <RouterView />
    <Footer />
  </div>
</template>
