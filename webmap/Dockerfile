# Stage 1: Build the Angular app
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/webmap/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./src/assets/config.json /usr/share/nginx/html/assets/config.json

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
