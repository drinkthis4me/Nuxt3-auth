import { useAuthStore } from '~~/stores/useAuthStore'

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  if (authStore.currentUser) {
    console.log('>>> Already login. To home.')
    return navigateTo('/')
  }
})
