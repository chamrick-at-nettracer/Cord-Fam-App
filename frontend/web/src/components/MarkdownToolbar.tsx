import { Box, IconButton, Tooltip } from '@mui/material';
import { FormatBold, FormatItalic, Code, StrikethroughS, Link } from '@mui/icons-material';

interface MarkdownToolbarProps {
  onInsert: (before: string, after: string) => void;
}

export default function MarkdownToolbar({ onInsert }: MarkdownToolbarProps) {
  const handleBold = () => onInsert('**', '**');
  const handleItalic = () => onInsert('_', '_');
  const handleCode = () => onInsert('`', '`');
  const handleStrikethrough = () => onInsert('~', '~');
  const handleLink = () => onInsert('[', '](url)');

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 0.5,
        p: 0.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Tooltip title="Bold" arrow>
        <IconButton size="small" onClick={handleBold}>
          <FormatBold fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Italic" arrow>
        <IconButton size="small" onClick={handleItalic}>
          <FormatItalic fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Code" arrow>
        <IconButton size="small" onClick={handleCode}>
          <Code fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Strikethrough" arrow>
        <IconButton size="small" onClick={handleStrikethrough}>
          <StrikethroughS fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Link" arrow>
        <IconButton size="small" onClick={handleLink}>
          <Link fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
