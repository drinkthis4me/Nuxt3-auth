<template>
  <div>
    <div class="mx-auto my-5 flex flex-col items-center justify-center">
      <div class="text-5xl">Hello</div>
      <PageUser />
      <div>
        <ul class="list-none hover:list-disc">
          <li class="text-lg" v-for="item in siteMap" :key="item.title">
            <NuxtLink :to="item.link"> {{ item.title }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const siteMap = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Login',
    link: '/login',
  },
  {
    title: 'Admin',
    link: '/admin',
  },
  {
    title: 'Private',
    link: '/private',
  },
  {
    title: 'Signup',
    link: '/signup',
  },
]
</script>
