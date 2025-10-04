<script setup>
import { useDetailStore } from '../stores/detail'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const detailStore = useDetailStore()
const { name, teams, questions } = storeToRefs(detailStore)
</script>

<template>
  <main class="flex flex-col gap-8 h-full px-6 sm:px-10 py-6 sm:py-10 bg-white overflow-auto">
    <div class="flex gap-6">
      <div class="grow flex items-center gap-2">
        <p class="whitespace-nowrap" @click="() => detailStore.setAutomateData()">Team name:</p>
        <input v-model="name" type="text" placeholder="Enter team name"
          class="w-full p-3 border bg-white border-slate-300 rounded focus:outline-emerald-500 focus:ring-1 focus:ring-emerald-500" />
      </div>
      <button @click="() => router.push({ name: 'shuffle', params: { id: detailStore.getId } })"
        class="bg-emerald-600 text-white p-3 rounded hover:bg-emerald-500 transition duration-200 text-base font-bold cursor-pointer whitespace-nowrap">
        Start Shuffle
      </button>
    </div>
    <div class="flex gap-10">
      <div class="flex flex-col gap-6 flex-1">
        <div class="flex flex-col">
          <p class="text-base text-slate-950 font-semibold">Team member (Total {{ teams.length }})</p>
          <p class="text-base text-slate-600 font-normal">Insert your team name</p>
        </div>
        <div class="flex flex-col items-stretch gap-2">
          <div v-for="(_, idx) in teams" class="flex gap-2">
            <input v-model="teams[idx]" type="text" placeholder="Jhon Doe (Example)"
              class="w-full p-3 border bg-white border-slate-300 rounded focus:outline-emerald-500 focus:ring-1 focus:ring-emerald-500" />
            <button @click="() => teams.splice(teams.length - 1, 1)" v-if="teams.length > 1"
              class="flex justify-center items-center h-[50px] w-[50px] bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 cursor-pointer">
              <i class='bx bx-trash text-base'></i>
            </button>
          </div>
          <button @click="() => teams.push('')"
            class="bg-emerald-600 text-white p-3 rounded hover:bg-emerald-500 transition duration-200 text-base font-bold cursor-pointer whitespace-nowrap">Add</button>
        </div>
      </div>
      <div class="flex flex-col gap-6 flex-2">
        <div class="flex flex-col">
          <p class="text-base text-slate-950 font-semibold">Question (Total {{ questions.length }})</p>
          <p class="text-base text-slate-600 font-normal">Insert your question list</p>
        </div>
        <div class="flex flex-col items-stretch gap-2">
          <div v-for="(_, idx) in questions" class="flex gap-2">
            <p class="text-slate-950 font-bold w-6">{{ idx + 1 }}.</p>
            <input v-model="questions[idx].question" type="text"
              placeholder="What is Capital City of Indonesia (Example)"
              class="w-full p-3 border bg-white border-slate-300 rounded focus:outline-emerald-500 focus:ring-1 focus:ring-emerald-500" />
            <input v-model="questions[idx].score" type="number" placeholder="20"
              class="w-[72px] p-3 border bg-white border-slate-300 rounded focus:outline-emerald-500 focus:ring-1 focus:ring-emerald-500" />
            <button @click="() => questions.splice(questions.length - 1, 1)" v-if="questions.length > 1"
              class="flex justify-center items-center h-[50px] w-[50px] bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 cursor-pointer">
              <i class='bx bx-trash text-base'></i>
            </button>
          </div>
          <button @click="() => questions.push({ question: '', score: 0 })"
            class="bg-emerald-600 text-white p-3 rounded hover:bg-emerald-500 transition duration-200 text-base font-bold cursor-pointer whitespace-nowrap">Add</button>
        </div>
      </div>
    </div>
  </main>
</template>
