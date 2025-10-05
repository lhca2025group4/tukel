<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'

const router = useRouter()
const mainStore = useMainStore()
const { tempTeam } = storeToRefs(mainStore)
const { getTeamMembers } = mainStore
const resultShuffle = ref([])

function shuffleAndAssignTeam(teamData) {
  const teamMembers = teamData.teamMembers
  const teamQuestions = teamData.teamQuestions

  if (!teamMembers || teamMembers.length === 0 || !teamQuestions || teamQuestions.length === 0) {
    return []
  }
  const shuffledMembers = [...teamMembers]
  for (let i = shuffledMembers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledMembers[i], shuffledMembers[j]] = [shuffledMembers[j], shuffledMembers[i]];
  }

  const memberScores = {}
  shuffledMembers.forEach(member => memberScores[member.name] = 0)

  const sortedQuestions = [...teamQuestions].sort((a, b) => b.score - a.score)

  const assignments = sortedQuestions.map(question => {
    const memberWithLowestScore = shuffledMembers.reduce((minMember, currentMember) => {
      return memberScores[currentMember.name] < memberScores[minMember.name]
        ? currentMember
        : minMember
    })
    memberScores[memberWithLowestScore.name] += question.score
    return {
      id: question.id,
      name: memberWithLowestScore.name,
      question: question.question,
      score: question.score,
      isFinished: question.isFinished
    }
  })
  return assignments
}

function shuffle() {
  resultShuffle.value = shuffleAndAssignTeam(tempTeam.value)
}

function choose() {
  const id = tempTeam.value.id
  mainStore.setTempTeamShuffled(resultShuffle.value)
  mainStore.addNewTeam(tempTeam.value)
  mainStore.deleteTempTeam()
  router.push({ name: 'detail', params: { id } })
}

onMounted(() => {
  shuffle()
})
</script>

<template>
  <main class="flex flex-col gap-6 sm:gap-8 h-full px-6 sm:px-10 py-6 sm:py-10 bg-white overflow-auto">
    <div class="flex gap-4 sm:gap-6 flex-col sm:flex-row">
      <div class="flex flex-row gap-4">
        <button @click="() => router.back()"
          class="h-[44px] w-[44px] flex items-center justify-center bg-white rounded hover:bg-slate-100 transition duration-200 border border-emerald-600 cursor-pointer">
          <i class='bx bx-left-arrow-alt text-emerald-600 text-xl cursor-pointer'></i>
        </button>
        <div class="flex flex-col">
          <p class="text-base text-slate-600 font-normal">Team name</p>
          <p class="text-base text-slate-950 font-bold">{{ tempTeam.teamName }}</p>
        </div>
      </div>
      <div class="grow flex gap-4">
        <div class="w-[1px] bg-slate-300 hidden sm:block"></div>
        <div class="flex flex-col">
          <p class="text-base text-slate-600 font-normal">Members ({{ tempTeam.teamMembers.length }})</p>
          <p class="text-base text-slate-950 font-bold">{{ getTeamMembers(tempTeam.teamMembers) }}</p>
        </div>
      </div>
      <div class="flex gap-4">
        <button @click="shuffle"
          class="flex-1 sm:flex-none bg-white text-emerald-600 p-3 rounded hover:bg-slate-100 transition duration-200 text-base font-bold border border-emerald-600 cursor-pointer">
          Repeat Shuffle
        </button>
        <button @click="choose"
          class="flex-1 sm:flex-none bg-emerald-600 text-white p-3 rounded hover:bg-emerald-500 transition duration-200 text-base font-bold cursor-pointer">
          Choose
        </button>
      </div>
    </div>
    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
