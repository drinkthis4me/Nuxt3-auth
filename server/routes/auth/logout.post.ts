export default defineEventHandler(async (event) => {
  const cookieWithToken = getCookie(event, 'access_token')

  if(!cookieWithToken)
  throw createError({
    statusCode: 400,
    statusMessage: 'Bad request',
  })

  deleteCookie(event, 'access_token')
 
  return {
    user: null,
  }
})

// Pending: Invalidating JWT strategies 
// delete from the client? token blacklist? short token expiry time and rotate often?