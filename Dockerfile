FROM node:20-alpine

WORKDIR /app

# 의존성만 먼저 복사 → 캐시 극대화
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm install --no-audit --no-fund

# 나머지 소스 복사
COPY . .

# 윈도우/도커 파일변경 감지용
ENV CHOKIDAR_USEPOLLING=true

# Vite dev 서버 포트
EXPOSE 3000
# Vite가 컨테이너 외부에서 접근되도록 0.0.0.0 바인딩
CMD ["npm","run","dev","--","--host","0.0.0.0","--port","3000"]