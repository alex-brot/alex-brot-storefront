FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN --mount=type=secret,id=medusa_backend,target=/run/secrets/MEDUSA_BACKEND \
    --mount=type=secret,id=medusa_api_key,target=/run/secrets/MEDUSA_PUBLISHABLE_API_KEY \
    MEDUSA_BACKEND=$(cat /run/secrets/MEDUSA_BACKEND) \
    MEDUSA_PUBLISHABLE_API_KEY=$(cat /run/secrets/MEDUSA_PUBLISHABLE_API_KEY) \
    pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
EXPOSE 8000
CMD [ "pnpm", "start" ]