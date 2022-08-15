<script setup>
import { useStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'
import ButtonAdd from '../../components/ButtonAdd.vue'
import NotesHeader from '../../components/NotesHeader.vue'
import Note from '../../components/Note.vue'

// создать объект заметки и добавить его в массив aon
// разобраться, как запушить в текущий роут id по времени
// перекидывает автоматически на NotePage

// добавлять Note в Storage, addNote -> Storage
// let idPage = ref('')
const router = useRouter()

/**
 @type Ref<Array>, "value"
 */
const arrayOfNotes = useStorage('notes', [], localStorage)
// Добавление новой заметки в массив
const addNote = () => {
  const id = new Date().getTime().toString()
  arrayOfNotes.value.push({
    id,
    updatedAt: new Date(),
    title: '',
    text: '',
  })
  router.push({ name: 'note', params: { id } })
}
</script>

<template>
  <div class="w-full h-full">
    <div>
      <NotesHeader />
      <Note
        v-for="note in arrayOfNotes"
        :key="note.id"
        :note="note"
      />
      <ButtonAdd
        class="fixed b-6 r-6"
        @click="addNote()"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
