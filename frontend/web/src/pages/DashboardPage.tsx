import { useState, useEffect } from 'react';
import { useAuth } from '../store/AuthContext';
import { channelService } from '../services/channelService';
import { messageService } from '../services/messageService';
import type { Channel, Message } from '../types/api';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const DRAWER_WIDTH = 300;

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newChannelName, setNewChannelName] = useState('');
  const [showNewChannel, setShowNewChannel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadChannels();
  }, []);

  useEffect(() => {
    if (selectedChannel) {
      loadMessages(selectedChannel.id);
      const interval = setInterval(() => {
        loadMessages(selectedChannel.id);
      }, 2000); // Poll every 2 seconds
      return () => clearInterval(interval);
    }
  }, [selectedChannel]);

  const loadChannels = async () => {
    try {
      setLoading(true);
      const data = await channelService.getAllChannels();
      setChannels(data);
      if (data.length > 0 && !selectedChannel) {
        setSelectedChannel(data[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load channels');
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (channelId: number) => {
    try {
      const data = await messageService.getChannelMessages(channelId);
      setMessages(data);
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };

  const handleCreateChannel = async () => {
    if (!newChannelName.trim()) return;
    try {
      const channel = await channelService.createChannel(newChannelName);
      setChannels([...channels, channel]);
      setSelectedChannel(channel);
      setNewChannelName('');
      setShowNewChannel(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create channel');
    }
  };

  const handleSendMessage = async () => {
    if (!selectedChannel || !newMessage.trim()) return;
    try {
      setSending(true);
      await messageService.sendMessage(selectedChannel.id, newMessage);
      setNewMessage('');
      await loadMessages(selectedChannel.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cord-Fam-App
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            {user?.username}
          </Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            mt: 8,
          },
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2 }}>
          {showNewChannel ? (
            <Box>
              <TextField
                fullWidth
                size="small"
                label="Channel Name"
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateChannel();
                  }
                }}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="small" variant="contained" onClick={handleCreateChannel}>
                  Create
                </Button>
                <Button size="small" onClick={() => setShowNewChannel(false)}>
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Button
              fullWidth
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setShowNewChannel(true)}
            >
              New Channel
            </Button>
          )}
        </Box>
        <List>
          {channels.map((channel) => (
            <ListItem key={channel.id} disablePadding>
              <ListItemButton
                selected={selectedChannel?.id === channel.id}
                onClick={() => setSelectedChannel(channel)}
              >
                <ListItemText primary={channel.name} secondary={channel.description} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, display: 'flex', flexDirection: 'column' }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
            <CircularProgress />
          </Box>
        ) : selectedChannel ? (
          <>
            <Typography variant="h5" gutterBottom>
              {selectedChannel.name}
            </Typography>
            {selectedChannel.description && (
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedChannel.description}
              </Typography>
            )}

            <Paper
              sx={{
                flexGrow: 1,
                p: 2,
                mb: 2,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {messages.map((message) => (
                <Box key={message.id} sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    User {message.user_id} • {new Date(message.created_at).toLocaleString()}
                  </Typography>
                  <Typography variant="body1">{message.content}</Typography>
                </Box>
              ))}
            </Paper>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={sending}
              />
              <Button variant="contained" onClick={handleSendMessage} disabled={sending || !newMessage.trim()}>
                Send
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
            <Typography variant="h6" color="text.secondary">
              Select a channel to start chatting
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
