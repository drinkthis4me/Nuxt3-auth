<template>
  <div class="bg-slate-300 p-5 w-1/2  max-w-md">
    <code class="break-words">
      current user: {{ JSON.stringify(authStore.currentUser, null, 2) }}
    </code>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~~/stores/useAuthStore'
const authStore = useAuthStore()
</script>
