<template>
  <LoginForm @success="onLoginSuccess" />
</template>

<script lang="ts">
export default defineComponent({
  name: 'SignupPage',
  setup() {
    async function onLoginSuccess() {
      await navigateTo('/')
    }

    return {
      onLoginSuccess,
    }
  },
})
</script>
