-- Add preferred_color column to users table
-- Run this after init-database.sql
USE cordfam;
ALTER TABLE users
ADD COLUMN preferred_color VARCHAR(7) DEFAULT NULL COMMENT 'Hex color code for user avatar (e.g., #87CEEB for sky blue)';
-- Set Cord's preferred color to sky blue
UPDATE users
SET preferred_color = '#87CEEB'
WHERE username = 'cord'
  OR email LIKE '%cord%';
-- Set Elizabeth's preferred color to emerald green
UPDATE users
SET preferred_color = '#50C878'
WHERE username = 'elizabeth'
  OR email LIKE '%elizabeth%';
