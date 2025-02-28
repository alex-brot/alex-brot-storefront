FROM node:20-slim AS base
RUN npm install -g pnpm@10.5.2
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store

ARG MEDUSA_BACKEND
ARG MEDUSA_PUBLISHABLE_KEY
ARG APP_BLOG_POST_URL
ARG APP_BLOG_API_TOKEN


ENV MEDUSA_BACKEND_URL=$MEDUSA_BACKEND
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$MEDUSA_PUBLISHABLE_KEY
ENV BLOG_POST_URL=$APP_BLOG_POST_URL
ENV BLOG_API_TOKEN=$APP_BLOG_API_TOKEN
RUN echo $BLOG_POST_URL
RUN echo $BLOG_API_TOKEN
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
EXPOSE 8000
CMD [ "pnpm", "start" ]

