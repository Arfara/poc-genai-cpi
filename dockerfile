# Menggunakan image Node.js versi terbaru (20.18.0) sebagai base image
FROM node:20.18.0-alpine AS builder

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

# Salin konfigurasi Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Salin hasil build ke direktori yang benar
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Jalankan Nginx saat container start
CMD ["nginx", "-g", "daemon off;"]
