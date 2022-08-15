<script setup>
import { SearchIcon } from '@heroicons/vue/outline'
import ResizeTextarea from './ResizeTextarea.vue'

const btnClick = false
</script>

<template>
  <div class="flex justify-between p-6">
    <h1 v-if="!btnClick" class="text-4xl text-white">
      Заметки
    </h1>
    <!--    кнопка поиска -->
    <button
      class="p-2.5 bg-stone-600 hover:bg-stone-700 rounded-xl "
    >
      <span>
        <SearchIcon class="h-6" />
      </span>
    </button>
  </div>
</template>

<style scoped>

</style>
