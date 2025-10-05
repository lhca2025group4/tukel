<script setup>
import { useMainStore } from '@/stores/main'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mainStore = useMainStore()

const uuid = ref("")
const teamName = ref("")
const teamMembers = ref([{
  id: 1,
  name: ''
}])
const teamQuestions = ref([{
  id: 1,
  question: '',
  score: 10,
  isFinished: false
}])

function insertedData() {
  teamName.value = "Team Alpha"
  teamMembers.value = [
    {
      id: 1,
      name: 'Aflaha'
    },
    {
      id: 2,
      name: 'Della'
    },
    {
      id: 3,
      name: 'Ridho'
    },
    {
      id: 4,
      name: 'Iswara'
    }
  ]
  teamQuestions.value = [
    { id: 1, question: 'What is Capital City of Indonesia', score: 20, isFinished: false },
    { id: 2, question: 'What is Capital City of Malaysia', score: 15, isFinished: false },
    { id: 3, question: 'What is Capital City of Singapore', score: 10, isFinished: false },
    { id: 4, question: 'What is Capital City of Thailand', score: 5, isFinished: false },
  ]
}

function addNewTeam() {
  uuid.value = crypto.randomUUID()
  const milliseconds = Date.now()
  const unixTimestamp = Math.floor(milliseconds / 1000)
  const obj = {
    id: uuid.value,
    teamName: teamName.value,
    teamMembers: teamMembers.value,
    teamQuestions: teamQuestions.value,
    isDeleted: false,
    createdAt: unixTimestamp,
    updatedAt: unixTimestamp,
    isShuffled: false,
    shuffledQuestion: null
  }
  mainStore.setTempTeam(obj)
  router.push({ name: 'shuffle', params: { id: uuid.value } })
}
</script>

<template>
  <main class="flex flex-col gap-6 sm:gap-8 h-full px-6 sm:px-10 py-6 sm:py-10 bg-white overflow-auto">
    <div class="flex gap-4 sm:gap-6 flex-col sm:flex-row">
      <div class="grow flex items-center gap-2">
        <p class="whitespace-nowrap" @click="insertedData">Team name:</p>
        <input v-model="teamName" type="text" placeholder="Enter team name"
          class="w-full p-3 border bg-white border-slate-300 rounded focus:outline-emerald-500 focus:ring-1 focus:ring-emerald-500" />
      </div>
      <button @click="addNewTeam"
        class="bg-emerald-600 text-white p-3 rounded hover:bg-emerald-500 transition duration-200 text-base font-bold cursor-pointer whitespace-nowrap">
        Start Shuffle
      </button>
    </div>
    <div class="h-[1px] bg-slate-200 sm:hidden"></div>
    <div class="flex gap-6 sm:gap-10 flex-col sm:flex-row">
      <div class="flex flex-col gap-6 flex-1">
        <div class="flex flex-col">
          <p class="text-base text-slate-950 font-semibold">Team member (Total {{ teamMembers.length }})</p>
          <p class="text-base text-slate-600 font-normal">Insert your team name</p>
        </div>
        <div class="flex flex-col items-stretch gap-2">
          <div v-for="(_, idx) in teamMembers" class="flex gap-2">
            <input v-model="teamMembers[idx].name" type="text" placeholder="Jhon Doe (Example)"
              class="w-full p-3 border bg-white border-slate-300 rounded focus:outline-emerald-500 focus:ring-1 focus:ring-emerald-500" />
            <button @click="() => teamMembers.splice(teamMembers.length - 1, 1)" v-if="teamMembers.length > 1"
              class="flex justify-center items-center h-[50px] w-[50px] bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 cursor-pointer">
              <i class='bx bx-trash text-base'></i>
            </button>
          </div>
          <button @click="() => teamMembers.push({ id: idx + 1, name: '' })"
            class="bg-white text-emerald-600 p-3 rounded hover:bg-slate-100 transition duration-200 text-base font-bold border border-emerald-600 cursor-pointer whitespace-nowrap">Add</button>
        </div>
      </div>
      <div class="h-[1px] bg-slate-200 sm:hidden"></div>
      <div class="flex flex-col gap-6 flex-2">
        <div class="flex flex-col">
          <p class="text-base text-slate-950 font-semibold">Question (Total {{ teamQuestions.length }})</p>
          <p class="text-base text-slate-600 font-normal">Insert your question list</p>
        </div>
        <div class="flex flex-col items-stretch gap-2">
          <div v-for="(_, idx) in teamQuestions" class="flex gap-2">
            <p class="text-slate-950 font-bold w-6">{{ idx + 1 }}.</p>
            <input v-model="teamQuestions[idx].question" type="text"
              placeholder="What is Capital City of Indonesia (Example)"
              class="w-full p-3 border bg-white border-slate-300 rounded focus:outline-emerald-500 focus:ring-1 focus:ring-emerald-500" />
            <input v-model="teamQuestions[idx].score" type="number" placeholder="20"
              class="w-[72px] p-3 border bg-white border-slate-300 rounded focus:outline-emerald-500 focus:ring-1 focus:ring-emerald-500" />
            <button @click="() => teamQuestions.splice(teamQuestions.length - 1, 1)" v-if="teamQuestions.length > 1"
              class="flex justify-center items-center h-[50px] w-[50px] bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 cursor-pointer">
              <i class='bx bx-trash text-base'></i>
            </button>
          </div>
          <button @click="() => teamQuestions.push({ id: idx + 1, question: '', score: 0, isFinished: false })"
            class="bg-white text-emerald-600 p-3 rounded hover:bg-slate-100 transition duration-200 text-base font-bold border border-emerald-600 cursor-pointer whitespace-nowrap">Add</button>
        </div>
      </div>
    </div>
  </main>
</template>
