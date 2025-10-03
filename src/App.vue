<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const currentRouteName = computed(() => route.name)
</script>

<template>
  <div class="flex flex-col h-screen w-screen font-sans bg-white overflow-hidden antialiased">
    <Header v-if="currentRouteName !== 'about' && currentRouteName !== 'login'" />
    <RouterView />
    <Footer />
  </div>
</template>
