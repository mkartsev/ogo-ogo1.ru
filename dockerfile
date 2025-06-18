FROM node:20

WORKDIR /app

COPY yarn.lock package.json ./
COPY ./.yarnrc-docker.yml ./.yarnrc.yml
RUN corepack enable
RUN yarn install --inline-builds
ENV CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_INTERVAL=1000

COPY ./webpack.config.js ./.env ./.prettierrc.yml ./.eslintignore ./.eslintrc.json ./gulpfile.js ./.babelrc.json ./
EXPOSE 3000

CMD ["yarn", "dev", "--host", "0.0.0.0"]