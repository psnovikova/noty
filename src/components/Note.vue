<script setup>
defineProps({
  note: {
    type: Object,
    required: true,
  },
})

const truncate = (str) => {
  if (str.length > 128)
    return `${str.slice(0, 128)}...`
  return str
}
</script>

<template>
  <RouterLink :to="`/notes/${note.id}`">
    <div class="m-2 rounded-xl p-4 text-black" :style="{ backgroundColor: note.color }">
      <h1 v-if="note.title">
        {{ truncate(note.title) }}
      </h1>
      <h1 v-else-if="note.text">
        {{ truncate(note.text) }}
      </h1>
      <h1 v-else class="text-stone-500">
        пустая заметка
      </h1>
      <p class="text-stone-600 mt-1">
        {{ new Date(note.updatedAt).toLocaleDateString() }}
      </p>
    </div>
  </RouterLink>
</template>

<style scoped>
h1 {
  @apply break-words
}
</style>
