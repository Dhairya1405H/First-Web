Build a complete, responsive website called "EcoQuest", a gamified environmental education platform for schools (students aged 10-17). Create the project, install dependencies, run it locally, and test it in the browser before you finish.

GOAL
Turn sustainability into daily habits. Students complete eco-quests, earn XP and badges, compete as classes, and the school sees verified impact data.

TECH STACK
- Next.js (App Router) + TypeScript + Tailwind CSS
- Recharts for charts
- SQLite with Prisma for the database (easy to run locally)
- Simple email/password auth with 3 roles: student, teacher, admin
- Local file storage for uploaded proof images

PAGES
1. Landing page: a hero with an interactive demo where visitors can tap a quest, "submit a photo", and watch XP, a badge, the class leaderboard, and impact counters update. Below it: how verification works (3 steps), the three roles, a sample impact chart, and a login button.
2. Student app:
   - Dashboard: today's quests, streak, XP bar, level, badges
   - Quest library by category (Waste, Water, Energy, Plastic-Free, Plants, Transport)
   - Submit proof: photo upload OR a short activity log (for students without a camera)
   - Leaderboards: class vs class and school-wide, plus a team-goal progress bar
   - Profile: badge collection and personal impact
3. Teacher app:
   - Review queue with one-tap Approve / Reject and an optional comment
   - Create custom class quests
   - Class overview showing participation and inactive students
4. Admin dashboard:
   - Live metrics: kg waste diverted, litres water saved, saplings planted, kg CO2 avoided
   - Charts: impact over time, impact by category, class comparison
   - "Export green-audit report" as CSV, listing the conversion factors used for every metric
   - Sustainability target tracker

CORE LOGIC
- Quest submission flow: pending -> verified or rejected
- AI pre-check on photos: build it behind a function `verifySubmission()` that returns {result: pass | review | fail, confidence}. Mock it for now, and make it easy to swap in a real vision API later
- Clear passes are auto-verified. Low-confidence or high-value submissions (like planting a sapling) go to the teacher queue
- Anti-cheat: perceptual hash to detect duplicate photos, a daily cap per quest, and random teacher spot-checks
- XP ledger table, levels every 100 XP, streak tracking, and badge unlock rules (Zero-Waste Warrior, Water Saver, Tree Hugger, Energy Ninja, 7-Day Streak)
- Impact conversion factors stored in one config file with comments, so every dashboard number is traceable
- Delete proof photos after verification (child privacy)

DESIGN
- Friendly, bright, nature-inspired: sky-blue background, deep forest green, sunny yellow accents. Avoid a generic template look
- Rounded, playful display font (e.g. Fredoka) with a highly readable body font (e.g. Atkinson Hyperlegible)
- Large tap targets, high contrast, simple language, visible keyboard focus
- Mobile-first, with light and dark mode
- Subtle celebration animation when a badge unlocks, and respect prefers-reduced-motion

SEED DATA
1 school, 4 classes, 40 students, 1 teacher per class, 1 admin, 30 days of realistic submissions so every dashboard and chart looks populated on first run. Include demo logins for each role shown on the login page.

DELIVERABLES
- Working app running on localhost
- README with setup steps, demo logins, and the project structure
- Short notes on what is mocked (AI verification, storage) and what to replace for production

Before coding, show me a short plan and the folder structure. Then build page by page, and run the app to verify each flow works: submit -> verify -> XP/badge -> leaderboard -> dashboard update.