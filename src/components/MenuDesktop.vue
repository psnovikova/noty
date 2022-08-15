<script setup>
import { CheckCircleIcon, CogIcon, PencilAltIcon } from '@heroicons/vue/outline'
</script>

<template>
  <div
    class="flex-col pl-6 py-10"
  >
    <a
      id="notes"
      href="#/notes"
      class=" target:bg-stone-600"
    ><PencilAltIcon class="h-6 pr-2" />Заметки</a>
    <a
      href="#/todos"
    ><CheckCircleIcon class="h-6 pr-2" />Задачи</a>
    <a
      href="#/settings"
    ><CogIcon class="h-6 pr-2" />Настройки</a>
  </div>
</template>

<style scoped>
a {
  @apply flex flex-row rounded-xl text-lg cursor-pointer py-2 px-5
}
</style>
