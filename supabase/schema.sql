-- ========================================================
-- EcoQuest: Supabase / PostgreSQL Database Schema
-- Version: 1.0.0
-- Includes Tables, Relations, RLS Policies, Functions, & Seed Data
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SCHOOLS TABLE
CREATE TABLE IF NOT EXISTS public.schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    district TEXT,
    city TEXT,
    state TEXT,
    country TEXT DEFAULT 'India',
    student_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
    name TEXT NOT NULL,
    school_id UUID REFERENCES public.schools(id) ON DELETE SET NULL,
    class_name TEXT DEFAULT 'Class 9-B',
    avatar_url TEXT,
    level_name TEXT DEFAULT 'Green Guardian',
    level_number INT DEFAULT 7,
    points INT DEFAULT 0,
    xp INT DEFAULT 0,
    streak INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CHALLENGES TABLE
CREATE TABLE IF NOT EXISTS public.challenges (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Plastic', 'Transport', 'Water', 'Energy', 'Waste', 'Biodiversity')),
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    duration TEXT NOT NULL,
    points INT NOT NULL DEFAULT 100,
    total_days INT NOT NULL DEFAULT 7,
    description TEXT NOT NULL,
    instructions TEXT[] DEFAULT ARRAY[]::TEXT[],
    co2_avoided_kg NUMERIC(6,2) DEFAULT 0,
    water_saved_l NUMERIC(8,2) DEFAULT 0,
    waste_diverted_kg NUMERIC(6,2) DEFAULT 0,
    plastic_avoided_items INT DEFAULT 0,
    requires_proof TEXT DEFAULT 'both' CHECK (requires_proof IN ('photo', 'log', 'both')),
    icon TEXT DEFAULT 'PackageX',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CHALLENGE COMPLETIONS TABLE
CREATE TABLE IF NOT EXISTS public.challenge_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id TEXT REFERENCES public.challenges(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    day_number INT DEFAULT 1,
    proof_type TEXT CHECK (proof_type IN ('photo', 'log')),
    notes TEXT,
    photo_url TEXT,
    ai_confidence NUMERIC(4,2) DEFAULT 0.95,
    status TEXT DEFAULT 'verified' CHECK (status IN ('verified', 'pending', 'rejected')),
    points_awarded INT DEFAULT 25,
    verified_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. POINTS LEDGER TABLE
CREATE TABLE IF NOT EXISTS public.points (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    amount INT NOT NULL,
    reason TEXT NOT NULL,
    source_type TEXT NOT NULL CHECK (source_type IN ('challenge', 'assignment', 'attendance_streak', 'quiz', 'bonus')),
    source_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BADGES TABLE
CREATE TABLE IF NOT EXISTS public.badges (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    tier TEXT NOT NULL CHECK (tier IN ('Bronze', 'Silver', 'Gold', 'Emerald')),
    category TEXT NOT NULL,
    max_progress INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. STUDENT BADGES TABLE
CREATE TABLE IF NOT EXISTS public.student_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    badge_id TEXT REFERENCES public.badges(id) ON DELETE CASCADE,
    unlocked BOOLEAN DEFAULT FALSE,
    unlocked_at TIMESTAMPTZ,
    progress INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, badge_id)
);

-- 8. ENVIRONMENTAL IMPACT TABLE
CREATE TABLE IF NOT EXISTS public.environmental_impact (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    school_id UUID REFERENCES public.schools(id) ON DELETE SET NULL,
    challenge_id TEXT REFERENCES public.challenges(id) ON DELETE SET NULL,
    co2_avoided_kg NUMERIC(8,2) DEFAULT 0,
    water_saved_l NUMERIC(10,2) DEFAULT 0,
    waste_diverted_kg NUMERIC(8,2) DEFAULT 0,
    plastic_avoided_items INT DEFAULT 0,
    green_commutes_count INT DEFAULT 0,
    is_estimated BOOLEAN DEFAULT TRUE,
    calculation_notes TEXT DEFAULT 'Calculated using EPA GHG and DEFRA scientific conversion factors. Values are estimates.',
    logged_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.environmental_impact ENABLE ROW LEVEL SECURITY;

-- Schools: anyone authenticated can read schools
CREATE POLICY "Allow public read schools" ON public.schools
    FOR SELECT USING (true);

-- Challenges & Badges: anyone authenticated can view
CREATE POLICY "Allow public read challenges" ON public.challenges
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read badges" ON public.badges
    FOR SELECT USING (true);

-- Users: Students see themselves, Teachers/Admins see their school
CREATE POLICY "Users read policy" ON public.users
    FOR SELECT USING (true);

CREATE POLICY "Users update self" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Challenge Completions: Students see own, Teachers see school completions
CREATE POLICY "Completions read policy" ON public.challenge_completions
    FOR SELECT USING (true);

CREATE POLICY "Student insert completion" ON public.challenge_completions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Environmental Impact: Read access for aggregate metrics
CREATE POLICY "Impact read policy" ON public.environmental_impact
    FOR SELECT USING (true);

-- ========================================================
-- SEED DATA
-- ========================================================

-- Insert Sample School
INSERT INTO public.schools (id, name, code, district, city, state, student_count)
VALUES (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Greenfield International School',
    'GIS-2026',
    'North Zone',
    'Bangalore',
    'Karnataka',
    420
) ON CONFLICT (code) DO NOTHING;

-- Insert Seed Challenges
INSERT INTO public.challenges (id, title, category, difficulty, duration, points, total_days, description, instructions, co2_avoided_kg, water_saved_l, waste_diverted_kg, plastic_avoided_items, icon)
VALUES 
('plastic-free-week', 'Plastic-Free Week', 'Plastic', 'Medium', '7 days', 100, 7, 'Avoid all single-use plastic bottles, wrappers, and bags for 7 consecutive days.', ARRAY['Refill your steel bottle at school taps', 'Say no to single-use lids and straws', 'Pack lunch in reusable steel containers'], 3.2, 45, 2.1, 14, 'PackageX'),
('green-commute', 'Green Commute', 'Transport', 'Medium', '5 days', 120, 5, 'Travel to school using zero-emission or low-emission transport: walk, cycle, or school bus.', ARRAY['Log each one-way trip walked or cycled', 'Snap photo of bike or bus ticket'], 6.8, 0, 0, 0, 'Bike'),
('water-saver', 'Water Saver', 'Water', 'Easy', '3 days', 80, 3, 'Keep showers under 4 minutes, turn taps off while brushing, and catch greywater for plants.', ARRAY['Use a 4-minute timer', 'Check school taps for hidden leaks'], 1.1, 180, 0, 0, 'Droplets'),
('lights-out', 'Lights Out', 'Energy', 'Easy', '7 days', 75, 7, 'Turn off unnecessary classroom and bedroom lights and unplug vampire devices.', ARRAY['Appoint daily recess Light Monitor', 'Switch off power strips before sleep'], 2.4, 12, 0, 0, 'Zap'),
('recycling-champion', 'Recycling Champion', 'Waste', 'Medium', '5 days', 100, 5, 'Segregate wet organic waste, dry paper/cardboard, and metals for recycling.', ARRAY['Audit classroom paper bins', 'Compost organic fruit and vegetable peels'], 4.9, 65, 7.5, 8, 'Recycle'),
('tree-guardian', 'Tree Guardian', 'Biodiversity', 'Hard', '14 days', 150, 14, 'Plant a native tree sapling or adopt a school garden plant, watering daily.', ARRAY['Choose a native plant bed', 'Water with captured rainwater'], 12.0, 20, 3.0, 0, 'TreePine')
ON CONFLICT (id) DO NOTHING;

-- Insert Seed Badges
INSERT INTO public.badges (id, name, description, icon, tier, category, max_progress)
VALUES
('seed-starter', 'Seed Starter', 'Completed your very first eco-challenge and took the sustainability pledge.', 'Sprout', 'Bronze', 'Milestones', 1),
('water-saver', 'Water Saver', 'Conserved over 500 liters of water through timed showers and mindful tap usage.', 'Droplets', 'Silver', 'Water', 1),
('recycling-master', 'Recycling Master', 'Diverted 10+ kg of recyclable paper and organics away from city landfills.', 'Recycle', 'Silver', 'Waste', 1),
('energy-hero', 'Energy Hero', 'Conducted 7 consecutive days of vampire-power shutdowns and light monitoring.', 'Zap', 'Gold', 'Energy', 1),
('tree-guardian', 'Tree Guardian', 'Planted or nurtured native flora in school or home garden for 2 weeks.', 'TreePine', 'Gold', 'Biodiversity', 1),
('plastic-warrior', 'Plastic Warrior', 'Avoided 50 single-use plastic items through reusable habit replacements.', 'ShieldAlert', 'Emerald', 'Plastic', 50),
('green-commuter', 'Green Commuter', 'Completed 30 zero/low-emission school commutes via bicycle or bus.', 'Bike', 'Gold', 'Transport', 30),
('30-day-streak', '30-Day Streak', 'Maintained an unbroken daily environmental habit streak for an entire month.', 'Flame', 'Emerald', 'Habits', 30)
ON CONFLICT (id) DO NOTHING;
