<script setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '../stores/main'
import { useTotalStore } from '../stores/total'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mainStore = useMainStore()
const totalStore = useTotalStore()
const { isLoggedIn, fetchState } = storeToRefs(mainStore)
const { allTeams } = storeToRefs(totalStore)

mainStore.setFetchStateIdle()
onMounted(() => {
  setTimeout(() => {
    mainStore.setFetchStateLoading()
  }, 1000)
  setTimeout(() => {
    mainStore.setFetchStateCompleted()
    totalStore.setTeamsAutomated()
  }, 2000);
})

function createNewTeam() {
  router.push({ name: 'create-new' })
}
</script>

<template>
  <main class="flex flex-col gap-3 h-full px-6 sm:px-10 py-6 sm:py-10 bg-white overflow-auto">
    <div class="flex gap-6 items-center">
      <p v-if="!isLoggedIn" class="text-base text-slate-950 grow">You haven’t create any team.</p>
      <button @click="createNewTeam"
        class="bg-emerald-600 text-white p-3 rounded hover:bg-emerald-500 transition duration-200 text-base font-bold cursor-pointer whitespace-nowrap"
        :class="{ 'w-full': isLoggedIn }">
        Create New
      </button>
    </div>
    <div v-if="fetchState.status === 'loading'" class="flex justify-center items-center h-[200px]">
      <i class='bx bx-loader-alt text-5xl text-emerald-500 animate-spin'></i>
      {{ fetchState.message }}
    </div>
    <ul v-if="fetchState.status === 'completed'" class="flex flex-col gap-3">
      <li v-for="team in allTeams"
        class="flex items-start gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition duration-200">
        <div class="flex flex-col gap-1 grow">
          <h3 class="block md:hidden text-base font-semibold text-slate-950">{{ team.name }}</h3>
          <div class="flex gap-1">
            <h3 class="hidden md:block text-base font-semibold text-slate-950">{{ team.name }}</h3>
            <span class="hidden md:block text-base font-semibold text-slate-950">|</span>
            <span class="text-base font-semibold text-slate-950">Score {{ team.score.current }} / {{ team.score.total
              }}</span>
            <span class="text-base font-semibold text-slate-950">|</span>
            <span class="text-base font-semibold text-slate-950">{{ team.question }} Question</span>
          </div>
          <span class="text-sm font-normal text-slate-600">Members: {{ team.members.join(', ') }}</span>
          <span class="text-sm font-normal text-slate-600">Created: {{ team.createdAt }}</span>
        </div>
        <button @click="useTotalStore.deleteTeam(team.id)"
          class="flex justify-center items-center p-3 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 cursor-pointer">
          <i class='bx bx-trash text-base'></i>
        </button>
      </li>
    </ul>
  </main>
</template>
