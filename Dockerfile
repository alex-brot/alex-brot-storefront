FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
ENV NEXT_PUBLIC_DEFAULT_REGION="at"
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    --mount=type=secret,id=medusa_backend,env=MEDUSA_BACKEND_URL \
    --mount=type=secret,id=medusa_api_key,env=NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY \
    pnpm install --frozen-lockfile && \
    pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
EXPOSE 8000
CMD [ "pnpm", "start" ]