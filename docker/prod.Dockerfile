FROM node:22-alpine AS base

# 1阶段构建
FROM base AS builder

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install --verbose --legacy-peer-deps

COPY . .

RUN npx prisma generate

RUN npm run build;

# 2阶段构建
FROM base AS runner

WORKDIR /app

COPY --from=builder /app/public ./public

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV NEXT_TELEMETRY_DISABLED=1

ENV TZ=Asia/Shanghai

COPY prisma ./prisma/
COPY docker/prod.startup.sh ./prod.startup.sh

RUN mkdir /static

# 当你有一个脚本文件（如 train.sh）并希望能够在终端中直接运行它时，你需要确保该文件具有执行权限。
# chmod +x filename 就可以实现
RUN chmod +x /app/prod.startup.sh

ENTRYPOINT ["sh", "/app/prod.startup.sh"]

# docker build . -f docker/prod.Dockerfile -t fengjin/notes
