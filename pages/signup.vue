<template>
  <SignupForm @success="onLoginSuccess"/>
</template>

<script lang="ts">
export default defineComponent({
  name: 'SignupPage',
  setup(){
    async function onLoginSuccess() {
      await navigateTo('/login')
    }

    return{
      onLoginSuccess
    }
  }
})
</script>