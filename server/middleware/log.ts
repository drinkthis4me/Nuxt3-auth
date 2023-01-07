// Middleware handlers should not return anything (nor close or respond to the request) and only inspect or extend the request context or throw an error.
export default defineEventHandler((event) => {
  console.log('New request: ' + event.node.req.url)
})
