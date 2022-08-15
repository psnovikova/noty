<script setup>
import router from '../router'

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="w-1/2">
    <RouterLink
      :to="`/notes/${note.id}`"
    >
      <div class="h-20 bg-emerald-400 m-3 rounded-xl p-4 text-black">
        <h1 v-if="note.title">
          {{ note.title }}
        </h1>
        <h1 v-else-if="note.text && !note.title">
          {{ note.text }}
        </h1>
        <h1 v-else class="text-stone-500">
          пустая заметка
        </h1>
        <p class="text-stone-600 mt-1">
          {{ new Date(note.updatedAt).toLocaleDateString() }}
        </p>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>

</style>
