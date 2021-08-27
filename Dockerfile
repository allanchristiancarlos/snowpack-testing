FROM node:16-alpine as builder

WORKDIR /usr/src/app

# Copy our node module specification
COPY package.json package.json
COPY yarn.lock yarn.lock

# install node modules and build assets
RUN yarn install

# Copy all files from current directory to working dir in image
# Except the one defined in '.dockerignore'
COPY . .

RUN yarn build

FROM nginx:alpine

# Copy static assets from builder stage
COPY --from=builder /usr/src/app/build /var/www
COPY --from=builder /usr/src/app/default.conf /etc/nginx/conf.d/

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
