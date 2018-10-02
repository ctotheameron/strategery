FROM mhart/alpine-node:10.10.0

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

ENV APP /koa-react-starter-service

#pass like --build-arg profile=production to build other profile
ARG profile=staging

ARG npmToken
ENV NPM_TOKEN=$npmToken

ENV PORT=8080

RUN mkdir $APP
WORKDIR $APP

# Install app dependencies
COPY package.json $APP/
COPY package-lock.json $APP/
COPY src/app/types $APP/src/app/types
COPY src/server/types $APP/src/server/types
RUN npm ci

# Bundle app source
COPY . $APP

EXPOSE 8080
RUN NODE_ENV=${profile} npm run package
WORKDIR $APP/dist

ENTRYPOINT ["node", "server.js"]
