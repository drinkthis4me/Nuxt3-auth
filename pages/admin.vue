<template>
  <div>
    <div class="m-5">
      <div class="flex flex-col items-center justify-center">
        <div class="text-bold text-2xl">Admin Page</div>
        <div>This page is Admin only</div>
        <PageUser />
        <PageErrorBanner :msg="errorMsg" v-show="errorMsg.length > 0" />
        <div>List for all users</div>
        <table class="table w-full table-auto">
          <div class="table-header-group">
            <div class="table-row">
              <div
                class="table-cell border border-black bg-green-300 p-1 text-left">
                ID
              </div>
              <div
                class="table-cell border border-black bg-green-300 p-1 text-left">
                Email
              </div>
              <div
                class="table-cell border border-black bg-green-300 p-1 text-left">
                Password
              </div>
              <div
                class="table-cell border border-black bg-green-300 p-1 text-left">
                Roles
              </div>
            </div>
          </div>
          <div v-if="pending" class="table-row-group">
            <div class="table-cell">Data loading</div>
            <div class="table-cell">Data loading</div>
            <div class="table-cell">Data loading</div>
            <div class="table-cell">Data loading</div>
          </div>
          <div v-else class="table-row-group">
            <div v-for="user in users" :key="user.id" class="table-row">
              <div class="table-cell">{{ user.id }}</div>
              <div class="table-cell">{{ user.email }}</div>
              <div class="table-cell">{{ user.password }}</div>
              <div class="table-cell">{{ user.roles.join(', ') }}</div>
            </div>
          </div>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['admin-only'],
})

const errorMsg = ref('')

const { data: users, pending } = await useLazyFetch('/api/users', {
  // headers: useRequestHeaders(['cookie']) as HeadersInit,
}).catch((e) => (errorMsg.value = e))
</script>
