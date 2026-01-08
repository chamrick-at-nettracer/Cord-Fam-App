# Database Schema Design

## Overview

Cord-Fam-App uses a hybrid database approach:

- **MySQL**: Structured relational data
- **MongoDB**: Flexible document data
- **File System**: User-uploaded files

## MySQL Schema

### Users Table

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username)
);
```

### Projects Table

```sql
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_created_by (created_by)
);
```

### Tasks Table

```sql
CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('todo', 'in_progress', 'done') DEFAULT 'todo',
    assignee_id INT,
    created_by INT NOT NULL,
    due_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (assignee_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_project_id (project_id),
    INDEX idx_assignee_id (assignee_id),
    INDEX idx_status (status)
);
```

### Channels Table

```sql
CREATE TABLE channels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_by INT NOT NULL,
    is_private BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_created_by (created_by)
);
```

### Channel Members Table

```sql
CREATE TABLE channel_members (
    channel_id INT NOT NULL,
    user_id INT NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (channel_id, user_id),
    FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Notebooks Table

```sql
CREATE TABLE notebooks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_created_by (created_by)
);
```

## MongoDB Collections

### Messages Collection

```javascript
{
  _id: ObjectId,
  channel_id: Number, // Reference to MySQL channels.id
  user_id: Number,    // Reference to MySQL users.id
  content: String,
  attachments: [{
    file_id: String,
    filename: String,
    mime_type: String,
    size: Number
  }],
  edited_at: Date,
  created_at: Date,
  updated_at: Date
}
```

Indexes:

- `{ channel_id: 1, created_at: -1 }` - For channel message queries
- `{ user_id: 1, created_at: -1 }` - For user message queries

### Direct Messages Collection

```javascript
{
  _id: ObjectId,
  participants: [Number], // Array of user IDs
  messages: [{
    user_id: Number,
    content: String,
    attachments: [{
      file_id: String,
      filename: String,
      mime_type: String,
      size: Number
    }],
    edited_at: Date,
    created_at: Date
  }],
  created_at: Date,
  updated_at: Date
}
```

Indexes:

- `{ participants: 1 }` - For finding conversations

### Notes Collection

```javascript
{
  _id: ObjectId,
  notebook_id: Number, // Reference to MySQL notebooks.id
  user_id: Number,      // Reference to MySQL users.id
  title: String,
  content: String,      // Rich text content
  tags: [String],
  attachments: [{
    file_id: String,
    filename: String,
    mime_type: String
  }],
  created_at: Date,
  updated_at: Date
}
```

Indexes:

- `{ notebook_id: 1, created_at: -1 }` - For notebook queries
- `{ user_id: 1, created_at: -1 }` - For user queries
- `{ tags: 1 }` - For tag queries
- `{ title: "text", content: "text" }` - Full-text search

### Recipes Collection

```javascript
{
  _id: ObjectId,
  user_id: Number,     // Reference to MySQL users.id
  title: String,
  description: String,
  ingredients: [{
    name: String,
    amount: String,
    unit: String
  }],
  instructions: [String], // Array of instruction steps
  servings: Number,
  prep_time: Number,      // Minutes
  cook_time: Number,      // Minutes
  images: [{
    file_id: String,
    caption: String
  }],
  tags: [String],
  created_at: Date,
  updated_at: Date
}
```

Indexes:

- `{ user_id: 1, created_at: -1 }` - For user queries
- `{ tags: 1 }` - For tag queries
- `{ title: "text", description: "text" }` - Full-text search

### Task Comments Collection

````javascript
{
  _id: ObjectId,
  task_id: Number,     // Reference to MySQL tasks.id
  user_id: Number,     // Reference to MySQL users.id
  content: String,
  attachments: [{
    file_id: String,
    filename: String,
    mime_type: String
  }],
  edited_at: Date,
  created_at: Date,
  updated_at: Date
}
```text

Indexes:

- `{ task_id: 1, created_at: 1 }` - For task comment queries

## File System Structure

```text
storage/
├── uploads/
│   ├── avatars/
│   │   └── {user_id}/
│   ├── messages/
│   │   └── {message_id}/
│   ├── notes/
│   │   └── {note_id}/
│   ├── recipes/
│   │   └── {recipe_id}/
│   └── tasks/
│       └── {task_id}/
└── temp/
    └── {temporary_files}
````

## Data Relationships

### User Relationships

- User → Projects (created_by)
- User → Tasks (assignee_id, created_by)
- User → Channels (created_by, member via channel_members)
- User → Notebooks (created_by)
- User → Messages (user_id)
- User → Notes (user_id)
- User → Recipes (user_id)

### Project Relationships

- Project → Tasks (project_id)

### Channel Relationships

- Channel → Messages (channel_id)
- Channel → Users (via channel_members)

### Notebook Relationships

- Notebook → Notes (notebook_id)

### Task Relationships

- Task → Comments (task_id)

## Migration Strategy

### Initial Setup

1. Create MySQL database and tables
2. Create MongoDB database and collections
3. Set up indexes
4. Create file storage directories

### Future Migrations

- Use TypeORM migrations for MySQL
- Document MongoDB schema changes in this file
- Version control file structure changes

---

**Last Updated**: 2026-01-27
