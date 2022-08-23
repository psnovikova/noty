<script setup>
import { SearchIcon, XIcon } from '@heroicons/vue/outline'
import { useVModels } from '@vueuse/core'
import { ref } from 'vue'

const prop = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])
const { modelValue: search } = useVModels(prop, emit)

const btnClick = ref(false)
</script>

<template>
  <div>
    <div v-if="!btnClick" class="flex justify-between p-6 w-full">
      <h1 class="text-4xl text-white">
        Заметки
      </h1>
      <!--    кнопка поиска -->
      <button
        class="p-2.5 bg-stone-600 hover:bg-stone-700 rounded-xl "
        @click="btnClick = true"
      >
        <SearchIcon class="h-6" />
      </button>
    </div>
    <div
      v-if="btnClick === true"
      class="flex bg-stone-600 rounded-xl m-3"
    >
      <button
        class="p-2.5 w-12"
        @click="btnClick = true"
      >
        <SearchIcon class="h-6" />
      </button>
      <input v-model="search" class="w-full outline-none bg-transparent">
      <button
        class="p-2.5 w-12"
        @click="btnClick = false"
      >
        <XIcon class="h-6" />
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
