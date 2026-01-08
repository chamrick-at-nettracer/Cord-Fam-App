# Backend Development Setup

Complete guide for setting up and running the backend API server.

## Prerequisites

- Node.js 20+ LTS
- MySQL 8.0+
- MongoDB 7.0+
- npm (comes with Node.js)

## Installation

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages including:

- Fastify (web framework)
- TypeScript and type definitions
- Database drivers (MySQL2, MongoDB)
- Authentication libraries (JWT, bcrypt)
- Validation (Zod)
- Development tools (ESLint, Prettier, etc.)

### 3. Environment Configuration

Create `.env` file from example:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
NODE_ENV=development
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# MySQL Configuration
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=cordfam
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password

# MongoDB Configuration
MONGODB_URI=MongoDB://localhost:27017/cordfam

# File Storage
FILE_STORAGE_PATH=./storage
```

**Important**: Replace `your_mysql_password` with your actual MySQL root
password.

## Database Setup

### MySQL

1. Ensure MySQL is running
2. Create database and tables:

   ```bash
   MySQL -u root -p < ../scripts/init-database.sql
   ```

3. Verify database exists:

   ```bash
   MySQL -u root -p -e "USE cordfam; SHOW TABLES;"
   ```

   You should see: `users`, `channels`, `channel_members`, `projects`, `tasks`,
   `notebooks`

### MongoDB

1. Ensure MongoDB is running
2. Verify connection:

   ```bash
   mongosh --eval "db.adminCommand('ping')"
   ```

   MongoDB will automatically create the `cordfam` database on first connection.

## Running the Server

### Development Mode

```bash
npm run dev
```

This starts the server with hot-reload using `tsx watch`. Changes to TypeScript
files will automatically restart the server.

**Expected Output**:

```text
[timestamp] INFO: MySQL connected
[timestamp] INFO: MongoDB connected
[timestamp] INFO: Server listening on http://0.0.0.0:3000
```

### Production Mode

```bash
npm run build
npm start
```

This compiles TypeScript to JavaScript and runs the compiled code.

## Verifying Setup

### Health Check

Open `http://localhost:3000/health` in your browser or:

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok",
  "timestamp": "2026-01-27T..."
}
```

### Test Authentication Endpoint

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123"
  }'
```

Expected response:

```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGc..."
  }
}
```

## Project Structure

```sql
backend/
├── src/
│   ├── routes/          # API route definitions
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── repositories/    # Data access layer
│   ├── middleware/      # Express/Fastify middleware
│   ├── database/        # Database connection files
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript type definitions
│   ├── config.ts         # Configuration
│   └── index.ts          # Application entry point
├── tests/               # Test files
├── logs/                # Application logs (created at runtime)
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests (when implemented)

## API Endpoints

Once running, the API is available at `http://localhost:3000/api/v1`

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user

### Channels

- `GET /api/v1/channels` - List all channels
- `GET /api/v1/channels/:id` - Get channel by ID
- `POST /api/v1/channels` - Create new channel

### Messages

- `GET /api/v1/channels/:channelId/messages` - Get channel messages
- `POST /api/v1/channels/:channelId/messages` - Send message

### Health Check

- `GET /health` - Server health status

See `docs/tech-docs/API_DESIGN.md` for complete API documentation.

## Troubleshooting

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::3000`

**Solution**:

```bash
# Find process using port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process or change PORT in .env
```

### Database Connection Errors

**MySQL Error**: `Access denied for user`

- Verify `MYSQL_USER` and `MYSQL_PASSWORD` in `.env`
- Test connection: `MySQL -u root -p`
- Ensure database exists: `MySQL -u root -p -e "SHOW DATABASES;"`

**MongoDB Error**: `Connection refused`

- Verify MongoDB is running: `mongosh`
- Check `MONGODB_URI` in `.env`
- Ensure MongoDB service is started

### TypeScript Compilation Errors

**Error**: `Cannot find module` or type errors

- Run `npm install` to ensure all dependencies are installed
- Check `tsconfig.json` configuration
- Verify Node.js version: `node --version` (should be 20+)

### Module Not Found Errors

**Error**: `Cannot find module '@Fastify/...'`

- Run `npm install` in the `backend` directory
- Check `package.json` for correct dependencies
- Delete `node_modules` and `package-lock.json`, then `npm install`

## Development Tips

1. **Hot Reload**: The dev server automatically restarts on file changes
2. **Logging**: Check `backend/logs/` for application logs
3. **Debug Mode**: Set `DEBUG=*` environment variable for verbose logging
4. **Type Safety**: TypeScript strict mode is enabled - fix type errors before
   running
5. **Code Quality**: Pre-commit hooks will format and lint your code
   automatically

## Next Steps

- Read `docs/tech-docs/ARCHITECTURE.md` for system architecture
- Read `docs/tech-docs/API_DESIGN.md` for API documentation
- Check `docs/tasks/PROGRESS.md` for current tasks

---

**Last Updated**: 2026-01-27
