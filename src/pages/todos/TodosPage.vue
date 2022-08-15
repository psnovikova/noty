<script setup>
import { computed, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import Draggble from 'vuedraggable'
import { CheckIcon, MenuAlt4Icon, XIcon } from '@heroicons/vue/outline'
import ButtonAdd from '../../components/ButtonAdd.vue'
import TodoTask from '../../components/TodoTask.vue'

/**
@type Ref<Array>, "value"
 */
const arrTodos = useStorage('id', [], localStorage)

const dragging = ref(false)

const handle = computed(() => {
  if (dragging.value)
    return 'under drag'
  else return ''
  // return this.dragging ? 'under drag' : ''
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
// func delete
</script>

<template>
  <div class="w-full">
    <h1 class="text-4xl p-6">
      Задачи
    </h1>
    <ButtonAdd @click="addTask" />

    <!--        НА СЕГОДНЯ Draggble -->
    <!--    МУСОР МУСОР МУСОР -->
    <draggble
      tag="ul"
      :list="arrTodos"
      class="list-group"
      handle=".handle"
      item-key="id"
    >
      <template #item="{ element, index }">
        <div>
          <TodoTask v-if="element.isDone === false" v-model="arrTodos[index]" @delete="deleteTask" />
        </div>
      </template>
    </draggble>
    <div v-if="arrTodos.filter(el => el.isDone === true).length">
      <hr class="pb-4 border-t-stone-500 border-t-1">
      <draggble
        tag="ul"
        :list="arrTodos"
        class="list-group"
        :handle="handle"
        item-key="id"
      >
        <template #item="{ element, index }">
          <div>
            <TodoTask v-if="element.isDone === true" v-model="arrTodos[index]" @delete="deleteTask" />
          </div>
        </template>
      </draggble>
    </div>
  </div>
</template>

<style scoped>

</style>
