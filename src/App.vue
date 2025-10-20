<script setup>
import { computed, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMainStore } from './stores/main'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { getAllTeams } from './firebase/teams'

const route = useRoute()
const currentRouteName = computed(() => route.name)

const mainStore = useMainStore()
const { user } = storeToRefs(mainStore)

async function getTeams() {
  const localTeams = localStorage.getItem('teams')
  if (localTeams) return JSON.parse(localTeams)

  try {
    const firebaseTeams = await getAllTeams(user.value.uid)
    if (firebaseTeams && firebaseTeams.length > 0) {
      localStorage.setItem('teams', JSON.stringify(firebaseTeams))
      return firebaseTeams
    }
  } catch (error) {
    console.error("Gagal mengambil data dari Firebase:", error)
  }

  localStorage.setItem('teams', JSON.stringify([]))
  return []
}

watch(user, async (v) => {
  if (v) {
    mainStore.setFetchState("idle")
    mainStore.setFetchState("loading")
    try {
      const data = await getTeams()
      mainStore.setAllTeams(data)
      mainStore.setFetchState("completed")
    } catch (error) {
      mainStore.setFetchState("error")
      console.error("Failed:", error.message)
    }
  }
}, {
  immediate: true
})
</script>

<template>
  <div class="flex flex-col h-screen w-screen font-sans bg-white overflow-hidden antialiased">
    <Header v-if="currentRouteName !== 'about' && currentRouteName !== 'login'" />
    <RouterView />
    <Footer />
  </div>
</template>
