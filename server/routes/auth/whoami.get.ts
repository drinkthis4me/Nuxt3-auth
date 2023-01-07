import jwt from 'jsonwebtoken'
import { getUserByEmail } from '~~/server/db/user'
import { UserJwtPayload } from '~~/types/user'

export default defineEventHandler(async (event) => {
  const header = event.node.req.headers

  if (!header.authorization)
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })

  const oldToken = (header.authorization as string).replace('Bearer ', '')

  const secret = useRuntimeConfig().JWT_secret

  // Verify the old token
  let verified: UserJwtPayload = {
    id: '',
    email: '',
    roles: [''],
  }

  jwt.verify(oldToken, secret, (err, payload) => {
    if (err) {
      const msg =
        err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
      throw createError({
        statusCode: 401,
        statusMessage: msg,
      })
    }
    if (payload) verified = payload as UserJwtPayload
    console.log(payload)
  })

  // Sign a new token with prolonged life
  const user = {
    id: verified.id,
    email: verified.email,
    roles: verified.roles,
  }

  const newToken = jwt.sign(user, secret, { expiresIn: '24h' })
  if (!newToken)
    createError({
      statusCode: 401,
      statusMessage: 'Cannot sign new token',
    })

  return {
    user: user,
    newToken,
  }
})

// To do:
// get Token from localStorage/cookie
