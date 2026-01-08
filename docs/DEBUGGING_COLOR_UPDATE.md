# Debugging Preferred Color Update Issue

## Problem

User's preferred color (#993366) is not being saved/displayed correctly - shows
default blue instead.

## Changes Made

1. **Improved Color Validation** - Now shows error if color format is invalid
2. **Color Normalization** - Colors are normalized to uppercase for consistency
3. **Console Logging** - Added logging to track color updates through the flow

## Debugging Steps

### Step 1: Check Browser Console

1. Open browser DevTools (F12 or Cmd+Option+I)
2. Go to the Console tab
3. Try updating the color to #993366
4. Look for these console logs:
   - `Color picker changed to: #993366` (when using color picker)
   - `Text input changed to: #993366` (when typing in text field)
   - `Sending preferred_color update: #993366` (when submitting)
   - `Profile updated successfully. Updated user:` (shows full user object)
   - `Preferred color in response: #993366` (confirms what backend returned)

### Step 2: Check Network Tab

1. Open DevTools → Network tab
2. Update the color and click "Save Changes"
3. Find the `PUT /api/v1/auth/profile` request
4. Check the **Request Payload** - should show:

   ```json
   {
     "preferred_color": "#993366"
   }
   ```

5. Check the **Response** - should show:

   ```json
   {
     "success": true,
     "data": {
       "user": {
         "id": 1,
         "username": "cord",
         "preferred_color": "#993366",
         ...
       }
     }
   }
   ```

### Step 3: Check Database

Run this SQL query to verify the color was saved:

```sql
SELECT id, username, email, preferred_color FROM users WHERE username = 'cord';
```

Expected result should show `preferred_color = '#993366'` (or whatever you set).

### Step 4: Check Message Display

1. After updating color, go back to dashboard
2. Messages should refresh automatically (polls every 2 seconds)
3. Your avatar color should update within 2 seconds
4. If not, try:
   - Sending a new message (forces refresh)
   - Refreshing the page

## Common Issues

### Issue: Color validation error shows "Invalid format"

**Cause:** Color doesn't match `#RRGGBB` format (6 hex digits) **Fix:** Ensure
color is exactly 7 characters: `#` followed by 6 hex digits (0-9, A-F)

### Issue: Console shows "Sending preferred_color update" but color doesn't change

**Possible causes:**

1. Backend didn't save it (check database)
2. Backend returned old color (check Network response)
3. Messages are using cached user data (refresh page or send new message)

### Issue: Network request shows error 400

**Check:**

- Request payload format
- Backend logs for validation errors
- Database column exists (`preferred_color VARCHAR(7)`)

### Issue: Color updates but messages still show old color

**Cause:** Messages fetch user data from database, but might be cached **Fix:**

- Wait 2 seconds (auto-refresh)
- Send a new message
- Refresh the page

## Quick Test

1. Open Settings page
2. Change color to `#993366`
3. Open Console (F12)
4. Click "Save Changes"
5. Check console logs - should see:

   ```sql
   Sending preferred_color update: #993366
   Profile updated successfully. Updated user: {id: 1, username: "cord", preferred_color: "#993366", ...}
   Preferred color in response: #993366
   ```

6. Go to Dashboard
7. Check your avatar color in messages
8. If still wrong, check Network tab for the PUT request

## Backend Debugging

If frontend looks correct, check backend logs:

```bash
cd backend
npm run dev
```

Look for:

- SQL UPDATE query with `preferred_color = '#993366'`
- Any validation errors
- Response being sent back

## Still Not Working?

If after checking all the above it still doesn't work, provide:

1. Console logs (copy/paste)
2. Network request/response (screenshot or copy)
3. Database query result
4. Backend logs (if any errors)
