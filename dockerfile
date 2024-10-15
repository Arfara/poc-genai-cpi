# Menggunakan image Node.js versi terbaru (20.18.0) sebagai base image
FROM node:20.18.0-alpine

# Set working directory di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json ke container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh source code ke dalam container
COPY . .

# Build aplikasi untuk production
RUN npm run build

# Menggunakan Nginx untuk serve aplikasi React
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Jalankan Nginx saat container start
CMD ["nginx", "-g", "daemon off;"]