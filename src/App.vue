<script setup>
import { RouterView } from 'vue-router'
import Footer from './components/Footer.vue'
import LoginPage from './pages/LoginPage.vue';
</script>

<template>
  <div class="flex flex-col h-screen w-screen font-sans bg-white overflow-hidden">
    <LoginPage />
    <Footer />
  </div>
</template>
