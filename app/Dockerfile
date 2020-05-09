# install node modules
FROM node:10.15.3 as install
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN yarn install

# build
FROM install as build
RUN yarn build

# deploy with pm2
FROM keymetrics/pm2:latest-alpine

COPY --from=build /usr/src/app /usr/src/app
COPY --from=build /usr/src/app/pm2.json .
EXPOSE 3000

# RUN [ "ln", "-s", "/src/static", "static" ]
CMD [ "pm2-runtime", "start", "pm2.json" ]