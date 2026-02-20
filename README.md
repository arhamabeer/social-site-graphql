### `DEPENDENCIES`

`yarn add typescript tsc-watch prisma @types/node @types/express @types/cors`

### `DEV-DEPENDENCIES`

`yarn add typescript tsc-watch prisma @types/node @types/express @types/cors @types/jsonwebtoken -D`

### `TYPESCRIPT INITIALIZATION`

`npx tsc --init`

### `PRISMA INITIALIZATION`

`npx prisma init`

### `PRISMA GENERATION`

`npx prisma generate`

### `UPDATE PACKAGE.JSON`

` "type": "module"`

### `DB MIGRATION`

`npx prisma migrate dev --name <<migration_name>>`

### `GIT IGNORE INIT`

`npx gitignore node`

### `UPDATE TSCONFIG.JSON`

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
