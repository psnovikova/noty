<script setup>
import { Dialog, DialogDescription, DialogPanel, DialogTitle } from '@headlessui/vue'
import { CloudDownloadIcon, CloudUploadIcon, DownloadIcon, TrashIcon, XCircleIcon } from '@heroicons/vue/outline'
import { usePWA } from '/src/utils/pwa'
import { useStorage } from '@vueuse/core/index'
import TheDialog from '/src/components/TheDialog.vue'
import { ref } from 'vue'

const pwa = usePWA()

/**
 @type Ref<Array>, "value"
 */
const arrayOfNotes = useStorage('notes', [], localStorage)
/**
 @type Ref<Array>, "value"
 */
const arrTodos = useStorage('id', [], localStorage)

const deleteTasks = () => {
  arrTodos.value = arrTodos.value.filter(el => !el.isDone)
}

const dialog = ref()
const deleteTodosDone = async () => {
  const value = await dialog.value.open('Вы уверены?',
    'Все завершённые задачи будут безвозвратно удалены',
    [{ label: 'Отмена', value: false }, { label: 'Удалить', value: true }])
  if (value)
    deleteTasks()
}

const deleteAllData = async () => {
  const value = await dialog.value.open('Вы уверены?',
    'Все данные будут безвозвратно удалены',
    [{ label: 'Отмена', value: false, primary: true }, { label: 'Удалить', value: true }])
  if (value) {
    arrayOfNotes.value = []
    arrTodos.value = []
  }
}

const exportData = () => {
  const data = JSON.stringify({ notes: arrayOfNotes.value, todos: arrTodos.value })
  const a = document.createElement('a')
  const file = new Blob([data], { type: JSON })
  a.href = URL.createObjectURL(file)
  a.download = `noty-export-${new Date().toUTCString()}.json`
  a.click()
}

const importFile = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'application/JSON' // content-type
  input.onchange = () => {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const readFile = JSON.parse(reader.result)
        const value = await dialog.value.open('Импорт данных',
          `Загружено ${readFile.notes.length} заметок, ${readFile.todos.length} задач. Вы можете дополнить текущие данные или перезаписать их`,
          [{ label: 'Отмена', value: 'cancel', full: true },
            { label: 'Перезаписать', value: 'rewrite' },
            { label: 'Дополнить', value: 'add', primary: true }])
        if (value === 'rewrite') {
          arrayOfNotes.value = readFile.notes
          arrTodos.value = readFile.todos
          dialog.value.open('', 'Данные импортированы', [{ label: 'Закрыть', value: false, primary: true, full: true }])
        }
        if (value === 'add') {
          arrayOfNotes.value = [...arrayOfNotes.value, ...readFile.notes]
          arrTodos.value = [...arrTodos.value, ...readFile.todos]
          dialog.value.open('', 'Данные импортированы', [{ label: 'Закрыть', value: false, primary: true, full: true }])
        }
      }
      catch (e) { dialog.value.open('', 'Не удалось импортировать данные', [{ label: 'Закрыть', value: false, primary: true, full: true }]) }
    }
    reader.readAsText(file)
  }
  input.click()
}

// const errorDialog = dialog.value.open('', 'Не удалось импортировать данные', [{ label: 'Закрыть', value: false, primary: true }])
</script>

<template>
  <div class="max-w-screen-lg w-full grow mx-auto overflow-x-hidden px-6 space-y-6">
    <h1 class="text-4xl pt-6">
      Настройки
    </h1>
    <div v-if="pwa.isInstallable.value" class="border border-stone-700 bg-stone-900 p-6 flex flex-col rounded-2xl">
      <div class="flex flex-row pb-4 font-semibold">
        Установите приложение на свое устройство для более удобного использования.
      </div>
      <div class="flex flex-row md:justify-end">
        <button
          class="flex flex-row space-x-3 font-medium px-4 py-2 bg-stone-600 hover:bg-stone-700 rounded-xl shadow duration-200 grow md:grow-0 justify-center"
          @click="pwa.prompt()"
        >
          <DownloadIcon class="w-6 h-6" />
          <span class="text-stone-200">Установить<span class="hidden md:inline"> приложение</span></span>
        </button>
      </div>
    </div>

    <div class="">
      <h2 class="text-2xl py-4">
        Задачи
      </h2>
      <div class="flex py-3 flex-row items-center">
        <TrashIcon class="h-6 pr-2" />
        <button @click="deleteTodosDone">
          Удалить завершённые
        </button>
      </div>
      <h2 class="text-2xl py-4">
        Данные
      </h2>
      <div class="flex py-3">
        <CloudDownloadIcon class="h-6 pr-2" />
        <button @click="exportData">
          Экспортировать
        </button>
      </div>
      <button
        class="flex py-3"
        @click="importFile"
      >
        <CloudUploadIcon class="h-6 pr-2" />
        <span>Импортировать</span>
      </button>
      <div class="flex py-3">
        <XCircleIcon class="h-6 pr-2" />
        <button @click="deleteAllData">
          Удалить все данные
        </button>
      </div>
      <TheDialog ref="dialog" />
    </div>
  </div>
</template>

<style scoped>

</style>
