<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  show: Boolean,
})
defineEmits(['no', 'yes'])
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div class="flex flex-col gap-10 w-full max-w-lg rounded-lg bg-white p-8 shadow-xl">
          <div class="flex flex-col gap-2">
            <slot name="title"></slot>
            <slot name="body"></slot>
          </div>
          <div class="flex gap-4">
            <button @click="$emit('no')"
              class="flex-1 border border-emerald-600 text-emerald-600 p-3 rounded hover:bg-slate-100 transition duration-200 text-base font-bold cursor-pointer whitespace-nowrap">
              No
            </button>
            <button @click="$emit('yes')"
              class="flex-1 bg-red-500 text-white p-3 rounded hover:bg-red-600 transition duration-200 text-base font-bold cursor-pointer whitespace-nowrap">
              Yes
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
/* Define the transition effects for the modal fade */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>