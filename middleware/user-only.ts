import { useAuthStore } from '~~/stores/useAuthStore'

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()

  authStore.whoAmI()

  if (!authStore.currentUser) {
    console.log('>>> Middleware: Not login. Redirect to /login')
    return navigateTo('/login')
  }
})
