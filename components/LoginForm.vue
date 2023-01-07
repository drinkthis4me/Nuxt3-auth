<template>
  <div class="flex min-h-screen items-center justify-center bg-violet-300">
    <div class="flex-1 p-10">
      <PageErrorbanner
        v-show="formInput.error.length > 0"
        :msg="formInput.error" />
      <div class="mx-auto w-80 overflow-hidden rounded-2xl bg-white shadow-lg">
        <div class="px-10 py-5">
          <div class="text-3xl font-bold">Log In</div>
          <form class="mt-10" @submit.prevent="onLoginClick">
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
            <div class="mt-10">
              <label for="rememberMe" class="inline-block cursor-pointer">
                <span class="ml-2">Remember Me</span>
                <input
                  v-model="formInput.data.rememberMe"
                  id="rememberMe"
                  type="checkbox"
                  class="float-left mt-1 mr-2 h-4 w-4 cursor-pointer rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top accent-blue-600 transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none" />
              </label>
            </div>
            <button
              type="submit"
              class="mt-20 block w-full cursor-pointer rounded bg-rose-500 px-4 py-2 text-center font-semibold text-white hover:bg-rose-400 focus:outline-none focus:ring focus:ring-rose-500 focus:ring-opacity-80 focus:ring-offset-2">
              Log in
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
  data: { email: '', password: '', rememberMe: false },
  error: '',
  pending: false,
})

const onLoginClick = async () => {
  try {
    formInput.error = ''
    formInput.pending = true

    await authStore.login(
      formInput.data.email,
      formInput.data.password,
      formInput.data.rememberMe
    )

    emit('success')
  } catch (e: any) {
    console.error(e)
    formInput.error = e.message
  } finally {
    formInput.pending = false
  }
}
</script>
