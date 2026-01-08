# Deployment Guide

## Overview

This document provides instructions for deploying Cord-Fam-App to production
environments.

## Prerequisites

- Node.js 20+ installed
- MySQL 8+ database
- MongoDB 7+ database
- Server with sufficient resources (minimum 2GB RAM, 2 CPU cores)
- Domain name (optional but recommended)
- SSL certificate (Let's Encrypt recommended)

## Backend Deployment

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install MySQL
sudo apt install -y MySQL-server

# Install MongoDB
# Follow MongoDB installation guide for your OS

# Install Nginx (for reverse proxy)
sudo apt install -y nginx
```

### 2. Database Setup

#### MySQL

```bash
sudo mysql_secure_installation
MySQL -u root -p
```

```sql
CREATE DATABASE cordfam CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'cordfam'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON cordfam.* TO 'cordfam'@'localhost';
FLUSH PRIVILEGES;
```

#### MongoDB

```bash
mongosh
```

```javascript
use cordfam
db.createUser({
  user: "cordfam",
  pwd: "secure_password",
  roles: [{ role: "readWrite", db: "cordfam" }]
})
```

### 3. Application Deployment

```bash
# Clone repository
git clone <repository-url>
cd Cord-Fam-App

# Install dependencies
cd backend
npm install --production

# Set up environment variables
cp .env.example .env
# Edit .env with production values

# Run database migrations
npm run migrate:up

# Build application
npm run build

# Start with PM2
npm install -g pm2
pm2 start dist/index.js --name cordfam-backend
pm2 save
pm2 startup
```

### 4. Nginx Configuration

Create `/etc/nginx/sites-available/cordfam-api`:

```nginx
server {
    listen 80;
    server_name api.cordfam.app;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/cordfam-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. SSL Setup (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.cordfam.app
```

## Frontend Web Deployment

### Option 1: Static Hosting (Vercel/Netlify)

1. Connect repository to Vercel/Netlify
2. Set build command: `cd frontend/web && npm install && npm run build`
3. Set output directory: `frontend/web/dist`
4. Set environment variables (API URL)

### Option 2: Self-Hosted (Nginx)

```bash
cd frontend/web
npm install
npm run build

# Copy dist/ to server
scp -r dist/* user@server:/var/www/cordfam-app/
```

Nginx configuration:

```nginx
server {
    listen 80;
    server_name cordfam.app;
    root /var/www/cordfam-app;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## File Storage

### Local Storage (Development/Small Scale)

Ensure directory exists and has proper permissions:

```bash
mkdir -p /var/cordfam/storage
chown -R nodejs:nodejs /var/cordfam/storage
chmod -R 755 /var/cordfam/storage
```

### Cloud Storage (S3-Compatible)

Configure S3 credentials in `.env`:

````text
S3_BUCKET=cordfam-storage
S3_REGION=us-east-1
S3_ACCESS_KEY=...
S3_SECRET_KEY=...
```env

## Monitoring

### PM2 Monitoring

```bash
pm2 monit
pm2 logs cordfam-backend
````

### Log Rotation

Configure log rotation for application logs and PM2 logs.

## Backup Strategy

### Database Backups

#### MySQL

```bash
# Daily backup script
mysqldump -u cordfam -p cordfam > backup-$(date +%Y%m%d).sql
```

#### MongoDB

```bash
mongodump --db cordfam --out backup-$(date +%Y%m%d)
```

### File Storage Backups

```bash
tar -czf storage-backup-$(date +%Y%m%d).tar.gz /var/cordfam/storage
```

## Security Checklist

- [ ] HTTPS enabled (SSL certificate)
- [ ] Environment variables secured (not in code)
- [ ] Database credentials strong and unique
- [ ] Firewall configured (only necessary ports open)
- [ ] Regular security updates applied
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] File upload restrictions in place
- [ ] Regular backups scheduled
- [ ] Monitoring and alerting set up

## Scaling Considerations

### Horizontal Scaling

- Use load balancer (Nginx or cloud LB)
- Multiple backend instances
- Database replication (MySQL master-slave, MongoDB replica set)
- Shared file storage (S3 or NFS)

### Vertical Scaling

- Increase server resources (RAM, CPU)
- Database optimization
- Caching layer (Redis)

## Troubleshooting

### Backend Not Starting

1. Check logs: `pm2 logs cordfam-backend`
2. Verify environment variables
3. Check database connectivity
4. Verify port availability

### Database Connection Issues

1. Verify credentials in `.env`
2. Check database is running
3. Verify network connectivity
4. Check firewall rules

### File Upload Issues

1. Verify storage directory permissions
2. Check disk space
3. Verify file size limits

---

**Last Updated**: 2026-01-27
