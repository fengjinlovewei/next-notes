FROM node:18-alpine AS base

FROM base AS builder

WORKDIR /app

COPY . .

RUN npm i --registry=https://registry.npmmirror.com;

RUN npx prisma generate

RUN npm run build;

FROM base AS runner

WORKDIR /app

COPY --from=builder /app/public ./public

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV NEXT_TELEMETRY_DISABLED 1

COPY prisma ./prisma/
COPY docker/prod.startup.sh ./prod.startup.sh

# 当你有一个脚本文件（如 train.sh）并希望能够在终端中直接运行它时，你需要确保该文件具有执行权限。
# chmod +x filename 就可以实现
RUN chmod +x /app/prod.startup.sh

ENTRYPOINT ["sh", "/app/prod.startup.sh"]
