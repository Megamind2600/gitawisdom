-- Supabase Database Setup for Gita Reflection App
-- Run this script in your Supabase SQL Editor

-- Create chapters table
CREATE TABLE IF NOT EXISTS chapters (
    id SERIAL PRIMARY KEY,
    chapter_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT
);

-- Create shlokas table
CREATE TABLE IF NOT EXISTS shlokas (
    id SERIAL PRIMARY KEY,
    chapter_id INTEGER NOT NULL REFERENCES chapters(id),
    verse_number INTEGER NOT NULL,
    sanskrit TEXT NOT NULL,
    transliteration TEXT NOT NULL,
    translation TEXT NOT NULL,
    purport TEXT,
    word_meanings JSONB
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
    id SERIAL PRIMARY KEY,
    session_id TEXT NOT NULL,
    messages JSONB NOT NULL DEFAULT '[]'::jsonb,
    current_step INTEGER DEFAULT 0,
    progress_percentage INTEGER DEFAULT 0,
    selected_shloka_id INTEGER REFERENCES shlokas(id),
    created_at TEXT NOT NULL
);

-- Insert sample chapters
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
(18, 'Conclusion—The Perfection of Renunciation', 'The ultimate instruction')
ON CONFLICT (chapter_number) DO NOTHING;

-- Insert sample shlokas from Prabhupada's Bhagavad Gita As It Is
INSERT INTO shlokas (chapter_id, verse_number, sanskrit, transliteration, translation, purport, word_meanings) VALUES
(2, 47, 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥', 'karmany evadhikaras te ma phalesu kadacana ma karma-phala-hetur bhur ma te sango ''stv akarmani', 'You have a right to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.', 'There are three considerations here: prescribed duties, capriciously work, and inaction. Prescribed duties are activities enjoined in terms of one''s acquired modes of material nature.', '[{"sanskrit":"karmani","english":"in prescribed duties"},{"sanskrit":"eva","english":"certainly"},{"sanskrit":"adhikarah","english":"right"},{"sanskrit":"te","english":"of you"},{"sanskrit":"ma","english":"never"},{"sanskrit":"phalesu","english":"in the fruits"},{"sanskrit":"kadacana","english":"at any time"},{"sanskrit":"ma","english":"never"},{"sanskrit":"karma-phala","english":"in the result of the work"},{"sanskrit":"hetuh","english":"cause"},{"sanskrit":"bhuh","english":"become"},{"sanskrit":"ma","english":"never"},{"sanskrit":"te","english":"of you"},{"sanskrit":"sangah","english":"attachment"},{"sanskrit":"astu","english":"be there"},{"sanskrit":"akarmani","english":"in not doing"}]'::jsonb),

(2, 20, 'न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः। अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥', 'na jayate mriyate va kadacin nayam bhutva bhavita va na bhuyah ajo nityah sasvato ''yam purano na hanyate hanyamane sarire', 'For the soul there is neither birth nor death. It is not slain when the body is slain.', 'Qualitatively, the small atomic fragmental part of the Supreme Spirit is one with the Supreme.', '[{"sanskrit":"na","english":"never"},{"sanskrit":"jayate","english":"takes birth"},{"sanskrit":"mriyate","english":"dies"},{"sanskrit":"va","english":"either"},{"sanskrit":"kadacit","english":"at any time"},{"sanskrit":"na","english":"never"},{"sanskrit":"ayam","english":"this"},{"sanskrit":"bhutva","english":"having come into being"},{"sanskrit":"bhavita","english":"will come to be"},{"sanskrit":"va","english":"or"},{"sanskrit":"na","english":"not"},{"sanskrit":"bhuyah","english":"or is again"},{"sanskrit":"ajah","english":"unborn"},{"sanskrit":"nityah","english":"eternal"},{"sanskrit":"sasvato","english":"permanent"},{"sanskrit":"ayam","english":"this"},{"sanskrit":"puranah","english":"the oldest"},{"sanskrit":"na","english":"never"},{"sanskrit":"hanyate","english":"is killed"},{"sanskrit":"hanyamane","english":"being killed"},{"sanskrit":"sarire","english":"the body"}]'::jsonb),

(2, 13, 'देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा। तथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति॥', 'dehino ''smin yatha dehe kaumaram yauvanam jara tatha dehantara-praptir dhiras tatra na muhyati', 'As the embodied soul continuously passes, in this body, from boyhood to youth to old age, the soul similarly passes into another body at death. A sober person is not bewildered by such a change.', 'Since every living entity is an individual soul, each is changing his body every moment, manifesting sometimes as a child, sometimes as a youth, and sometimes as an old man.', '[{"sanskrit":"dehinah","english":"of the embodied"},{"sanskrit":"asmin","english":"in this"},{"sanskrit":"yatha","english":"as"},{"sanskrit":"dehe","english":"in the body"},{"sanskrit":"kaumaram","english":"boyhood"},{"sanskrit":"yauvanam","english":"youth"},{"sanskrit":"jara","english":"old age"},{"sanskrit":"tatha","english":"similarly"},{"sanskrit":"dehantara","english":"of transference of the body"},{"sanskrit":"praptih","english":"achievement"},{"sanskrit":"dhirah","english":"the sober"},{"sanskrit":"tatra","english":"thereupon"},{"sanskrit":"na","english":"never"},{"sanskrit":"muhyati","english":"is deluded"}]'::jsonb),

(2, 62, 'ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते। सङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥', 'dhyayato visayan pumsah sangas tesupajayate sangat sanjayate kamah kamat krodho ''bhijayate', 'While contemplating the objects of the senses, a person develops attachment for them, and from such attachment lust develops, and from lust anger arises.', 'One who is not Krishna conscious is subjected to material desires while contemplating the objects of the senses.', '[{"sanskrit":"dhyayatah","english":"while contemplating"},{"sanskrit":"visayan","english":"sense objects"},{"sanskrit":"pumsah","english":"of a person"},{"sanskrit":"sangah","english":"attachment"},{"sanskrit":"tesu","english":"in the sense objects"},{"sanskrit":"upajayate","english":"develops"},{"sanskrit":"sangat","english":"from attachment"},{"sanskrit":"sanjayate","english":"develops"},{"sanskrit":"kamah","english":"desire"},{"sanskrit":"kamat","english":"from desire"},{"sanskrit":"krodhah","english":"anger"},{"sanskrit":"abhijayate","english":"becomes manifest"}]'::jsonb),

(2, 63, 'क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः। स्मृतिभ्रंशाद्बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥', 'krodhat bhavati sammohah sammohat smrti-vibhramah smrti-bhransat buddhi-naso buddhi-nasat pranasyati', 'From anger, complete delusion arises, and from delusion bewilderment of memory. When memory is bewildered, intelligence is lost, and when intelligence is lost one falls down again into the material pool.', 'Srila Prabhupada explains that when one is in complete delusion, one cannot think properly.', '[{"sanskrit":"krodhat","english":"from anger"},{"sanskrit":"bhavati","english":"takes place"},{"sanskrit":"sammohah","english":"perfect illusion"},{"sanskrit":"sammohat","english":"from illusion"},{"sanskrit":"smrti","english":"of memory"},{"sanskrit":"vibhramah","english":"bewilderment"},{"sanskrit":"smrti-bhransat","english":"after bewilderment of memory"},{"sanskrit":"buddhi-nasah","english":"loss of intelligence"},{"sanskrit":"buddhi-nasat","english":"and from loss of intelligence"},{"sanskrit":"pranasyati","english":"one falls down"}]'::jsonb)

ON CONFLICT (chapter_id, verse_number) DO NOTHING;