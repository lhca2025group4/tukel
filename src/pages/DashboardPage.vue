<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '../stores/main'
import { useRouter } from 'vue-router'
import Modal from '../components/Modal.vue'
import { toMillis } from '../utils/teams'

const router = useRouter()
const mainStore = useMainStore()
const { fetchState, allTeams } = storeToRefs(mainStore)
const { getTeamMembers, getTotalScore, getAccumulatedScore } = mainStore

const tempId = ref("")
const isModalVisible = ref(false)

function detailPage(id) {
  router.push({ name: 'detail', params: { id } })
}
function openModal(id) {
  tempId.value = id
  isModalVisible.value = true
}
function closeModal() {
  isModalVisible.value = false
}
async function deleteTeam() {
  await mainStore.deleteAllTeams(tempId.value)
  isModalVisible.value = false
}
function createNewTeam() {
  router.push({ name: 'create-new' })
}

const formatDate = (v) => {
  const ms = toMillis(v)
  if (!ms) return '-'
  const d = new Date(ms)
  return d.toLocaleString()
}
</script>

<template>
  <main class="flex flex-col gap-3 h-full px-6 sm:px-10 py-6 sm:py-10 bg-white overflow-auto">
    <div class="flex gap-6 items-center">
      <p v-if="fetchState.status !== 'completed'" class="text-base text-slate-950 grow">You haven’t create any team.</p>
      <button @click="createNewTeam"
        class="bg-emerald-600 text-white p-3 rounded hover:bg-emerald-500 transition duration-200 text-base font-bold cursor-pointer whitespace-nowrap"
        :class="{ 'w-full': fetchState.status === 'completed' }">
        Create New
      </button>
    </div>
    <div v-if="fetchState.status === 'loading'" class="flex flex-col gap-1 justify-center items-center pt-10">
      <i class='bx bx-loader-alt text-3xl text-emerald-500 animate-spin'></i>
      <span>{{ fetchState.message }}</span>
    </div>
    <ul v-if="fetchState.status === 'completed'" class="flex flex-col gap-3">
      <template v-for="team in allTeams">
        <li v-if="!team.isDeleted" @click.stop="detailPage(team.id)"
          class="flex items-start gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition duration-200">
          <div class="flex flex-col gap-1 grow">
            <h3 class="block md:hidden text-base font-semibold text-slate-950">{{ team.teamName }}</h3>
            <div class="flex gap-1">
              <h3 class="hidden md:block text-base font-semibold text-slate-950">{{ team.teamName }}</h3>
              <span class="hidden md:block text-base font-semibold text-slate-950">|</span>
              <span class="text-base font-semibold text-slate-950">Score {{ getTotalScore(team.shuffledQuestion) }} / {{
                getAccumulatedScore(team.shuffledQuestion)
                }}</span>
              <span class="text-base font-semibold text-slate-950">|</span>
              <span class="text-base font-semibold text-slate-950">{{ team.teamQuestions.length }} Question</span>
            </div>
            <span class="text-sm font-normal text-slate-600">Members: {{ getTeamMembers(team.teamMembers) }}</span>
            <span class="text-sm font-normal text-slate-600">Created: {{ formatDate(team.createdAt) }}</span>
          </div>
          <button @click.stop="openModal(team.id)"
            class="flex justify-center items-center p-3 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 cursor-pointer">
            <i class='bx bx-trash text-base'></i>
          </button>
        </li>
      </template>
    </ul>
    <Modal :show="isModalVisible" @no="closeModal" @yes="deleteTeam">
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
