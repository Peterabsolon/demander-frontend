FROM node

COPY . /code
WORKDIR /code

RUN rm -rf node_modules
RUN npm install --unsafe-perm --silent

ENTRYPOINT ["npm","start"]
