<script setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '../stores/main'

const mainStore = useMainStore()
const { isLoggedIn, teamDatas } = storeToRefs(mainStore)
</script>

<template>
  <main class="flex flex-col gap-3 h-full px-6 sm:px-10 py-6 sm:py-10 bg-white overflow-auto">
    <div class="flex gap-6 items-center">
      <p v-if="!isLoggedIn" class="text-base text-slate-950 grow">You haven’t create any team.</p>
      <button
        class="bg-emerald-600 text-white p-3 rounded hover:bg-emerald-500 transition duration-200 text-base font-bold cursor-pointer whitespace-nowrap"
        :class="{ 'w-full': isLoggedIn }">Create
        New</button>
    </div>
    <ul class="flex flex-col gap-3">
      <li v-for="team in teamDatas" class="flex items-start gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
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
        <button
          class="flex justify-center items-center p-3 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 cursor-pointer">
          <i class='bx bx-trash text-base'></i>
        </button>
      </li>
    </ul>
  </main>
</template>
