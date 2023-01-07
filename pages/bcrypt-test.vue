<template>
  <div>
    <div class="bg-slate-300">
      <form @click.prevent="onSubmitClick">
        <label for="password">password</label>
        <input id="password" v-model.lazy="userInput" />
        <button
          type="submit"
          class="rounded-lg bg-violet-400 p-3 hover:bg-violet-600">
          Submit
        </button>
      </form>
      <div>
        <div>userInput: {{ userInput }}</div>
        <div>hash: {{ hashResult }}</div>
      </div>
      <form @click.prevent="onCompareClick">
        <label for="compare">Compare PW</label>
        <input id="compare" v-model.lazy="comparePw" />

        <button
          type="submit"
          class="rounded-lg bg-violet-400 p-3 hover:bg-violet-600">
          Compare
        </button>
      </form>
      <div>compare result: {{ msg }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import bcrypt from 'bcryptjs'
const userInput = ref('')
const hashResult = ref('')
const comparePw = ref('')
const msg = ref<boolean>()

const encryptPw = (rawPassword: string) => {
  const hash = bcrypt.hashSync(rawPassword, 10)
  hashResult.value = hash
}

const onSubmitClick = () => {
  encryptPw(userInput.value)
  console.log('>>> Hash generated')
}

const onCompareClick = () => {
  msg.value = bcrypt.compareSync(comparePw.value, hashResult.value)
}
</script>
