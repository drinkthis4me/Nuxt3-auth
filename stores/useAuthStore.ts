import { defineStore } from 'pinia'
import type { User } from '~~/types/user'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>(null)

  async function login(
    userEmail: string,
    userPassword: string,
    rememberMe: boolean
  ) {
    await $fetch('/auth/login', {
      method: 'POST',
      body: {
        email: userEmail,
        password: userPassword,
        rememberMe: rememberMe,
      },
    })
      .then((response) => {
        console.log('>>> Login request', response)
        currentUser.value = response.user
      })
      .catch((error) => {
        throw error
      })

    return currentUser.value
  }

  async function logout() {
    await $fetch('/auth/logout', {
      method: 'POST',
    })
      .then((response) => {
        currentUser.value = response.user
        console.log('>>> Logout request', response)
      })
      .catch((e) => {
        console.error('>>> Logout error: ', e)
        throw e
      })
  }

  async function whoAmI() {
    await $fetch('/auth/whoami', {
      method: 'GET',
    })
      .then((response) => {
        currentUser.value = response.user
      })
      .catch((e) => console.log('>>> whoAmI error: ', e))
    return currentUser.value
  }

  async function signup(userEmail: string, userPassword: string) {
    await $fetch('/auth/signup', {
      method: 'POST',
      body: {
        email: userEmail,
        password: userPassword,
      },
    })
      .then((response) => {
        console.log('>>> Sign up request: ', response)
        currentUser.value = response.user
      })
      .catch((error) => {
        throw error
      })
    return currentUser.value
  }

  return {
    currentUser,
    login,
    logout,
    signup,
    whoAmI,
  }
})
