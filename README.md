`DEPENDENCIES`

`yarn add typescript tsc-watch prisma @types/node @types/express @types/cors`

`DEV-DEPENDENCIES`

`yarn add typescript tsc-watch prisma @types/node @types/express @types/cors @types/jsonwebtoken -D`

`TYPESCRIPT INITIALIZATION`
`npx tsc --init`

`PRISMA INITIALIZATION`
`npx prisma init`

`UPDATE TSCONFIG.JSON`

- add:
  "exclude": [
  "prisma.config.ts",
  "node_modules",
  "prisma",
  "build"
  ]
- update:
  "rootDir": "./src",
  "outDir": "./build",
