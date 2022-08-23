<script setup>
import { ChevronLeftIcon, TrashIcon } from '@heroicons/vue/outline'
import { useStorage } from '@vueuse/core'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ResizeTextarea from '/src/components/ResizeTextarea.vue'

const router = useRouter()
const route = useRoute()

/**
 @type Ref<Array>, "value"
 */
const arrayOfNotes = useStorage('notes', [], localStorage)
const note = arrayOfNotes.value.find(element => element.id === route.params.id)
const formattedDate = computed(() => new Date(note.updatedAt).toLocaleString())

const goToNotes = () => {
  arrayOfNotes.value = arrayOfNotes.value.filter(element => element.id !== route.params.id)
  router.push({ name: 'notes' })
}

const refreshUpdatedAt = () => note.updatedAt = new Date()
</script>

<template>
  <div>
    <header class="w-full p-6 flex justify-between items-center">
      <RouterLink
        to="/notes"
        class="bg-stone-600 p-3 rounded-xl cursor-pointer"
      >
        <ChevronLeftIcon class="h-6" />
      </RouterLink>
      <button class="bg-stone-600 p-3 rounded-xl" @click="goToNotes">
        <TrashIcon class="h-6" />
      </button>
    </header>
    <main class="p-6">
      <ResizeTextarea
        v-model="note.title"
        :rows="1"
        class="text-4xl font-semibold bg-transparent resize-none outline-none w-full"
        placeholder="Заголовок"
        @input="refreshUpdatedAt"
      />
      <p class="opacity-50 mt-5">
        {{ formattedDate }}
      </p>
      <ResizeTextarea
        v-model="note.text"
        :rows="10"
        placeholder="Текст заметки"
        class="w-full bg-transparent mt-3 outline-none resize-none textOfNote w-full"
        @input="refreshUpdatedAt"
      />
    </main>
  </div>
</template>

<style scoped>

</style>
