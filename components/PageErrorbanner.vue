<template>
  <div
    class="mx-auto mb-2 flex w-80 rounded bg-red-500 px-3 py-3 text-lg text-white">
    <svg width="32" height="32" viewBox="0 0 24 24" class="mr-2">
      <path
        fill="currentColor"
        d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2z" />
      <path fill="currentColor" d="M13 16h-2v2h2zm0-6h-2v5h2z" />
    </svg>
    <span> {{ msg }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ msg: string }>()
</script>
