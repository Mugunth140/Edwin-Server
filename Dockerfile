FROM oven/bun:1.1.30 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN bun install --no-save

FROM oven/bun:1.1.30 AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM oven/bun:1.1.30 AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json /app/package-lock.json ./
RUN bun install --production --no-save
COPY --from=build /app/dist ./dist
EXPOSE 3001
CMD ["bun", "dist/main.js"]
