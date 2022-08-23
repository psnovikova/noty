<script setup>
const prop = defineProps({
  routes: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="sm:hidden bg-stone-700 w-full h-20 fixed bottom-0 flex justify-around items-center">
    <RouterLink
      v-for="route in routes"
      :key="route.name"
      :to="{ path: route.path }"
      active-class="bg-stone-600"
      class="flex flex-col items-center w-40 p-2 rounded-xl text-xs cursor-pointer m-3"
    >
      <component :is="route.icon" class="h-6" />
      <span>{{ route.name }}</span>
    </RouterLink>
  </div>
</template>

<style scoped />
