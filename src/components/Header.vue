<script setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '../stores/main'

const mainStore = useMainStore()
const { isLoggedIn } = storeToRefs(mainStore)

function buttonClick() {
  if (isLoggedIn.value) {
  } else {
  }
}
</script>

<template>
  <header class="flex justify-between bg-slate-50 border-b border-slate-200 text-xs font-sans">
    <div class="flex items-center px-6">
      <span class="text-xs text-slate-950">{{ isLoggedIn ? `Welcome back, Aflaha` : `Your data will not stored anywhere.
        Please sign in to Google` }}</span>
    </div>
    <button @click="buttonClick"
      class="bg-emerald-600 text-white p-4 hover:bg-emerald-500 transition duration-200 text-xs md:text-base font-bold cursor-pointer whitespace-nowrap">
      {{ isLoggedIn ? 'Sign Out' : 'Sign in with Google' }}
    </button>
  </header>
</template>