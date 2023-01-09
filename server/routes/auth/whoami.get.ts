import jwt from 'jsonwebtoken'
import { UserJwtPayload } from '~~/types/user'

export default defineEventHandler(async (event) => {
  const cookieWithToken = getCookie(event, 'access_token')

  if (!cookieWithToken)
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })

  // Verify the old token
  const secret = useRuntimeConfig().JWT_secret

  let verified: UserJwtPayload = {
    id: '',
    email: '',
    roles: [''],
  }

  jwt.verify(cookieWithToken, secret, (err, payload) => {
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

  // Delete the old cookie and set a new cookie with newToken
  deleteCookie(event, 'access_token')

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 1) /** One day from now */

  setCookie(event, 'access_token', newToken, {
    expires: expiresAt,
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production', /** For HTTPS connection */
    sameSite: 'strict',
    path: '/',
  })

  return {
    user: user,
    newToken,
  }
})