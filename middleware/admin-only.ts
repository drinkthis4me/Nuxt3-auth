import { useAdminStore } from '~~/stores/useAdminStore'
export default defineNuxtRouteMiddleware(async () => {
  const adminStore = useAdminStore()
  if (!adminStore.isAdmin) {
    console.log('>>> Middleware: Not admin. Redirect to /login.')
    return navigateTo('/login')
  }
})
