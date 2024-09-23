# Step 1: Build the React app
FROM node:20 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run build

# Step 2: Set up Nginx to serve the build files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
# Nginx site-specific configuration 복사
COPY j11c205.p.ssafy.io /etc/nginx/sites-available/j11c205.p.ssafy.io
# sites-available의 설정을 sites-enabled로 링크
RUN ln -s /etc/nginx/sites-available/j11c205.p.ssafy.io /etc/nginx/sites-enabled/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]