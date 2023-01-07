// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt'],
  nitro: {
    storage: {
      redis: {
        driver: 'redis',
        base: 'redis:',
        /* Can not define a mountpoint for redis??? */
      },
    },
  },
  runtimeConfig: {
    JWT_secret: 'secret',
    public:{
      test_secret: 'wow'
    }
  }
})
