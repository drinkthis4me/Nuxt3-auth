import { isAdmin, getUsers } from '../db/user'

export default defineEventHandler(async (event) => {
  const header = event.node.req.headers
  const secret = useRuntimeConfig().JWT_secret

  if (header.authorization?.replace('Bearer ', '') !== secret)
    throw createError({
      statusCode: 401,
      statusMessage: 'Access forbidden',
    })

  const allUsers = await getUsers()

  // Simulate fetching delay
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return allUsers
})
