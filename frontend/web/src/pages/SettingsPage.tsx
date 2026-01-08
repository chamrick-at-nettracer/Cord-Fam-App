import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { useTheme } from '../store/ThemeContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material';
import { Brightness4, Brightness7, ArrowBack } from '@mui/icons-material';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const { mode, toggleMode } = useTheme();
  const [username, setUsername] = useState(user?.username || '');
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [preferredColor, setPreferredColor] = useState(user?.preferred_color || '#1976d2');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const updates: {
        username?: string;
        first_name?: string;
        last_name?: string;
        preferred_color?: string | null;
      } = {};

      if (username.trim()) {
        updates.username = username.trim();
      }
      if (firstName.trim()) {
        updates.first_name = firstName.trim();
      }
      if (lastName.trim()) {
        updates.last_name = lastName.trim();
      }
      // Normalize and validate preferred_color
      // Color picker returns uppercase, but normalize to ensure consistency
      const normalizedColor = preferredColor.trim().toUpperCase();

      if (normalizedColor && /^#[0-9A-F]{6}$/.test(normalizedColor)) {
        updates.preferred_color = normalizedColor;
      } else if (normalizedColor === '' || normalizedColor === '#') {
        updates.preferred_color = null;
      } else {
        // Invalid color format - show error instead of silently ignoring
        setError(
          `Invalid color format: "${preferredColor}". Please use a 6-digit hex color (e.g., #993366)`
        );
        setLoading(false);
        return;
      }

      await updateProfile(updates);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to update profile. Make sure the backend server is running.';
      setError(errorMessage);
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Appearance
        </Typography>
        <FormControlLabel
          control={<Switch checked={mode === 'dark'} onChange={toggleMode} color="primary" />}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              <span>Dark Mode</span>
            </Box>
          }
        />
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Profile
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            value={user?.email || ''}
            margin="normal"
            disabled
            helperText="Email cannot be changed"
          />

          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
            inputProps={{ minLength: 3, maxLength: 50 }}
          />

          <TextField
            fullWidth
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            margin="normal"
          />

          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              Preferred Avatar Color
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <input
                type="color"
                value={preferredColor}
                onChange={(e) => {
                  setPreferredColor(e.target.value.toUpperCase());
                }}
                style={{
                  width: '60px',
                  height: '40px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              />
              <TextField
                size="small"
                label="Hex Color"
                value={preferredColor}
                onChange={(e) => {
                  setPreferredColor(e.target.value.toUpperCase());
                }}
                inputProps={{ pattern: '^#[0-9A-F]{6}$', maxLength: 7 }}
                helperText={
                  preferredColor && !/^#[0-9A-F]{6}$/.test(preferredColor) ? 'Invalid format' : ''
                }
                error={preferredColor ? !/^#[0-9A-F]{6}$/.test(preferredColor) : false}
                sx={{ width: '120px' }}
              />
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              This color will be used for your avatar background
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Back to Dashboard
            </Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
