FROM node:24-alpine AS build
# Railway passes the commit being built; the footer shows it (there is no .git in the build).
ARG RAILWAY_GIT_COMMIT_SHA
ENV GIT_COMMIT_SHA=$RAILWAY_GIT_COMMIT_SHA
WORKDIR /app
COPY site/package.json site/package-lock.json site/
RUN cd site && npm ci
COPY . .
RUN cd site && npm run build

FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/site/dist /srv
