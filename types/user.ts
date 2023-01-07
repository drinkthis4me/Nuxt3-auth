import jwt from 'jsonwebtoken'

export interface User {
  id: string
  email: string
  password?: string
  roles: string[]
  jwtToken?: string
}

// export type UserWithoutPassword = Omit<User, 'password'>

export interface LoginBody {
  email: string
  password: string
  rememberMe: boolean
}

export type SingupBody = Omit<LoginBody, 'rememberMe'>



  export interface UserJwtPayload extends jwt.JwtPayload {
    id: string
    email: string
    roles: string[]
  }
