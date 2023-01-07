<template>
  <div>private page for login user only</div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['user-only'],
})
</script>
