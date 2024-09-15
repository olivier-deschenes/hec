/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/auth'
import { Route as IndexImport } from './routes/index'
import { Route as ProgramsIndexImport } from './routes/programs/index'
import { Route as ProgramsProgramidImport } from './routes/programs/$program_id'
import { Route as AuthLoginImport } from './routes/auth/login'

// Create/Update Routes

const AuthRoute = AuthImport.update({
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProgramsIndexRoute = ProgramsIndexImport.update({
  path: '/programs/',
  getParentRoute: () => rootRoute,
} as any)

const ProgramsProgramidRoute = ProgramsProgramidImport.update({
  path: '/programs/$program_id',
  getParentRoute: () => rootRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  path: '/login',
  getParentRoute: () => AuthRoute,
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
    '/auth/login': {
      id: '/auth/login'
      path: '/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/programs/$program_id': {
      id: '/programs/$program_id'
      path: '/programs/$program_id'
      fullPath: '/programs/$program_id'
      preLoaderRoute: typeof ProgramsProgramidImport
      parentRoute: typeof rootRoute
    }
    '/programs/': {
      id: '/programs/'
      path: '/programs'
      fullPath: '/programs'
      preLoaderRoute: typeof ProgramsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthLoginRoute: typeof AuthLoginRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthLoginRoute: AuthLoginRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/auth': typeof AuthRouteWithChildren
  '/auth/login': typeof AuthLoginRoute
  '/programs/$program_id': typeof ProgramsProgramidRoute
  '/programs': typeof ProgramsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/auth': typeof AuthRouteWithChildren
  '/auth/login': typeof AuthLoginRoute
  '/programs/$program_id': typeof ProgramsProgramidRoute
  '/programs': typeof ProgramsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/auth': typeof AuthRouteWithChildren
  '/auth/login': typeof AuthLoginRoute
  '/programs/$program_id': typeof ProgramsProgramidRoute
  '/programs/': typeof ProgramsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/auth'
    | '/auth/login'
    | '/programs/$program_id'
    | '/programs'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/auth' | '/auth/login' | '/programs/$program_id' | '/programs'
  id:
    | '__root__'
    | '/'
    | '/auth'
    | '/auth/login'
    | '/programs/$program_id'
    | '/programs/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
  ProgramsProgramidRoute: typeof ProgramsProgramidRoute
  ProgramsIndexRoute: typeof ProgramsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  ProgramsProgramidRoute: ProgramsProgramidRoute,
  ProgramsIndexRoute: ProgramsIndexRoute,
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
        "/programs/$program_id",
        "/programs/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/auth": {
      "filePath": "auth.tsx",
      "children": [
        "/auth/login"
      ]
    },
    "/auth/login": {
      "filePath": "auth/login.tsx",
      "parent": "/auth"
    },
    "/programs/$program_id": {
      "filePath": "programs/$program_id.tsx"
    },
    "/programs/": {
      "filePath": "programs/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
