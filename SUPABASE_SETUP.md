# Supabase Database Setup for Gita Reflection App

## Step 1: Run SQL Script in Supabase

1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the entire content from `supabase-setup.sql` file
5. Click **Run** to execute the script

This will create:
- `chapters` table with 18 chapters of Bhagavad Gita
- `shlokas` table with sample verses (you can add more)
- `conversations` table for storing user reflection sessions

## Step 2: Verify Tables Were Created

After running the script, go to **Table Editor** and verify you see:
- `chapters` (18 rows)
- `shlokas` (5 sample rows - you can add more)
- `conversations` (empty, will populate as users use the app)

## Step 3: Add More Shlokas (Optional)

You can add more shlokas using this format in the SQL Editor:

```sql
INSERT INTO shlokas (chapter_id, verse_number, sanskrit, transliteration, translation, purport, word_meanings) VALUES
(chapter_number, verse_number, 'sanskrit_text', 'transliteration', 'english_translation', 'purport_text', 'word_meanings_json'::jsonb);
```

Example word_meanings JSON format:
```json
[
  {"sanskrit": "word", "english": "meaning"},
  {"sanskrit": "another", "english": "another meaning"}
]
```

## Step 4: Test Connection

Once the tables are created, restart the Replit app and it should automatically connect to your Supabase database instead of using memory storage.

## Database Schema

### chapters
- `id` (Primary Key)
- `chapter_number` (Integer)
- `title` (Text)
- `description` (Text)

### shlokas
- `id` (Primary Key)  
- `chapter_id` (Foreign Key to chapters)
- `verse_number` (Integer)
- `sanskrit` (Text)
- `transliteration` (Text)
- `translation` (Text)
- `purport` (Text)
- `word_meanings` (JSONB array)

### conversations
- `id` (Primary Key)
- `session_id` (Text)
- `messages` (JSONB array)
- `current_step` (Integer)
- `progress_percentage` (Integer)
- `selected_shloka_id` (Foreign Key to shlokas)
- `created_at` (Text)