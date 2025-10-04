<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDetailStore } from '../stores/detail'
import { storeToRefs } from 'pinia'

const detailStore = useDetailStore()
const router = useRouter()
const { name, teams, questions } = storeToRefs(detailStore)

const resultShuffle = ref([])

function assignRandomly(teams, questions) {
  if (!teams || teams.length === 0 || !questions || questions.length === 0) {
    return []
  }

  const shuffledTeams = [...teams]
  for (let i = shuffledTeams.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledTeams[i], shuffledTeams[j]] = [shuffledTeams[j], shuffledTeams[i]]
  }

  const memberScores = {}
  shuffledTeams.forEach(member => {
    memberScores[member] = 0
  })

  const sortedQuestions = [...questions].sort((a, b) => b.score - a.score)

  const assignments = sortedQuestions.map(question => {
    const memberWithLowestScore = shuffledTeams.reduce((min, current) => {
      return memberScores[current] < memberScores[min] ? current : min
    })
    memberScores[memberWithLowestScore] += question.score
    return {
      name: memberWithLowestScore,
      question: question.question,
      score: question.score,
      isFinished: question.isFinished
    }
  })

  return assignments
}

function shuffle() {
  resultShuffle.value = assignRandomly(teams.value, questions.value)
}

onMounted(() => {
  if (teams.value.length !== 0 && questions.value.length !== 0) {
    shuffle()
  }
})
</script>

<template>
  <main class="flex flex-col gap-8 h-full px-6 sm:px-10 py-6 sm:py-10 bg-white overflow-auto">
    <div class="flex gap-6">
      <button
        class="h-[44px] w-[44px] flex items-center justify-center bg-white rounded hover:bg-slate-100 transition duration-200 border border-emerald-600 cursor-pointer">
        <i @click="() => router.back()" class='bx bx-left-arrow-alt text-emerald-600 text-xl cursor-pointer'></i>
      </button>
      <div class="grow flex gap-4">
        <div class="flex flex-col">
          <p class="text-base text-slate-600 font-normal">Team name</p>
          <p class="text-base text-slate-950 font-bold">{{ name }}</p>
        </div>
        <div class="w-[1px] bg-slate-300"></div>
        <div class="flex flex-col">
          <p class="text-base text-slate-600 font-normal">Members ({{ teams.length }})</p>
          <p class="text-base text-slate-950 font-bold">{{ teams.join(', ') }}</p>
        </div>
      </div>
      <div class="flex gap-4">
        <button @click="shuffle"
          class="w-full bg-white text-emerald-600 p-3 rounded hover:bg-slate-100 transition duration-200 text-base font-bold border border-emerald-600 cursor-pointer">
          Repeat Shuffle
        </button>
        <button
          class="bg-emerald-600 text-white p-3 rounded hover:bg-emerald-500 transition duration-200 text-base font-bold cursor-pointer">
          Choose
        </button>
      </div>
    </div>
    <ul class="grid grid-cols-2 gap-3">
      <li v-for="(question, idx) in resultShuffle"
        class="relative flex flex-col gap-1 p-3 border border-slate-300 rounded-lg">
        <p class="text-base font-semibold text-slate-950">{{ idx + 1 }}. &nbsp {{ question.name }}</p>
        <p class="text-base font-normal text-slate-600">{{ question.question }}</p>
        <span
          class="absolute top-[-1px] right-[-1px] flex justify-center items-center h-[32px] w-[32px] p-1 text-xl font-bold text-emerald-500 border border-emerald-500 rounded-lg">{{
            question.score }}</span>
      </li>
    </ul>
  </main>
</template>
