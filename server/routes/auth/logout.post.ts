export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if(!body.jwtToken)
  throw createError({
    statusCode: 400,
    statusMessage: 'Bad request',
  })
 
  return {
    user: null,
  }
})

// Pending: Invalidating JWT strategies 
// delete from the client? token blacklist? short token expiry time and rotate often?