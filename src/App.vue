<script setup>
import { computed, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMainStore } from './stores/main'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { onMounted } from 'vue'

const route = useRoute()
const currentRouteName = computed(() => route.name)

const mainStore = useMainStore()
const { allTeams } = storeToRefs(mainStore)

onMounted(async () => {
  if (allTeams.value.length === 0 || !allTeams.value) {
    mainStore.setFetchStateIdle()
    mainStore.setFetchStateLoading()
    try {
      const data = mainStore.getAllTeams()
      mainStore.setAllTeams(data)
      mainStore.setFetchStateCompleted()
    } catch (error) {
      mainStore.setFetchStateError()
      console.error("Failed:", error.message)
    }
  }
})
</script>

<template>
  <div class="flex flex-col h-screen w-screen font-sans bg-white overflow-hidden antialiased">
    <Header v-if="currentRouteName !== 'about' && currentRouteName !== 'login'" />
    <RouterView />
    <Footer />
  </div>
</template>
