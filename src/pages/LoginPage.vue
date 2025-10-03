<script setup>
</script>

<template>
  <main class="flex h-full overflow-auto">
    <div class="hidden md:flex flex-1">
      <img class="w-full h-full object-cover" src="../assets/image/login.jpg" alt="">
    </div>
    <div class="flex-1 flex justify-center items-center px-6 md:px-3">
      <div class="flex flex-col gap-7 w-full">
        <div class="flex flex-col gap-3">
          <h2 class="text-[32px] font-bold text-slate-950">Tukel</h2>
          <div class="flex flex-col gap-1">
            <h3 class="text-xl font-bold text-slate-950">Sign in</h3>
            <p class="text-base text-slate-950">to store your progress in database</p>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <button
            class="w-full bg-emerald-600 text-white p-3 rounded hover:bg-emerald-500 transition duration-200 text-base font-bold cursor-pointer">
            Sign in with Google
          </button>
          <button
            class="w-full bg-white text-slate-900 p-3 rounded hover:bg-slate-100 transition duration-200 text-base font-bold border border-slate-300 cursor-pointer">
            Continue without login
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
