import { getUserByEmail, addNewUser } from '~~/server/db/user'
import type { SingupBody } from '~~/types/user'
import jwt from 'jsonwebtoken'
export default defineEventHandler(async (event) => {
  const body = await readBody<SingupBody>(event)

  if (!body.email || !body.password)
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request: no email or password',
    })

  // Check duplicate user
  const duplicateUser = await getUserByEmail(body.email)

  if (duplicateUser) {
    throw createError({
      statusCode: 409,
      statusMessage: 'This email already exists',
    })
  }

  // Create a new user
  const newUser = {
    id: new Date().toString(),
    email: body.email,
    password: body.password,
    roles: ['USER'],
  }

  addNewUser(newUser)

  // Issue a jwt token
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...payload } = newUser
  const secret = useRuntimeConfig().JWT_secret
  const jwtToken = jwt.sign(payload, secret, { expiresIn: '24h' })

  // Store the token in a cookie
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 1) /** One day from now */

  setCookie(event, 'access_token', jwtToken, {
    expires: expiresAt,
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production', /** For HTTPS connection */
    sameSite: 'strict',
    path: '/',
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...newUserWithoutPw } = newUser
  const userWithToken = { ...newUserWithoutPw, jwtToken }

  return {
    user: userWithToken,
  }
})
