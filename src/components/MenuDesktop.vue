<script setup>
import { ChevronRightIcon } from '@heroicons/vue/outline'

const prop = defineProps({
  routes: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="flex flex-col">
    <RouterLink
      v-for="route in routes"
      :key="route.name"
      :to="{ path: route.path }"
      class="flex items-center justify-between flex-row rounded-xl text-base font-medium m-2 py-1 px-5 group"
      active-class="bg-stone-600"
    >
      <div class="flex flex-row">
        <component :is="route.icon" class="h-6 pr-2" />
        <span>{{ route.name }}</span>
      </div>
      <ChevronRightIcon class="h-6 opacity-0 group-hover:opacity-100 duration-150" />
    </RouterLink>
  </div>
</template>

<style scoped></style>
