<template>
  <LoginForm @success="onLoginSuccess" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['guest-only'],
})
async function onLoginSuccess() {
  await navigateTo('/')
}
</script>
