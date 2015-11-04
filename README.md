node-express-boilerplate
=====================

[![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url]

> A typescript nodejs express boilerplate server, w/ gulp as build system, includes release tooling, testing helpers and CI integration.

## Why

Skip all the boilerplate and environment setup when creating a new express app w/ typescript & gulp, and start using ES6 features plus types on node right now.

## Features

- **Gulp pipeline** for building/linting typescript, running tests & bumping/tagging package versions. Bonus: Use ES6 features in gulp build itself.
- **Typescript support**, including [tsconfig.json](tsconfig.json) (typescript 1.6+ way of [configuring build options](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json)),
[tsd folder](./typings) w/ versioned types for the included dependencies.
- **Travis CI integration**, w/ github release, testing & linting tasks.
- Choice of **Jasmine or Mocha** for testing, examples provided
- **Environment configuration** through `.env` file
- Optional **dockerized container** so you don't need to install anything locally (except docker :))
- **Test coverage reporting** (& submission to coveralls)
- **PM2 integration** to run a server cluster, both as local installation or on a dockerized container

### Opinionated additions

On top of the bare express installation, the following has been added

- Error handling moved to a separate [errorHandler service](./src/services/errorHandler.ts) to unbloat main app file.
- Slightly opinionated [controllers](./src/controllers)/[routes](./src/routes)/[services](./src/services) folders
for better structuring bigger applications.
- set environment values through files using [.dotenv](https://www.npmjs.com/package/dotenv) package.

### Build system

Several gulp tasks are provided, which are described by running `gulp help`:

- typescript linting/compiling tasks (watch/watchAndServe/lint/tdd)
- server application + autorestart it when code changes (through [nodemon](https://www.npmjs.com/package/nodemon))
- run tests (jasmine/mocha + supertest included as examples)

## Installation

You can either run the project installing dependencies locally, or run a dockerized container that includes all dependencies

### Local

- Node must be installed on the system
- Run `npm install` from the root folder to install all required dev/build dependencies
- (Optionally) Install *Typescript definitions manager (tsd)* `npm install tsd -g` globally to update typescript definitions when desired

### Docker

You can use the included Dockerfile to build an image that provides node and npm installed by default, and points
 to the `gulp` command as the entrypoint. You can follow these steps

1. Build the docker image, w/ some tag: `docker build -t node-express-boilerplate`
2. Install npm dependencies if starting from scratch
  `docker run -t --rm -v /absolute/path/to/this/folder:/app --entrypoint="npm" node-express-boilerplate install`.

  You can also replace `install` by `any_npm_command` in the above
3. Run any gulp task from the project:
  `docker run -t --rm -v /absolute/path/to/this/folder:/app node-express-boilerplate <GULP_TASK_HERE>`

The docker container includes the *tsd* node package pre-installed, which you can run through
  `docker run -t --rm -v /absolute/path/to/this/folder:/app --entrypoint="tsd" node-express-boilerplate <TSD_COMMAND_HERE>`

##### Launching server on docker

Remember to map the port from the host to the container to be able to access the server.

`docker run -t --rm -p 3000:3000 -v /absolute/path/to/this/folder:/app node-express-boilerplate serve --port=3000`

## Developing

- Use the `gulp watchAndServe` task (or `docker run -t --rm -p 3000:3000 -v /absolute/path/to/this/folder:/app node-express-boilerplate watchAndServe --port=3000` when using the dockerized container)
during development to get hot code-reloading/test running when you modify your code

## Running production server:

To make use of all your server resources, it is recommended to run the server in cluster mode (via the [PM2](https://www.npmjs.com/package/pm2) package)

#### Running on hosts local installation:

Use the `gulp serveCluster` task. You can monitor the cluster and issue commands by running pm2 command (for this you might want to install pm2 globally, `npm install pm2 -g`)

#### Running through docker container

The container image already contains PM2 globally. In order to launch the server, we need to use the wrapper script `serveCluster.sh`. It can be called by running

`docker run --rm -v /absolute/path/to/this/folder:/app -p 3000:3000 --name myRunningServer --entrypoint="bash"  node-express-boilerplate ./serveCluster.sh <PM2 OPTIONS HERE>`

where `<PM2 OPTIONS HERE>` can be any number of CLI options from the PM2 package, such as `--instances=4`, etc.

**Issuing commands to the cluster**

You can interact with the cluster running inside the container via PM2 using the following command

`docker exec myRunningServer pm2 <OPTIONS>`,

such as for example

`docker exec myRunningServer pm2 reload` or
`docker exec myRunningServer pm2 show 0`


[travis-url]: https://travis-ci.org/inakianduaga/node-express-boilerplate
[travis-image]: https://travis-ci.org/inakianduaga/node-express-boilerplate.svg?branch=master

[coveralls-url]: https://coveralls.io/github/inakianduaga/node-express-boilerplate?branch=master
[coveralls-image]: https://coveralls.io/repos/inakianduaga/node-express-boilerplate/badge.svg?branch=master&service=github
