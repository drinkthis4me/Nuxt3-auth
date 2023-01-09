import jwt from 'jsonwebtoken'
import { UserJwtPayload } from '~~/types/user'
import { getUsers } from '../db/user'

export default defineEventHandler(async (event) => {
  const header = event.node.req.headers

  if (header.authorizationt)
    throw createError({
      statusCode: 401,
      statusMessage: 'Access forbidden',
    })

  // Verify the token and check if the user is ADMIN
  const oldToken = (header.authorization as string).replace('Bearer ', '')
  const secret = useRuntimeConfig().JWT_secret

  jwt.verify(oldToken, secret, (err, payload) => {
    if (err) {
      const msg =
        err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
      throw createError({
        statusCode: 401,
        statusMessage: msg,
      })
    }
    const roles = (payload as UserJwtPayload).roles
    if (roles.find(t => t === 'ADMIN')) console.log(payload)
    else throw createError({
      statusCode: 401,
      statusMessage: 'Access forbidden',
    })
  })

  const allUsers = await getUsers()

  // Simulate fetching delay
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return allUsers
})
