// Catch all Route for /api/*
export default defineEventHandler(() => {
  return { api: `Catch all api handler`}
})
