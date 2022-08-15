<script setup>
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import Draggble from 'vuedraggable'
import ButtonAdd from '../../components/ButtonAdd.vue'
import TodoTask from '../../components/TodoTask.vue'

/**
@type Ref<Array>, "value"
 */
const arrTodos = useStorage('id', [], localStorage)

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
    <!--  event delete => func delete  -->
    <TodoTask
      v-for="todo of arrTodos.filter(el => el.isDone === false)"
      :key="todo.id"
      v-model="arrTodos[arrTodos.findIndex(el => el.id === todo.id)]"
      @delete="deleteTask"
    />
    <div v-if="arrTodos.filter(el => el.isDone === true).length">
      <hr class="pb-4 border-t-stone-500 border-t-1">
      <TodoTask
        v-for="(todo) of arrTodos.filter(el => el.isDone === true)"
        :key="todo.id"
        v-model="arrTodos[arrTodos.findIndex(el => el.id === todo.id)]"
        @delete="deleteTask"
      />
    </div>
    <ButtonAdd @click="addTask" />

    <!--    НАЗАВТРА Draggble -->
    <!--    <draggble -->
    <!--      tag="ul" -->
    <!--      :list="addTask" -->
    <!--      class="list-group" -->
    <!--      handle=".handle" -->
    <!--      item-key="name" -->
    <!--    > -->
    <!--      <template /> -->
    <!--    </draggble> -->
  </div>
</template>

<style scoped>

</style>
