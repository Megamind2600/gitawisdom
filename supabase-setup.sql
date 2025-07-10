-- Supabase Database Setup for Gita Reflection App
-- Run this script in your Supabase SQL Editor

-- Create conversations table (to work with your existing shloks table)
CREATE TABLE IF NOT EXISTS conversations (
    id SERIAL PRIMARY KEY,
    session_id TEXT NOT NULL,
    messages JSONB NOT NULL DEFAULT '[]'::jsonb,
    current_step INTEGER DEFAULT 0,
    progress_percentage INTEGER DEFAULT 0,
    selected_shlok_id INTEGER REFERENCES shloks(id),
    created_at TEXT NOT NULL
);

-- Create chapters table for additional metadata (optional)
CREATE TABLE IF NOT EXISTS chapters (
    id SERIAL PRIMARY KEY,
    chapter_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT
);

-- Insert sample chapters (optional - for metadata)
INSERT INTO chapters (chapter_number, title, description) VALUES
(1, 'Observing the Armies on the Battlefield of Kuruksetra', 'Arjuna''s dilemma and despondency on the battlefield'),
(2, 'Contents of the Gita Summarized', 'The eternal soul and the temporary body'),
(3, 'Karma-yoga', 'Action in knowledge of the Absolute'),
(4, 'Transcendental Knowledge', 'The approach of knowledge'),
(5, 'Karma-yoga—Action in Krishna Consciousness', 'The path of renunciation'),
(6, 'Dhyana-yoga', 'The practice of meditation'),
(7, 'Knowledge of the Absolute', 'The relative and the Absolute'),
(8, 'Attaining the Supreme', 'The eternal and the temporary'),
(9, 'The Most Confidential Knowledge', 'The ultimate goal of Vedic knowledge'),
(10, 'The Opulence of the Absolute', 'The divine manifestations'),
(11, 'The Universal Form', 'The cosmic manifestation'),
(12, 'Devotional Service', 'The path of devotion'),
(13, 'Nature, the Enjoyer, and Consciousness', 'The field of activities and the knower'),
(14, 'The Three Modes of Material Nature', 'The influence of the modes'),
(15, 'The Yoga of the Supreme Person', 'The ultimate person'),
(16, 'The Divine and Demoniac Natures', 'Two classes of beings'),
(17, 'The Divisions of Faith', 'The threefold faith'),
(18, 'Conclusion—The Perfection of Renunciation', 'The ultimate instruction');