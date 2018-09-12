FROM mhart/alpine-node:10.9.0

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

ENV APP /koa-react-starter-service

#pass like --build-arg profile=production to build other profile
ARG profile=staging
ENV NODE_ENV=${profile}
ENV PORT=8080

RUN mkdir $APP
WORKDIR $APP

# Install app dependencies
COPY . $APP
RUN yarn

# Bundle app source

EXPOSE 8080
RUN yarn build

WORKDIR $APP/dist

ENTRYPOINT ["node", "server.js"]
