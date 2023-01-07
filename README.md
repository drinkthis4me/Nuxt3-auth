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

- useAuthStore.login():

  Receive email and password.

  Call api: '/auth/login'

  Set userInfoStore.user state to response.

  planned: store token/cookie in localStorage.

- useAuthStore.logout()
 
  Call api: '/auth/logout'

  Clear user state.

  Planned: clear token/cookie in localStorage.

-  useAuthStore.me()
  
   Planned: fetch token/cookie and set userInfoStore.user state.

-  useauthStore.signup()
  
    Call api: '/auth/signup' to register a new user. 

# server

A fake backend server with api.

## routes/auth/login.post.ts
Receive request body.

Check if email or password is blank.

Check if email exists in the data base.

Verify pw with bcrypt.js.

Finally return user data without password.

## routes/auth/logout.post.ts
return user as null

## routes/auth/me.get.ts
work in progress

## routes/auth/signup.post.ts
receive request body.

Check if email already exists in the data base.

Create a new user object.

Push new user to the data base.

Finally return user data without password.

Planned: hash the password

## api/users.get.ts
List of all user.

Check if user is admin.

Simulate fetching delay by setTimeout.