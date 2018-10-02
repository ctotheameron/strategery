# koa-react-starter-service

![Build Status](https://codebuild.us-west-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoic01RblM3VVFoNE9yYVY5SkFIN0JXTkp4aTVodHZEdkJiRmlzaTBxRkpDbUJOV3EzU1R4eUhia1BDVGZmcStUcWY3ZENGQmZLa3VxR1hFNWRPRkIrUFVBPSIsIml2UGFyYW1ldGVyU3BlYyI6InQvd0VWY0UyNE03Nnl4LzIiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)
[![codecov](https://codecov.io/gh/serviceslabs/koa-react-starter-service/branch/master/graph/badge.svg?token=yfL4V2jqAY)](https://codecov.io/gh/serviceslabs/koa-react-starter-service)

Opinionated boilerplate for Koa+React service

## Pre-Requisites

This repo recommends using Node v10.10.0.
[check-engines](https://github.com/kruppel/check-engines#readme) will be prompt
you to use the right version before performing any actions. We generally use
[nvm](https://github.com/creationix/nvm) to switch between multiple node
versions in dev boxes. So follow the instructions to install nvm and when done.
When done, run the following command (nvm picks the right version from .nvmrc)

```bash
nvm install
```

## Installation

Clone the repo and install the depencies

```bash
git clone git@github.com:serviceslabs/koa-react-starter-service.git
cd koa-react-starter-service
npm install
```

## Features

### App

* Typescript  😈
* react
* react-router
* redux
* redux-Thunk
* axios

Server

* koa.js
* koa-router
* koa-static
* bunyan
* axios

### UI Theme

* None (yet)

### Testing

* jest
* enzyme

### Build and Linters

* webpack
* tslint
* babel

## Available Scripts

### `npm start`

Runs both the app and server in development mode (see below).

### `npm run start:app`

Runs the app in the development mode.
Open <http://localhost:8080> to view it in the browser.

Hot and Live Reload are supported.
You will also see any linter errors in the console.

### `npm run start:server`

Runs the koa.js server in development mode listening on port 4000.

### `npm test`

Launches the test runner in the interactive watch mode for both server and app.

### `npm run package`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the
best performance.

The build is minified and the filenames include the hashes.

> When running npm run package, NODE_ENV should be set to staging or production
to trigger correct config compilation `NODE_ENV=staging npm run package`