import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Import markdown content - in a real app, these would be loaded from files
const GETTING_STARTED = `# Getting Started with Cord-Fam-App

Welcome to Cord-Fam-App! This guide will help you get started with using the family collaboration platform.

## What is Cord-Fam-App?

Cord-Fam-App is a family collaboration platform that combines:
- **Communication**: Slack-like messaging and channels
- **Task Management**: Simplified JIRA-like task tracking
- **Note-Taking**: Evernote-like note organization

## Creating Your Account

1. Navigate to the registration page
2. Enter your email address
3. Choose a username (3-50 characters)
4. Create a secure password (minimum 6 characters)
5. Optionally add your first and last name
6. Click "Register"

## Logging In

1. Enter your email address
2. Enter your password
3. Click "Login"

You'll be automatically logged in and redirected to the dashboard.

## Dashboard Overview

The dashboard is your main workspace where you can:
- View and join channels
- Send and receive messages
- Manage your profile settings

## Channels

Channels are conversation spaces where family members can communicate.

### Joining a Channel

- Public channels are automatically available to all users
- Click on a channel name in the sidebar to join and view messages

### Creating a Channel

1. Click the "+" button (if available)
2. Enter a channel name
3. Optionally add a description
4. Choose if it should be private
5. Click "Create"

## Messaging

### Sending Messages

1. Select a channel from the sidebar
2. Type your message in the input box at the bottom
3. Use the formatting toolbar for rich text:
   - **Bold**: Click the **B** button or use \`**text**\`
   - *Italic*: Click the *I* button or use \`*text*\`
   - \`Code\`: Click the code button or use backticks
   - ~~Strikethrough~~: Click the strikethrough button or use \`~~text~~\`
   - Links: Click the link button or use \`[text](url)\`
4. Press Enter or click Send

### Message Formatting

Messages support Markdown formatting:
- **Bold text**: \`**bold**\`
- *Italic text*: \`*italic*\`
- \`Inline code\`: \`\` \`code\` \`\`
- ~~Strikethrough~~: \`~~strikethrough~~\`
- [Links](url): \`[text](url)\`
- Bullet lists: \`- item\`
- Numbered lists: \`1. item\`

## Profile Settings

Access your profile settings by clicking the Settings icon (⚙️) in the top right.

### Updating Your Profile

1. Click the Settings icon
2. Update any of the following:
   - Username
   - First Name
   - Last Name
   - Preferred Avatar Color (hex color code)
3. Click "Save Changes"

### Theme Settings

Toggle between dark and light mode using the switch in Settings.

## Tips and Best Practices

- Use channels to organize conversations by topic
- Use markdown formatting to make your messages more readable
- Set a preferred color to make your avatar stand out
- Keep your profile information up to date

## Need Help?

If you encounter any issues or have questions:
- Check this documentation
- Contact your family administrator
- Review the API documentation at \`/api-docs\` (for developers)

---

*This documentation is a work in progress and will be updated as features are added.*`;

const MESSAGING = `# Messaging Guide

## Overview

Messaging in Cord-Fam-App works similar to Slack, allowing you to communicate with family members in organized channels.

## Sending Messages

### Basic Messaging

1. Select a channel from the sidebar
2. Type your message in the input field at the bottom
3. Press Enter or click the Send button

### Rich Text Formatting

Use the formatting toolbar or Markdown syntax to format your messages:

- **Bold**: \`**text**\` or use the **B** button
- *Italic*: \`*text*\` or use the *I* button
- \`Code\`: \`\` \`code\` \`\` or use the code button
- ~~Strikethrough~~: \`~~text~~\` or use the strikethrough button
- [Links](url): \`[text](url)\` or use the link button

### Message Display

Messages are displayed with:
- User avatar (with initials fallback)
- Username
- Timestamp (relative time, hover for absolute time)
- Formatted message content

## Message Features

*More features coming soon:*
- File attachments
- Emoji support
- Message reactions
- Message editing
- Message deletion

---

*This documentation is a work in progress.*`;

const CHANNELS = `# Channels Guide

## Overview

Channels are conversation spaces where family members can communicate about specific topics.

## Channel Types

### Public Channels

- Visible to all family members
- Automatically joined when you access them
- Anyone can view messages

### Private Channels

- Only visible to invited members
- Requires invitation to join
- Messages are only visible to members

## Managing Channels

### Creating a Channel

1. Click the "+" button (if available in the UI)
2. Enter a channel name (required)
3. Add an optional description
4. Choose if the channel should be private
5. Click "Create"

### Joining a Channel

- Public channels: Simply click on the channel name
- Private channels: You must be invited by a channel member

### Viewing Channel Messages

Click on a channel name in the sidebar to view all messages in that channel.

## Best Practices

- Use descriptive channel names
- Keep channels focused on specific topics
- Use private channels for sensitive family discussions

---

*This documentation is a work in progress.*`;

const DOCS = [
  { id: 'getting-started', title: 'Getting Started', content: GETTING_STARTED },
  { id: 'messaging', title: 'Messaging', content: MESSAGING },
  { id: 'channels', title: 'Channels', content: CHANNELS },
];

export default function HelpPage() {
  const navigate = useNavigate();
  const [selectedDoc, setSelectedDoc] = useState<string>('getting-started');

  const currentDoc = DOCS.find((doc) => doc.id === selectedDoc) || DOCS[0];

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Help & Documentation
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            Back to Dashboard
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Paper
          sx={{
            width: 250,
            flexShrink: 0,
            borderRadius: 0,
            borderRight: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Documentation
            </Typography>
          </Box>
          <Divider />
          <List>
            {DOCS.map((doc) => (
              <ListItem key={doc.id} disablePadding>
                <ListItemButton
                  selected={selectedDoc === doc.id}
                  onClick={() => setSelectedDoc(doc.id)}
                >
                  <ListItemText primary={doc.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 4,
          }}
        >
          <Paper sx={{ p: 4, maxWidth: 900, mx: 'auto' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentDoc.content}</ReactMarkdown>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
