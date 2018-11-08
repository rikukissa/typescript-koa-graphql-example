FROM node:carbon
WORKDIR /usr/src/app

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

# Install all dependencies of the current project.
COPY package.json package.json
COPY package.lock package.lock
RUN npm install

# add project src files
COPY . .

# TODO change this for production
ENV NODE_ENV=DEVELOPMENT

EXPOSE 5000

CMD npm start:prod
