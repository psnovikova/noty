<script setup>
import { ChevronLeftIcon, TrashIcon } from '@heroicons/vue/outline'
import { useDateFormat, useNow, useStorage } from '@vueuse/core'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ResizeTextarea from '/src/components/ResizeTextarea.vue'

const router = useRouter()
const route = useRoute()

/**
 @type Ref<Array>, "value"
 */
const arrayOfNotes = useStorage('notes', [], localStorage)

// поиск по массиву, массив - это v-model

// watch(note, (newValue) => {
//   note.value.date = new Date() // доделать
// })

const note = arrayOfNotes.value.find(element => element.id === route.params.id)

const goToNotes = () => {
  // const arrayEl = arrayOfNotes.value.findIndex((el) => {
  //   return el.id === route.params.id
  // })
  // // delete arrayOfNotes.value.find(element => element.id === route.params)
  // delete arrayOfNotes.value[arrayEl]

  arrayOfNotes.value = arrayOfNotes.value.filter(element => element.id !== route.params.id)

  router.push({ name: 'notes' })
}
</script>

<template>
  <div>
    <header class="w-full p-6 flex justify-between items-center">
      <RouterLink
        to="/notes"
        class="bg-stone-600 p-3 rounded-xl cursor-pointer"
      >
        <ChevronLeftIcon
          class="h-6"
        />
      </RouterLink>
      <button class="bg-stone-600 p-3 rounded-xl" @click="goToNotes">
        <TrashIcon class="h-6" />
      </button>
    </header>
    <main class="p-6">
      <ResizeTextarea
        v-model="note.title"
        :rows="1"
        :cols="21"
        class="text-4xl font-semibold bg-transparent resize-none outline-none"
        placeholder="Заголовок"
      />
      <p class="opacity-50 mt-5">
        {{ new Date(note.updatedAt).toLocaleString() }}
      </p>
      <ResizeTextarea
        v-model="note.text"
        :rows="10"
        :cols="20"
        placeholder="Текст заметки"
        class="w-full bg-transparent mt-3 outline-none resize-none textOfNote"
      />
    </main>
  </div>
</template>

<style scoped>

</style>
