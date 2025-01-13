FROM node:18-alpine as dev-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:18-alpine as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:1.23.3 as pord
EXPOSE 80
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/course-manager-frontend/browser /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]