/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as LoginImport } from './routes/login'
import { Route as AuthImport } from './routes/auth'
import { Route as IndexImport } from './routes/index'

// Create Virtual Routes

const UserDashboardLazyImport = createFileRoute('/user-dashboard')()
const AboutLazyImport = createFileRoute('/about')()

// Create/Update Routes

const UserDashboardLazyRoute = UserDashboardLazyImport.update({
  path: '/user-dashboard',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/user-dashboard.lazy').then((d) => d.Route),
)

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const RegisterRoute = RegisterImport.update({
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/user-dashboard': {
      id: '/user-dashboard'
      path: '/user-dashboard'
      fullPath: '/user-dashboard'
      preLoaderRoute: typeof UserDashboardLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/auth': typeof AuthRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/about': typeof AboutLazyRoute
  '/user-dashboard': typeof UserDashboardLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/auth': typeof AuthRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/about': typeof AboutLazyRoute
  '/user-dashboard': typeof UserDashboardLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/auth': typeof AuthRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/about': typeof AboutLazyRoute
  '/user-dashboard': typeof UserDashboardLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/auth'
    | '/login'
    | '/register'
    | '/about'
    | '/user-dashboard'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/auth' | '/login' | '/register' | '/about' | '/user-dashboard'
  id:
    | '__root__'
    | '/'
    | '/auth'
    | '/login'
    | '/register'
    | '/about'
    | '/user-dashboard'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRoute
  LoginRoute: typeof LoginRoute
  RegisterRoute: typeof RegisterRoute
  AboutLazyRoute: typeof AboutLazyRoute
  UserDashboardLazyRoute: typeof UserDashboardLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRoute,
  LoginRoute: LoginRoute,
  RegisterRoute: RegisterRoute,
  AboutLazyRoute: AboutLazyRoute,
  UserDashboardLazyRoute: UserDashboardLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/auth",
        "/login",
        "/register",
        "/about",
        "/user-dashboard"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/auth": {
      "filePath": "auth.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/user-dashboard": {
      "filePath": "user-dashboard.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
