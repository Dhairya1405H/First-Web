# EcoQuest REST API Documentation

Comprehensive guide to the EcoQuest backend and REST API endpoints. EcoQuest gamifies K-12 sustainability education, measures verified environmental savings, and generates real-time school analytics.

---

## 🔐 Environment Variables

Ensure the following variables are defined in `.env` (or environment configuration):

| Variable | Scope | Description | Example |
| :--- | :--- | :--- | :--- |
| `VITE_API_URL` | Frontend & Server | Base URL for REST API endpoints | `/api` |
| `VITE_SUPABASE_URL` | Frontend & Server | Supabase project URL | `https://xyz.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Frontend | Public Anonymous Supabase API Key | `eyJhbG...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side ONLY | Elevated admin key for data audits | `eyJhbG...` |
| `JWT_SECRET` | Server-side ONLY | Secret key used to sign and verify bearer tokens | `ecoquest-secret-key-2026` |
| `PORT` | Server | Optional port for standalone server (default `3001` or Vite `3000`) | `3000` |

---

## 🛡️ Security & Authentication

- **Bearer Token Authorization**: Protected endpoints require an `Authorization: Bearer <TOKEN>` header.
- **Role-Based Access Control (RBAC)**: Supports `student`, `teacher`, and `admin` roles.
- **Anti-Cheat & Anti-Duplicate**: Challenges enforce a 12-hour per-quest cooldown to avoid multi-click point farming.
- **Privacy First**: Proof images undergo client-side sanitization and are purged post-verification for COPPA compliance.

---

## 📡 API Endpoints Reference

### 1. Authentication

#### `POST /api/auth/login`
Authenticates a student, teacher, or administrator.
- **Auth Required**: None (Public)
- **Request Body**:
```json
{
  "email": "aarav@greenfield.edu",
  "password": "securepassword123",
  "role": "student"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "token": "ecoquest_jwt_eyJzdWIiOiJ1LTQiLCJlbWFpbCI6ImFhcmF2QGdyZWV...",
  "user": {
    "id": "u-4",
    "email": "aarav@greenfield.edu",
    "name": "Aarav Sharma",
    "role": "student",
    "schoolId": "sch-1",
    "schoolName": "Greenfield International School",
    "className": "Class 9-B",
    "points": 2450,
    "xp": 2450,
    "streak": 12,
    "levelName": "Green Guardian",
    "levelNumber": 7
  }
}
```

#### `POST /api/auth/signup`
Registers a new user into a school cohort.
- **Auth Required**: None (Public)
- **Request Body**:
```json
{
  "name": "Ananya Mehta",
  "email": "ananya@greenfield.edu",
  "password": "securepassword123",
  "role": "student",
  "schoolName": "Greenfield International School",
  "className": "Class 9-B"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "token": "ecoquest_jwt_...",
  "user": { ... }
}
```

#### `GET /api/auth/me`
Retrieves current session and authenticated profile.
- **Auth Required**: `Bearer <TOKEN>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "user": { ... }
}
```

---

### 2. Challenges API

#### `GET /api/challenges`
Returns all active environmental quests with filter options.
- **Auth Required**: Optional
- **Query Parameters**:
  - `category` (e.g. `Plastic`, `Transport`, `Water`, `Energy`, `Waste`, `Biodiversity`)
  - `difficulty` (e.g. `Easy`, `Medium`, `Hard`)
- **Response (200 OK)**:
```json
{
  "success": true,
  "count": 6,
  "challenges": [
    {
      "id": "plastic-free-week",
      "title": "Plastic-Free Week",
      "category": "Plastic",
      "difficulty": "Medium",
      "duration": "7 days",
      "points": 100,
      "totalDays": 7,
      "progressDays": 5,
      "description": "Avoid all single-use plastic bottles, wrappers, and bags for 7 consecutive days.",
      "co2AvoidedKg": 3.2,
      "waterSavedL": 45,
      "wasteDivertedKg": 2.1,
      "plasticAvoidedItems": 14,
      "requiresProof": "both",
      "icon": "PackageX",
      "status": "active"
    }
  ]
}
```

#### `GET /api/challenges/:id`
Retrieves detailed challenge metadata and step-by-step instructions.
- **Response (200 OK)**:
```json
{
  "success": true,
  "challenge": { ... }
}
```

#### `POST /api/challenges/:id/complete`
Submits daily check-in or proof for a challenge.
- **Auth Required**: `Bearer <TOKEN>`
- **Request Body**:
```json
{
  "proofType": "photo",
  "notes": "Used stainless steel water flask and reusable tiffin.",
  "photoUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Verified! Awarded +25 Eco Points",
  "data": {
    "completionId": "comp-1728372",
    "challengeId": "plastic-free-week",
    "pointsAwarded": 25,
    "newTotalPoints": 2475,
    "newStreak": 13,
    "isVerified": true,
    "impactGenerated": {
      "co2AvoidedKg": 0.45,
      "waterSavedL": 6,
      "wasteDivertedKg": 0.3,
      "plasticAvoidedItems": 2,
      "isEstimated": true
    }
  }
}
```
- **Error (429 Too Many Requests - Duplicate Protection)**:
```json
{
  "error": "Challenge already checked in today! Streak recorded. Come back tomorrow.",
  "isDuplicatePrevented": true
}
```

