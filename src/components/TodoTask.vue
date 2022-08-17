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
  <div class="flex flex-row items-start px-6 space-x-4">
    <MenuAlt4Icon class="h-6 handle" />
    <!--  toggle todo.isDone => onClick => toggle func  -->
    <!--    Кнопка задача выполнена -->
    <button
      class="h-8 w-8 bg-white rounded-xl flex justify-center items-center"
      @click="todo.isDone = !todo.isDone"
    >
      <CheckIcon v-if="todo.isDone" class="h-6 w-6 stroke-stone-700" />
    </button>
    <ResizeTextarea
      v-model="todo.text"
      :rows="1"
      class="font-medium bg-transparent outline-none py-1 grow"
      :class="{ 'line-through text-stone-400': todo.isDone }"
      placeholder="пустая задача"
    />

    <!--    УДАЛЕНИЕ ЗАДАЧ -->
    <button
      class="h-8 w-8 p-1"
      @click="emit('delete', todo.id)"
    >
      <XIcon class="h-6 stroke-stone-400" />
    </button>
  </div>
</template>

<style scoped>

</style>
