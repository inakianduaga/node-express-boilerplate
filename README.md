# node-express-boilerplate
A typescript nodejs express boilerplate server, w/ gulp as build system 

## Why

Skip all the boilerplate and environment setup when creating a new express app w/ typescript & gulp. 

## Features

- Gulp pipeline for building/linting typescript, running tests & bumping package versions
- Typescript support, including [tsconfig.json](tsconfig.json) (typescript 1.5+ way of [configuring build options](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json)),
[tsd folder](./typings) w/ versioned types for the included dependencies. 

### Opinionated additions

On top of the bare express installation, the following has been added

- Error handling moved to a separate [errorHandler service](./src/services/errorHandler.ts) to unbloat main app file.
- Slightly opinionated [controllers](./src/controllers)/[routes](./src/routes)/[services](./src/services) folders 
for better structuring bigger applications.
- set environment values through files using [.dotenv](https://www.npmjs.com/package/dotenv) package.  

### Build system 

Several gulp tasks are provided:
 
- typescript linting/compiling tasks (watch/watchAndServe/lint/tdd) 
- server application + autorestart it when code changes (through [nodemon](https://www.npmjs.com/package/nodemon))
- run tests    
