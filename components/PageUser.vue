<template>
  <div class="w-1/2 max-w-md bg-slate-300 p-5">
    <code class="break-words">
      current user: {{ JSON.stringify(authStore.currentUser, null, 2) }}
    </code>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~~/stores/useAuthStore'
const authStore = useAuthStore()
</script>
