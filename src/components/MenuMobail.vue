<script setup>
import { CheckCircleIcon, CogIcon, PencilAltIcon } from '@heroicons/vue/outline'
</script>

<template>
  <div class="sm:hidden bg-stone-700 w-full h-20 fixed bottom-0 flex justify-around items-center">
    <a
      id="notes"
      href="#/notes"
      class=" target:bg-stone-600"
    ><PencilAltIcon class="h-6" />Заметки</a>
    <a
      href="#/todos"
    ><CheckCircleIcon class="h-6" />Задачи</a>
    <a
      href="#/settings"
    ><CogIcon class="h-6" />Настройки</a>
  </div>
</template>

<style scoped>
a {
  @apply flex flex-col items-center w-1/4 p-2 rounded-xl text-xs cursor-pointer
}
</style>
