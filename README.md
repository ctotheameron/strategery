# **koa-react-starter-service**


Opinionated boilerplate for Koa+React service


## Pre-Requisites

This repo recommends using Node v10.9.0. [check-engines](https://github.com/kruppel/check-engines#readme) will be prompt you to use the right version before performing any actions. We generally use [nvm](https://github.com/creationix/nvm) to switch between multiple node versions in dev boxes. So follow the instructions to install nvm and when done..

```bash
$ nvm install 10.9.0
```

## Installation

Clone the repo and install the depencies. We use `yarn` in the place of `npm ` just because we like it more. To install yarn, see [here](https://yarnpkg.com/en/docs/install#mac-stable)

```bash
$ git clone git@github.com:serviceslabs/koa-react-starter-service.git
$ cd koa-react-starter-service
$ yarn install
```

## Feature

#### App

* Typescript  😈
* react (16.4.2)
* react-router (4.3.1)
* redux
* redux-Thunk
* axios

Server

* koa.js (2.5.2)
* koa-router
* koa-static
* bunyan
* axios

#### UI Theme

* None (we recommend Material-UI)

#### Testing

* jest
* enzyme

#### Build and Linters

* webpack
* tslint
* babel


## Available Scripts

### `npm start:app`

Runs the app in the development mode.<br>
Open [http://localhost:8080 to view it in the browser.

Hot and Live Reload are supported.<br>
You will also see any linter errors in the console.

### `npm start:server`

Runs the koa.js server in development mode listening on port 4000.

### `npm test`

Launches the test runner in the interactive watch mode for both server and app.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>