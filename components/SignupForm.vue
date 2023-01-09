<template>
  <div class="flex min-h-screen items-center justify-center bg-violet-300">
    <div class="flex-1 p-10">
      <PageErrorBanner
        v-show="formInput.error.length > 0"
        :msg="formInput.error" />
      <div class="mx-auto w-80 overflow-hidden rounded-2xl bg-white shadow-lg">
        <div class="px-10 py-5">
          <div class="text-3xl font-bold">Sign up</div>
          <form class="mt-10" @submit.prevent="onSignupClick">
            <div class="relative">
              <input
                v-model="formInput.data.email"
                id="email"
                name="email"
                type="text"
                class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                placeholder="john@doe.com" />
              <label
                for="email"
                class="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                >Email address</label
              >
            </div>
            <div class="relative mt-10">
              <input
                v-model="formInput.data.password"
                id="password"
                type="password"
                name="password"
                class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                placeholder="Password" />
              <label
                for="password"
                class="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                >Password</label
              >
            </div>
            <div class="relative mt-10">
              <input
                v-model="formInput.data.confirmPassword"
                id="password_confirm"
                type="password"
                name="password_confirm"
                class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                placeholder="Password" />
              <label
                for="password_confirm"
                class="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                >Confirm Password</label
              >
            </div>
            <button
              type="submit"
              class="mt-20 block w-full cursor-pointer rounded bg-rose-500 px-4 py-2 text-center font-semibold text-white hover:bg-rose-400 focus:outline-none focus:ring focus:ring-rose-500 focus:ring-opacity-80 focus:ring-offset-2">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~~/stores/useAuthStore'

const authStore = useAuthStore()
const emit = defineEmits(['success'])

const formInput = reactive({
  data: {
    email: '',
    password: '',
    confirmPassword: '',
  },
  error: '',
  pending: false,
})

const pwValidator = () => {
  if (formInput.data.password === formInput.data.confirmPassword) {
    return
  } else {
    throw createError({
      statusCode: 409,
      statusMessage: 'Passwords are different',
    })
  }
}

const onSignupClick = async () => {
  try {
    formInput.error = ''
    formInput.pending = true
    pwValidator()
    await authStore.signup(formInput.data.email, formInput.data.password)
    emit('success')
  } catch (e: any) {
    console.error(e)
    formInput.error = e.message
  } finally {
    formInput.pending = false
  }
}
</script>
