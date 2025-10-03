<script setup>
import router from '@/router';

const datas = [
  {
    name: 'Aflaha',
    img: '/src/assets/image/team/aflaha.png',
  },
  {
    name: 'Ridho',
    img: '/src/assets/image/team/ridho.png',
  },
  {
    name: 'Iswara',
    img: '/src/assets/image/team/iswara.png',
  },
  {
    name: 'Della',
    img: '/src/assets/image/team/della.png',
  },
  {
    name: 'Alima',
    img: '/src/assets/image/team/alima.png',
  },
]
</script>

<template>
  <main class="flex flex-col h-full px-6 sm:px-10 py-6 sm:py-10 bg-white overflow-auto">
    <div class="max-w-[880px] w-full flex flex-col gap-6">
      <div class="flex flex-col gap-1">
        <div class="flex gap-2 items-center">
          <i @click="() => router.back()" class='bx bx-left-arrow-alt text-slate-950 text-3xl cursor-pointer'></i>
          <h1 class="text-2xl font-bold text-slate-950">About Us</h1>
        </div>
        <p class="text-base text-slate-700">
          Tukel is web platform to assign assigment of study.
        </p>
        <p class="text-base text-slate-700">
          Created from LHCA Group 4 on Software Engineering lecture at Binus University.
        </p>
      </div>
      <div class="flex flex-col gap-4">
        <h2 class="text-xl font-bold text-slate-950">Our Team</h2>
        <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <li v-for="data in datas" class="flex flex-col items-stretch border border-slate-300 rounded-lg p-3 gap-3">
            <img :src="data.img" :alt="`Image of ${data.name}`" class="h-[120px] object-contain" />
            <p class="text-base font-semibold text-slate-950 text-center">{{ data.name }}</p>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
