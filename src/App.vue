<script setup>
import { computed, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMainStore } from './stores/main'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { getAllTeams, getTeamsMeta, setAllTeams } from './firebase/teams'

const route = useRoute()
const currentRouteName = computed(() => route.name)

const mainStore = useMainStore()
const { user } = storeToRefs(mainStore)

const toMillis = (v) => {
  if (!v) return 0
  if (typeof v === 'number') return v
  if (v?.toMillis && typeof v.toMillis === 'function') return v.toMillis()
  if (typeof v === 'string') {
    const p = Date.parse(v)
    return Number.isNaN(p) ? 0 : p
  }
  return 0
}

async function getTeams() {
  const localRaw = localStorage.getItem('teams')
  let localTeams = localRaw ? JSON.parse(localRaw) : []
  const localTs = Number(localStorage.getItem('teams_updatedAt') || 0)

  if (!user.value) return localTeams

  try {
    const meta = await getTeamsMeta(user.value.uid)
    const firebaseUpdatedAt = meta?.updatedAt || 0

    if (firebaseUpdatedAt > localTs) {
      const firebaseTeamsRaw = await getAllTeams(user.value.uid)
      const firebaseTeams = (firebaseTeamsRaw || []).map(t => ({
        ...t,
        updatedAt: toMillis(t.updatedAt)
      }))
      localStorage.setItem('teams', JSON.stringify(firebaseTeams))
      localStorage.setItem('teams_updatedAt', String(firebaseUpdatedAt || Date.now()))
      return firebaseTeams
    }

    if (localTs > firebaseUpdatedAt) {
      try {
        await setAllTeams(user.value.uid, localTeams || [])
        const now = Date.now()
        localStorage.setItem('teams_updatedAt', String(now))
      } catch (pushErr) {
        console.error('Failed to push local teams to firebase:', pushErr)
      }
      return localTeams
    }

    const firebaseTeamsRaw = await getAllTeams(user.value.uid)
    if (firebaseTeamsRaw && firebaseTeamsRaw.length > 0) {
      const firebaseTeams = firebaseTeamsRaw.map(t => ({ ...t, updatedAt: toMillis(t.updatedAt) }))
      const fbMax = firebaseTeams.reduce((m, t) => (t.updatedAt > m ? t.updatedAt : m), 0)
      localStorage.setItem('teams', JSON.stringify(firebaseTeams))
      localStorage.setItem('teams_updatedAt', String(fbMax || Date.now()))
      return firebaseTeams
    }

    localStorage.setItem('teams', JSON.stringify(localTeams || []))
    localStorage.setItem('teams_updatedAt', String(localTs || Date.now()))
    return localTeams || []
  } catch (error) {
    console.error('Sync error in getTeams:', error)
    return localTeams
  }
}

watch(user, async (v) => {
  mainStore.setFetchState("idle")

  if (v) {
    mainStore.setFetchState("loading")
    try {
      const data = await getTeams()
      mainStore.setAllTeams(data)
      mainStore.setFetchState("completed")
    } catch (error) {
      mainStore.setFetchState("error")
      console.error("Failed to sync teams:", error)
    }
    return
  }

  try {
    const localRaw = localStorage.getItem('teams')
    const localTeams = localRaw ? JSON.parse(localRaw) : []
    mainStore.setAllTeams(localTeams)
    mainStore.setFetchState("completed")
  } catch (err) {
    console.error("Failed to load local teams on logout:", err)
    mainStore.setAllTeams([])
    mainStore.setFetchState("completed")
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
