import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { User } from '~~/types/user'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>(null)
  const userFromLocalStorage = useLocalStorage('user', {})

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
        // Set user info
        currentUser.value = response.user
        // Store token at localStorage
        userFromLocalStorage.value = response.user.jwtToken
      })
      .catch((error) => {
        throw error
      })

    return currentUser.value
  }

  async function logout() {
    await $fetch('/auth/logout', {
      method: 'POST',
    }).then((response) => {
      // Clear user
      currentUser.value = response.user
      console.log('>>> Logout request', response)
    })
    .catch(e => {
      console.error('>>> Logout error: ',e)
      throw e
    })

    // Clear token from localStorage
    userFromLocalStorage.value = null
  }

  async function whoAmI(token: string) {
    return await $fetch('/auth/whoami', {
      method: 'GET',
      headers: { authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log('>>> whoAmI request: ', response)
        currentUser.value = response.user
        return response
      })
      .catch((e) => console.log('>>> whoAmI error: ', e))
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
        userFromLocalStorage.value = response.user.jwtToken
      })
      .catch((error) => {
        throw error
      })
  }

  return {
    currentUser,
    login,
    logout,
    signup,
    whoAmI,
  }
})