---

### 3. Gamification API

#### `GET /api/gamification/badges`
Lists tiered mastery badges.
- **Response (200 OK)**:
```json
{
  "success": true,
  "badges": [
    { "id": "seed-starter", "name": "Seed Starter", "tier": "Bronze", "unlocked": true },
    { "id": "water-saver", "name": "Water Saver", "tier": "Silver", "unlocked": true },
    { "id": "plastic-warrior", "name": "Plastic Warrior", "tier": "Emerald", "unlocked": false, "progress": 42, "maxProgress": 50 }
  ]
}
```

#### `GET /api/gamification/leaderboard/students`
Returns student rankings with current user highlighted.
- **Response (200 OK)**:
```json
{
  "success": true,
  "leaderboard": [
    { "id": "u-1", "rank": 1, "name": "Meera Iyer", "points": 2640, "streak": 19, "co2SavedKg": 21.2 },
    { "id": "u-4", "rank": 4, "name": "Aarav Sharma", "points": 2450, "streak": 12, "co2SavedKg": 18.4, "isCurrentUser": true }
  ]
}
```

#### `GET /api/gamification/leaderboard/classes`
Returns inter-class tournament rankings.
- **Response (200 OK)**:
```json
{
  "success": true,
  "classes": [
    { "className": "Class 9-B", "points": 18450, "rank": 1, "co2SavedKg": 142.5 },
    { "className": "Class 9-A", "points": 16920, rank: 2, "co2SavedKg": 128.0 }
  ]
}
```

---

### 4. Environmental Impact API

#### `GET /api/impact/student/:id`
Calculates and returns certified student environmental audit numbers.
- **Important**: Environmental metrics are explicitly marked as `isEstimated: true` in accordance with transparent climate disclosure guidelines.
- **Response (200 OK)**:
```json
{
  "success": true,
  "impact": {
    "userId": "u-4",
    "studentName": "Aarav Sharma",
    "schoolName": "Greenfield International School",
    "isEstimated": true,
    "standardsNote": "Calculated using U.S. EPA greenhouse gas equivalency formulas and UK DEFRA coefficients. Values represent estimated impact rather than direct laboratory sensor measurements.",
    "co2AvoidedKg": 18.4,
    "waterSavedL": 620,
    "wasteDivertedKg": 14.0,
    "plasticAvoidedItems": 42,
    "greenCommutesCount": 28,
    "treesPlantedEquivalent": 0.9,
    "carKmEquivalent": 74,
    "breakdownByCategory": [
      { "category": "Low-Carbon Transport", "percentage": 38, "co2Kg": 7.0 },
      { "category": "Waste Diversion & Compost", "percentage": 26, "co2Kg": 4.8 }
    ]
  }
}
```

---

### 5. School Analytics API

#### `GET /api/analytics/overview`
Provides school administrators and principals with institutional analytics.
- **Auth Required**: `Bearer <TOKEN>` (Role: `admin` or `teacher`)
- **Response (200 OK)**:
```json
{
  "success": true,
  "analytics": {
    "schoolId": "sch-1",
    "schoolName": "Greenfield International School",
    "totalParticipatingStudents": 420,
    "totalCompletedChallenges": 18492,
    "totalPointsAccumulated": 342500,
    "attendanceRate": 94.6,
    "assignmentSubmissionRate": 86.0,
    "aggregateEnvironmentalImpact": {
      "totalCo2AvoidedKg": 14250.0,
      "totalWaterSavedL": 85000.0,
      "totalWasteDivertedKg": 9420.0,
      "totalPlasticsAvoided": 42500,
      "isEstimated": true
    },
    "classComparison": [
      { "className": "8-A", "studentsCount": 32, "points": 15800, "attendanceRate": 96.0 },
      { "className": "9-B", "studentsCount": 33, "points": 18450, "attendanceRate": 95.0 }
    ],
    "weeklyActivityTrends": [
      { "day": "Mon", "points": 4200, "challengesCompleted": 140, "co2Avoided": 84.5 }
    ]
  }
}
```

#### `GET /api/admin/system-status`
System health and administrative database verification endpoint.
- **Auth Required**: `Bearer <TOKEN>` (Role: `admin` only; returns `403 Forbidden` for students/teachers)
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Admin authorization verified",
  "schoolId": "sch-1",
  "database": "Connected (PostgreSQL / Supabase Schema Ready)",
  "timestamp": "2026-10-08T07:20:00.000Z"
}
```

---

## 🗄️ Database Setup (Supabase / PostgreSQL)

To set up the production database on Supabase:
1. Log in to [supabase.com](https://supabase.com) and create a project.
2. Open the **SQL Editor** in the Supabase Dashboard.
3. Paste and run the contents of [`supabase/schema.sql`](file:///c:/Users/nikhi/.antigravity-ide/supabase/schema.sql).
4. Copy your **Project URL** and **anon key** to `.env`:
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
