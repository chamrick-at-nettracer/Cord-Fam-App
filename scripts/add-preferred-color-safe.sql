-- Add preferred_color column to users table (safe version - checks if column exists)
-- Run this to add the preferred_color column

USE cordfam;

-- Check if column exists, if not add it
SET @dbname = DATABASE();
SET @tablename = 'users';
SET @columnname = 'preferred_color';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (TABLE_SCHEMA = @dbname)
      AND (TABLE_NAME = @tablename)
      AND (COLUMN_NAME = @columnname)
  ) > 0,
  'SELECT 1', -- Column exists, do nothing
  CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' VARCHAR(7) DEFAULT NULL COMMENT ''Hex color code for user avatar (e.g., #87CEEB for sky blue)''')
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Set Cord's preferred color to sky blue (if not already set)
UPDATE users
SET preferred_color = '#87CEEB'
WHERE (username = 'cord' OR email LIKE '%cord%')
  AND (preferred_color IS NULL OR preferred_color = '');

-- Set Elizabeth's preferred color to emerald green (if not already set)
UPDATE users
SET preferred_color = '#50C878'
WHERE (username = 'elizabeth' OR email LIKE '%elizabeth%')
  AND (preferred_color IS NULL OR preferred_color = '');
