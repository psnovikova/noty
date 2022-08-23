<script setup>
import { CheckIcon, MenuAlt4Icon, XIcon } from '@heroicons/vue/outline'
import { useVModels } from '@vueuse/core'
import ResizeTextarea from './ResizeTextarea.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'delete'])
const { modelValue: todo } = useVModels(props, emit)
</script>

<template>
  <div class="flex flex-row items-center px-6 space-x-4 group">
    <MenuAlt4Icon class="h-6 handle" />
    <button
      class="h-8 w-8 bg-white rounded-xl flex justify-center items-center"
      @click="todo.isDone = !todo.isDone"
    >
      <CheckIcon v-if="todo.isDone" class="h-6 w-6 stroke-stone-700" />
    </button>
    <ResizeTextarea
      v-model="todo.text"
      :rows="1"
      class="font-medium bg-transparent outline-none grow py-3"
      :class="{ 'line-through text-stone-400': todo.isDone }"
      placeholder="пустая задача"
    />
    <button
      class="h-8 w-8 p-1"
      @click="emit('delete', todo.id)"
    >
      <XIcon class="h-6 stroke-stone-400 sm:opacity-0 group-hover:opacity-100" />
    </button>
  </div>
</template>

<style scoped />
