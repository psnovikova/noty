import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/notes',
  },
  {
    path: '/notes',
    children: [
      {
        path: '',
        name: 'notes',
        component: () => import('/src/pages/notes/NotesPage.vue'),
      },
      {
        path: ':id',
        name: 'note',
        component: () => import('/src/pages/notes/NotePage.vue'),
      },
    ],
  },
  {
    name: 'todos',
    path: '/todos',
    component: () => import('/src/pages/todos/TodosPage.vue'),
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('/src/pages/settings/SettingsPage.vue'),
  },
  {
    path: '/:catchall(.*)',
    redirect: '/notes',
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
