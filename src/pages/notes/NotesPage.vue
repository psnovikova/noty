<script setup>
import { useStorage } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import ButtonAdd from '../../components/ButtonAdd.vue'
import NotesHeader from '../../components/NotesHeader.vue'
import Note from '../../components/Note.vue'

const router = useRouter()

/**
 @type Ref<Array>, "value"
 */
const arrayOfNotes = useStorage('notes', [], localStorage)

const arrayOfColor = ['#BFDBFE', '#FED7AA', '#FECACA', '#FBCFE8', '#FDE68A', '#99F6E4']
const randomColor = () => {
  return arrayOfColor[Math.floor(Math.random() * arrayOfColor.length)]
}

const addNote = () => {
  const id = new Date().getTime().toString()
  arrayOfNotes.value.unshift({
    id,
    updatedAt: new Date(),
    title: '',
    text: '',
    color: randomColor(),
  })
  router.push({ name: 'note', params: { id } })
}

const search = ref('')

const filteredNotes = computed(() => {
  const sortedNotes = [...arrayOfNotes.value].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  return sortedNotes.filter(note => note.title.includes(search.value) || note.text.includes(search.value))
})
const firstColumnNotes = computed(() => {
  return filteredNotes.value.filter((note, index) => index % 2 === 0)
})
const secondColumnNotes = computed(() => {
  return filteredNotes.value.filter((note, index) => index % 2 === 1)
})
</script>

<template>
  <div class="flex justify-center">
    <div class="h-full w-full max-w-5xl mb-24 sm:mb-4">
      <NotesHeader v-model="search" class="backdrop-blur-sm absolute w-full z-10 sticky top-0 bg-stone-800/80" />
      <div class="">
        <div class="grid grid-cols-2">
          <div>
            <Note
              v-for="(note) in firstColumnNotes"
              :key="note.id"
              :note="note"
              class="hover:opacity-90"
            />
          </div>
          <div>
            <Note
              v-for="note in secondColumnNotes"
              :key="note.id"
              :note="note"
              class="hover:opacity-90"
            />
          </div>
        </div>
        <ButtonAdd
          class="fixed b-6 r-6 fixed bottom-24 sm:bottom-6 right-6"
          @click="addNote()"
        />
      </div>
    </div>
  </div>
</template>

<style scoped />
