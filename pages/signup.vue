<template>
  <SignupForm @success="onSignupSuccess" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['guest-only'],
})

async function onSignupSuccess() {
  await navigateTo('/login')
}
</script>
