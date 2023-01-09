# Nuxt 3 Auth example
table of content
# Setup

Install, develop, and production

```bash
npm install
npm run dev
npm run build
```

# Project Structure

/pages

/components

/middleware

/stores

/server

# Pages
## /login
  
  Provide two methods to log in: 
  1. Email & password credencial
  2. Google oAuth
   
  This page is for guest only (not logged-in user).

  Already logged-in Users will be redirect to '/' via middleware: guest-only.ts

## /signup
  
  work In progress

##  /admin

  This page is for admin only.

  List for all users and data.

  Not admin will be redirect to '/login' via middleware: admin-only.ts

##  /private
  
  This page is for logged-in user only.

  Guest will be redirect to '/login' via middleware: user-only.ts

# components
##  LoginForm.vue
  
  Receive user input and call authStore.login() from pinia store.

  If login success, emit success and redirect to '/'.

  Else display error message.

##  SignupForm.vue
  
  work in progress

##  NavBar.vue

  Look up the current user info via userInfoStore from pinia store.

  Conditional show login/ signup/ logout links.

# middleware

Check the current user info via userInfoStore from pinia store.

Redirect to different page according to the user info.

# stores
## useUserInfoStore.ts
  State of current user. Store the current user's id, email and roles.

## useAuthStore.ts
- useAuthStore.currentUser
  
  State of the current user's id, email, roles and a JWT token.

- useAuthStore.login():

  Receive email and password.

  Call api: '/auth/login'

  Set useAuthStore.currentUser state to response.

  Store jwt Token in localStorage.

- useAuthStore.logout()
 
  Call api: '/auth/logout'

  Clear user state.

  Clear jwt Token from localStorage.

- useAuthStore.whoAmI()
  
  Call api: '/auth/whoami'

  Set useAuthStore.currentUser state to response.
  
   Planned: fetch token/cookie

- useauthStore.signup()
  
  Call api: '/auth/signup' 

  Set useAuthStore.currentUser state to response.

  Store jwt Token in localStorage.


# server

A fake backend server with api.

## routes/auth/login.post.ts
- Read and check request body.
- Check if user exists in the data base.
- Verify the password with bcrypt.js.
- Issue a JWT token.
- Return user info and token.

## routes/auth/logout.post.ts
- Check JWT token from request body.
- Return user as null.

## routes/auth/whoami.get.ts
- Read and check authorization header.
- verify the old token.
- Issue a new token with prolonged life.
- Return user info and new token.
  
## routes/auth/signup.post.ts
- Receive and check request body. 
- Check if email already exists in the data base (duplicate user).
- Create a new user.
- Push new user to the data base.
- Issue a jwt token
- Return user info and token.

Planned: hash the password

## api/users.get.ts
List of all user.
- Read and check authorization header.
- Simulate fetching delay by setTimeout.
- Return all users list