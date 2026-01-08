import { Avatar, Box, Typography, Tooltip } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatDistanceToNow, format } from 'date-fns';
import type { MessageUser } from '../types/api';

interface MessageItemProps {
  user: MessageUser;
  content: string;
  createdAt: string;
}

export default function MessageItem({ user, content, createdAt }: MessageItemProps) {
  const displayName =
    user.first_name && user.last_name
      ? `${user.first_name} ${user.last_name}`
      : user.first_name || user.username;

  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Ensure color is valid hex format, fallback to default blue
  let avatarColor = '#1976d2'; // Default MUI blue
  if (user.preferred_color && /^#[0-9A-Fa-f]{6}$/.test(user.preferred_color)) {
    avatarColor = user.preferred_color;
  }

  const date = new Date(createdAt);
  const relativeTime = formatDistanceToNow(date, { addSuffix: true });
  const absoluteTime = format(date, 'MMM d, yyyy h:mm a');

  // Convert Slack-style ~text~ to markdown ~~text~~ for strikethrough
  const processedContent = content.replace(/~([^~]+)~/g, '~~$1~~');

  return (
    <Box sx={{ display: 'flex', mb: 2, px: 1 }}>
      <Avatar
        sx={{
          bgcolor: avatarColor,
          width: 36,
          height: 36,
          fontSize: '0.875rem',
          mr: 1.5,
          flexShrink: 0,
        }}
        src={user.avatar_url || undefined}
      >
        {!user.avatar_url && initials}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.5 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            {displayName}
          </Typography>
          <Tooltip title={absoluteTime} arrow>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontSize: '0.75rem',
              }}
            >
              {relativeTime}
            </Typography>
          </Tooltip>
        </Box>
        <Box
          sx={{
            '& p': {
              margin: 0,
              marginBottom: '0.5em',
              '&:last-child': {
                marginBottom: 0,
              },
            },
            '& ul, & ol': {
              margin: '0.5em 0',
              paddingLeft: '1.5em',
            },
            '& code': {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              padding: '0.125em 0.25em',
              borderRadius: '3px',
              fontSize: '0.9em',
              fontFamily: 'monospace',
            },
            '& pre': {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              padding: '0.75em',
              borderRadius: '4px',
              overflow: 'auto',
              '& code': {
                backgroundColor: 'transparent',
                padding: 0,
              },
            },
            '& blockquote': {
              borderLeft: '3px solid rgba(0, 0, 0, 0.2)',
              paddingLeft: '1em',
              margin: '0.5em 0',
              color: 'text.secondary',
            },
            '& a': {
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            '& strong': {
              fontWeight: 700,
            },
            '& em': {
              fontStyle: 'italic',
            },
            '& del': {
              textDecoration: 'line-through',
            },
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{processedContent}</ReactMarkdown>
        </Box>
      </Box>
    </Box>
  );
}
