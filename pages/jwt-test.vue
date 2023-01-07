<template>
  <div>
    <div class="bg-slate-300 p-5">
      <form class="flex flex-col" @submit.prevent="onSubmitClick">
        <label for="email">email</label>
        <input v-model="userInput.email" id="email" />
        <label for="password">password</label>
        <input v-model="userInput.password" id="password" />
        <button
          type="submit"
          class="rounded-lg bg-violet-400 p-3 hover:bg-violet-600">
          submit
        </button>
      </form>
      <div>
        <div>result: {{ result }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import jwt from 'jsonwebtoken'
const config = useRuntimeConfig()
const userInput = reactive({
  email: '',
  password: '',
})
const result = ref('')

function onSubmitClick() {
  // const payload = 'foobar'
  // const secret = config.public.test_secret
  // const token = jwt.sign(payload, secret)
  //   result.value = token
}

console.log('Runtime config:', config.public.test_secret)
if (process.server) {
  console.log('API secret:', config.apiSecret)
}
</script>
