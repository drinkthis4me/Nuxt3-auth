import { getUserByEmail, addNewUser } from '~~/server/db/user'
import type { SingupBody } from '~~/types/user'
export default defineEventHandler(async (event) => {
  const body = await readBody<SingupBody>(event)

  const duplucateUser = await getUserByEmail(body.email)

  if (duplucateUser) {
    throw createError({
      statusCode: 409,
      statusMessage: 'This email already exists',
    })
  }

  const newUser = {
    id: Math.floor(Math.random() * 1000).toString(),
    email: body.email,
    password: body.password,
    roles: ['USER'],
  }

  addNewUser(newUser)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {password: _password, ...newUserWithoutPw } = newUser

  return newUserWithoutPw
})
