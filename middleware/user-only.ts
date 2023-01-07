import { useAuthStore } from '~~/stores/useAuthStore'

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  const token = localStorage.getItem('token')
  if (token) {
    authStore.whoAmI(token).then((response) => {
      if (response) {
        localStorage.setItem('token', response.newToken)
      }
    })
  }

  if (!authStore.currentUser) {
    console.log('>>> Middleware: Not login. Redirect to /login')
    return navigateTo('/login')
  }
})
