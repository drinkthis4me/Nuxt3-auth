# Nuxt 3 Auth example
This is a learning project base on [damien-hl's repo](https://github.com/damien-hl/nuxt3-auth-example).

I do not come up with this on my own.

Dependencies:

- [pinia](https://pinia.vuejs.org/): state management
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js): hash the user password
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken): API authentication 


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
  1. Email & password credential
  2. Google oAuth (TBD)
   
  This page is for guest only (not logged-in user).

  Already logged-in Users will be redirect to '/' by middleware: guest-only.ts

## /signup
  
  work In progress

##  /admin

  This page is for admin only.

  List for all users and data.

  Not admin will be redirect to '/login' by middleware: admin-only.ts

##  /private
  
  This page is for logged-in user only.

  Guest will be redirect to '/login' by middleware: user-only.ts

# components
##  LoginForm.vue
  
Receive user input and call authStore.login() from pinia store.

If login success, emit success and redirect to '/'.

Else display error message.

##  SignupForm.vue
  
Receive user input and call authStore.signup() from pinia store.

If login success, emit success and redirect to '/'.

##  NavBar.vue

Look up the current user info by calling authStore.whoami() from pinia store.

Conditionally show login/ signup/ logout links.

# middleware

Check the current user info by userInfoStore from pinia store.

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

- useAuthStore.logout()
 
  Call api: '/auth/logout'

  Clear user state.

- useAuthStore.whoAmI()
  
  Call api: '/auth/whoami'

  Set useAuthStore.currentUser state to response.
  
- useAuthStore.signup()

  Receive email and password.
  
  Call api: '/auth/signup' 

  Set useAuthStore.currentUser state to response.

# server

A fake backend server with api.

## routes/auth/login.post.ts
- Read and check request body.
- Check if user exists in the data base.
- Verify the password with bcrypt.js.
- Issue a JWT token.
- Store the token in cookie.
- Return user info and token.

## routes/auth/logout.post.ts
- Check JWT token from cookie.
- Delete the cookie.
- Return user as null.

## routes/auth/whoami.get.ts
- Check JWT token from cookie.
- verify the old token.
- Issue a new token with prolonged life.
- Store the token in cookie.
- Return user info and new token.
  
## routes/auth/signup.post.ts
- Receive and check request body. 
- Check if email already exists in the data base (duplicate user).
- Hash the password.
- Create a new user.
- Push new user to the data base.
- Issue a JWT token.
- Store the token in cookie.
- Return user info and token.

## api/users.get.ts
List of all users.
- Check JWT token from cookie.
- Verify the token.
- Check if the request is from ADMIN.
- Simulate a fetching delay by setTimeout.
- Return all-users list.

# Todo
- Implement remember me for log in user.
- Use environment variables for cookie and private key.
  
# License

MIT.

See LICENSE file for details.