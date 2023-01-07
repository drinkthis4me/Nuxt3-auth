import { defineStore } from 'pinia'
import { useAuthStore } from './useAuthStore'
export const useAdminStore = defineStore('admin', () => {
  const authStore = useAuthStore()

  const isAdmin = computed(() => {
    authStore.whoAmI()
    const role = authStore.currentUser?.roles.includes('ADMIN')
    return role ? true : false
  })

  return {
    isAdmin,
  }
})
