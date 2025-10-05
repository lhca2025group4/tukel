<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import Modal from '../components/Modal.vue'
import { useMainStore } from '@/stores/main'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const { id } = route.params
const mainStore = useMainStore()
const { allTeams } = storeToRefs(mainStore)
const { getTotalScore, getAccumulatedScore } = mainStore

const specificTeam = computed(() => {
  return allTeams.value.find(team => team.id === id)
})

const isModalVisible = ref(false)

function openModal() {
  isModalVisible.value = true
}
function closeModal() {
  isModalVisible.value = false
}
function goToDashboard() {
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <main class="flex flex-col sm:flex-row gap-6 sm:gap-10 h-full px-6 sm:px-10 py-6 sm:py-10 bg-white overflow-auto">
    <div class="basis-[200px] flex flex-col gap-4 sm:gap-6">
      <div class="flex justify-between">
        <button @click="goToDashboard"
          class="h-[44px] w-[44px] flex items-center justify-center bg-white rounded hover:bg-slate-100 transition duration-200 border border-emerald-600 cursor-pointer">
          <i class='bx bx-left-arrow-alt text-emerald-600 text-xl cursor-pointer'></i>
        </button>
        <div class="flex gap-2">
          <button @click="openModal"
            class="h-[44px] w-[44px] flex justify-center items-center p-3 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 cursor-pointer">
            <i class='bx bx-trash text-base'></i>
          </button>
          <button
            class="flex sm:hidden justify-center items-center p-3 bg-emerald-600 text-white rounded hover:bg-emerald-600 transition duration-200 cursor-pointer text-base font-bold">
            Export to CSV
          </button>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="flex flex-col">
          <span class="text-base text-slate-600">Team</span>
          <span class="text-base text-slate-950 font-bold">{{ specificTeam.teamName }}</span>
        </div>
        <button
          class="h-[44px] w-[44px] flex justify-center items-center p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 cursor-pointer">
          <i class='bx bxs-edit-alt text-base'></i>
        </button>
      </div>
      <div class="flex flex-col justify-between items-center bg-slate-100 border border-slate-300 p-3 rounded-lg">
        <span class="text-base text-slate-600">Total Score</span>
        <div class="flex flex-row items-end">
          <span class="text-[40px] leading-[100%] text-slate-950 font-bold">{{
            getAccumulatedScore(specificTeam.shuffledQuestion)
            }}</span>
          <span class="text-base text-slate-950 font-bold">/ {{ getTotalScore(specificTeam.shuffledQuestion) }}</span>
        </div>
      </div>
      <button
        class="hidden sm:flex justify-center items-center p-3 bg-emerald-600 text-white rounded hover:bg-emerald-600 transition duration-200 cursor-pointer text-base font-bold">
        Export to CSV
      </button>
    </div>
    <ul v-if="specificTeam.isShuffled" class="grow flex flex-col gap-3">
      <li v-for="(item, idx) in specificTeam.shuffledQuestion"
        class="relative flex flex-col gap-1 p-3 border border-slate-300 rounded-lg">
        <p class="text-base font-semibold text-slate-950">Soal ke {{ idx + 1 }}.</p>
        <p class="text-base font-normal text-slate-600">{{ item.question }}</p>
        <span
          class="absolute top-[-1px] right-[-1px] flex justify-center items-center h-[32px] w-[32px] p-1 text-xl font-bold text-emerald-500 border border-emerald-500 rounded-lg">
          {{ item.score }}
        </span>
        <div class="flex items-center justify-between gap-2">
          <span>{{ item.name }}</span>
          <label :for="`toggle-switch-${idx}`" class="relative inline-block w-11 h-6 cursor-pointer">
            <input v-model="item.isFinished" type="checkbox" :id="`toggle-switch-${idx}`" class="sr-only peer">
            <span
              class="block w-full h-full bg-slate-200 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 peer-checked:bg-emerald-600 transition-colors"></span>
            <span
              class="absolute top-0.5 left-[2px] bg-white border border-slate-300 rounded-full h-5 w-5 transition-all peer-checked:translate-x-full"></span>
          </label>
        </div>
      </li>
    </ul>
    <Modal :show="isModalVisible" @no="closeModal">
      <template #title>
        <h2 class="text-slate-950 text-2xl font-semibold">This is a Teleported Modal!</h2>
      </template>
      <template #body>
        <p class="text-slate-600">
          The HTML for this modal is rendered at the end of the `
        </p>
      </template>
    </Modal>
  </main>
</template>
