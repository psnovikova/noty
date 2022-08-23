<script setup>
import { computed, reactive, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import Draggble from 'vuedraggable'
import ButtonAdd from '../../components/ButtonAdd.vue'
import TodoTask from '../../components/TodoTask.vue'

/**
@type Ref<Array>, "value"
 */
const arrTodos = useStorage('id', [], localStorage)

const dragging = ref(false)

const handle = computed(() => dragging.value ? 'under drag' : '')

const dragOptions = reactive({
  animation: 200,
  disabled: false,
  ghostClass: 'ghost',
})

// БАЗА ЗНАНИЙ ОТ БОГДАНА
// if (arrTodos.value.length > 0) {
//   // eslint-disable-next-line no-console
//   arrTodos.value.forEach(element => console.log(element))
//   arrTodos.value.sort((a, b) => {
//     return b.id - a.id
//   })
//   // eslint-disable-next-line no-console
//   console.log(arrTodos)
// }

const addTask = () => {
  arrTodos.value.push({
    id: maxId() + 1,
    text: '',
    isDone: false,
  })
}

function maxId() {
  let idMax = 0
  for (let i = 0; i < arrTodos.value.length; i++) {
    if (idMax < arrTodos.value[i].id)
      idMax = arrTodos.value[i].id
  }
  return idMax
}

const deleteTask = (id) => {
  const numberOfTask = arrTodos.value.findIndex((el) => {
    return id === el.id
  })
  arrTodos.value.splice(numberOfTask, 1)
}
</script>

<template>
  <div class="flex justify-center">
    <div class="w-full max-w-5xl">
      <h1 class="text-4xl p-6 sticky top-0 bg-stone-800/80 backdrop-blur-sm">
        Задачи
      </h1>
      <ButtonAdd class="fixed bottom-24 sm:bottom-6 right-6" @click="addTask" />
      <Draggble
        tag="ul"
        :list="arrTodos"
        class="list-group"
        :handle="handle"
        item-key="id"
        v-bind="dragOptions"
      >
        <template #item="{ element, index }">
          <TodoTask
            v-if="element.isDone === false"
            v-model="arrTodos[index]"
            class="active:{bg-stone-800/80, ghost}"
            @delete="deleteTask"
          />
        </template>
      </Draggble>
      <div v-if="arrTodos.filter(el => el.isDone === true).length">
        <hr class="pb-4 border-t-stone-500 border-t-1">
        <Draggble
          tag="ul"
          :list="arrTodos"
          class="list-group"
          :handle="handle"
          item-key="id"
          v-bind="dragOptions"
        >
          <template #item="{ element, index }">
            <TodoTask
              v-if="element.isDone === true"
              v-model="arrTodos[index]"
              class="active:{bg-stone-800/80, ghost}"
              @delete="deleteTask"
            />
          </template>
        </Draggble>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ghost {
  @apply bg-stone-600
}
</style>
