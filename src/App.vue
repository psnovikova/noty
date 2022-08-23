<script setup>
import { CheckCircleIcon, CogIcon, PencilAltIcon } from '@heroicons/vue/outline'
import { usePWA } from '/src/utils/pwa'
import MenuDesktop from './components/MenuDesktop.vue'
import MenuMobail from './components/MenuMobail.vue'

const routes = [
  { path: '/notes', name: 'Заметки', icon: PencilAltIcon },
  { path: '/todos', name: 'Задачи', icon: CheckCircleIcon },
  { path: '/settings', name: 'Настройки', icon: CogIcon },
]

const pwa = usePWA()
pwa.check()
</script>

<template>
  <div class="h-screen w-screen flex flex-row bg-stone-800 text-white">
    <MenuDesktop
      :routes="routes"
      class="hidden sm:flex sm:w-52 md:w-64 shrink-0 mx-3 my-6"
    />
    <div class="flex flex-col grow pb-20 sm:pb-0">
      <Suspense>
        <RouterView />
        <template #fallback>
          Loading...
        </template>
      </Suspense>
      <MenuMobail :routes="routes" />
    </div>
  </div>
</template>

<style scoped />
