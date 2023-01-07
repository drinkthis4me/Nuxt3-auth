import { getUserByEmail } from '~~/server/db/user'
import type { User, LoginBody } from '~~/types/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginBody>(event)

  const { email, password } = body

  let userFromDB: User = {
    id: '',
    email: '',
    password: '',
    roles: [''],
  }

  // Check if email or password is missing
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required',
    })
  }

  // Check if user exists
  await getUserByEmail(email).then((response) => {
    if (!response) {
      throw createError({
        statusCode: 401,
        statusMessage: "This user doesn't exist",
      })
    }
    userFromDB = response
  })

  // verify pw
  await bcrypt
    .compare(password, userFromDB.password as string)
    .then((result) => {
      if (!result)
        throw createError({
          statusCode: 401,
          statusMessage: 'Wrong Password',
        })
    })

  // Issue a JWT
  const jwtPayload = {
    id: userFromDB.id,
    email: userFromDB.email,
    roles: userFromDB.roles,
  }
  const secret = useRuntimeConfig().JWT_secret
  const jwtToken = jwt.sign(jwtPayload, secret, { expiresIn: '24h' })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userFromDB
  const userWithToken = { ...userWithoutPassword, jwtToken }

  return {
    user: userWithToken,
  }
})
