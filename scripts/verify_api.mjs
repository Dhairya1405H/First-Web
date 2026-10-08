// Runtime API Verification Test Suite for EcoQuest
const BASE_URL = 'http://localhost:3000/api';

async function runTests() {
  const results = [];
  console.log('🧪 Starting EcoQuest Live API Runtime Verification Suite...\n');

  function record(name, endpoint, method, expectedStatus, actualStatus, pass, details) {
    results.push({ name, endpoint, method, expectedStatus, actualStatus, pass, details });
    const mark = pass ? '✅ PASS' : '❌ FAIL';
    console.log(`${mark} [${method} ${endpoint}] - Status: ${actualStatus} (Expected: ${expectedStatus}) | ${name}`);
    if (details) console.log(`   └─ ${details}`);
  }

  try {
    // 1. POST /api/auth/login with valid student credentials
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'aarav@greenfield.edu', password: 'password123' })
    });
    const loginData = await loginRes.json();
    const studentToken = loginData.token;

    let jwtClaims = null;
    let jwtDecodedValid = false;
    let noSecretInResponse = true;

    if (studentToken && studentToken.includes('.')) {
      const parts = studentToken.split('.');
      if (parts.length === 3) {
        const payloadStr = Buffer.from(parts[1], 'base64url').toString('utf-8');
        jwtClaims = JSON.parse(payloadStr);
        jwtDecodedValid = jwtClaims.sub === 'u-4' && jwtClaims.role === 'student' && jwtClaims.email === 'aarav@greenfield.edu';
      }
    }

    const responseStr = JSON.stringify(loginData);
    noSecretInResponse = !responseStr.includes('ecoquest-dev-secret-key-2026') && !responseStr.includes('JWT_SECRET');

    record(
      'Login Valid Student Credentials & Signed JWT generation',
      '/api/auth/login',
      'POST',
      200,
      loginRes.status,
      loginRes.status === 200 && Boolean(studentToken) && jwtDecodedValid && noSecretInResponse,
      `Token issued. Claims: sub=${jwtClaims?.sub}, role=${jwtClaims?.role}, email=${jwtClaims?.email}. Secret leaked: ${!noSecretInResponse}`
    );

    // 2. POST /api/auth/login with INVALID credentials
    const invalidLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'aarav@greenfield.edu', password: 'wrongpassword' })
    });
    record(
      'Reject Invalid Credentials',
      '/api/auth/login',
      'POST',
      401,
      invalidLoginRes.status,
      invalidLoginRes.status === 401,
      'Invalid password returned 401 Unauthorized'
    );

    // 3. GET /api/auth/me UNHEALTHY / UNAUTHENTICATED
    const unauthMeRes = await fetch(`${BASE_URL}/auth/me`);
    record(
      'Reject Unauthenticated Request to /auth/me',
      '/api/auth/me',
      'GET',
      401,
      unauthMeRes.status,
      unauthMeRes.status === 401,
      'Missing Bearer token rejected with 401 Unauthorized'
    );

    // 4. GET /api/auth/me with VALID Bearer token
    const authMeRes = await fetch(`${BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${studentToken}` }
    });
    const authMeData = await authMeRes.json();
    const user = authMeData.user;
    const isStudentProfile = user && user.id === 'u-4' && user.role === 'student' && user.name === 'Aarav Sharma';

    record(
      'Authenticated Student Profile & Role details',
      '/api/auth/me',
      'GET',
      200,
      authMeRes.status,
      authMeRes.status === 200 && isStudentProfile,
      `User: ${user?.name}, Role: ${user?.role}, School: ${user?.schoolName}, Class: ${user?.className}`
    );

    // 5. GET /api/auth/me with TAMPERED signature
    const tamperedToken = studentToken.slice(0, -6) + 'abc123';
    const tamperedRes = await fetch(`${BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${tamperedToken}` }
    });
    record(
      'Reject Tampered Signature JWT',
      '/api/auth/me',
      'GET',
      401,
      tamperedRes.status,
      tamperedRes.status === 401,
      'Cryptographic HMAC signature validation failed as expected (401)'
    );

    // 6. GET /api/auth/me with EXPIRED JWT
    // Craft expired JWT with exp in the past
    const headerB64 = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const expiredPayload = Buffer.from(JSON.stringify({
      sub: 'u-4',
      email: 'aarav@greenfield.edu',
      role: 'student',
      exp: Math.floor(Date.now() / 1000) - 3600
    })).toString('base64url');
    const crypto = await import('crypto');
    const expiredSig = crypto.createHmac('sha256', 'ecoquest-dev-secret-key-2026').update(`${headerB64}.${expiredPayload}`).digest('base64url');
    const expiredToken = `${headerB64}.${expiredPayload}.${expiredSig}`;

    const expiredRes = await fetch(`${BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${expiredToken}` }
    });
    record(
      'Reject Expired JWT',
      '/api/auth/me',
      'GET',
      401,
      expiredRes.status,
      expiredRes.status === 401,
      'Expired token rejected with 401 Unauthorized'
    );

    // 7. GET /api/challenges
    const challengesRes = await fetch(`${BASE_URL}/challenges`, {
      headers: { 'Authorization': `Bearer ${studentToken}` }
    });
    const challengesData = await challengesRes.json();
    const challenges = challengesData.challenges || [];
    const firstCh = challenges[0];
    const hasGamification = firstCh && typeof firstCh.points === 'number' && firstCh.difficulty;
    const hasEnvironmentalMetrics = firstCh && typeof firstCh.co2AvoidedKg === 'number' && typeof firstCh.waterSavedL === 'number';

    record(
      'List Sustainability Challenges with Gamification & Environmental Metrics',
      '/api/challenges',
      'GET',
      200,
      challengesRes.status,
      challengesRes.status === 200 && challenges.length > 0 && hasGamification && hasEnvironmentalMetrics,
      `Found ${challenges.length} challenges. Sample: "${firstCh?.title}", Points: ${firstCh?.points}, CO2: ${firstCh?.co2AvoidedKg}kg, Water: ${firstCh?.waterSavedL}L`
    );

    // 8. GET /api/analytics/overview (UNAUTHENTICATED)
    const unauthAnalyticsRes = await fetch(`${BASE_URL}/analytics/overview`);
    record(
      'Protect School Analytics Endpoint from Unauthenticated Access',
      '/api/analytics/overview',
      'GET',
      401,
      unauthAnalyticsRes.status,
      unauthAnalyticsRes.status === 401,
      'Unauthenticated request blocked (401)'
    );

    // 9. GET /api/analytics/overview (AUTHENTICATED)
    const authAnalyticsRes = await fetch(`${BASE_URL}/analytics/overview`, {
      headers: { 'Authorization': `Bearer ${studentToken}` }
    });
    const authAnalyticsData = await authAnalyticsRes.json();
    const analytics = authAnalyticsData.analytics;
    const hasAggregateImpact = analytics && analytics.aggregateEnvironmentalImpact && analytics.aggregateEnvironmentalImpact.isEstimated === true;
    const hasStats = analytics && analytics.totalParticipatingStudents > 0 && analytics.totalCompletedChallenges > 0;

    record(
      'Fetch School Analytics with Environmental Impact & Gamification Aggregates',
      '/api/analytics/overview',
      'GET',
      200,
      authAnalyticsRes.status,
      authAnalyticsRes.status === 200 && hasAggregateImpact && hasStats,
      `School: ${analytics?.schoolName}, Students: ${analytics?.totalParticipatingStudents}, Total CO2: ${analytics?.aggregateEnvironmentalImpact?.totalCo2AvoidedKg}kg (Estimated: ${analytics?.aggregateEnvironmentalImpact?.isEstimated})`
    );

    // 10. Role-Based Access Control: Student attempting Admin endpoint
    const studentAdminRes = await fetch(`${BASE_URL}/admin/system-status`, {
      headers: { 'Authorization': `Bearer ${studentToken}` }
    });
    record(
      'RBAC: Student Access to Admin Endpoint Forbidden (403)',
      '/api/admin/system-status',
      'GET',
      403,
      studentAdminRes.status,
      studentAdminRes.status === 403,
      'Student role correctly restricted from admin endpoint with HTTP 403 Forbidden'
    );

    // 11. Login as Admin
    const adminLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@greenfield.edu', password: 'password123' })
    });
    const adminLoginData = await adminLoginRes.json();
    const adminToken = adminLoginData.token;

    // 12. Admin accessing Admin endpoint
    const adminAccessRes = await fetch(`${BASE_URL}/admin/system-status`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    record(
      'RBAC: Admin Access to Admin Endpoint Granted (200)',
      '/api/admin/system-status',
      'GET',
      200,
      adminAccessRes.status,
      adminAccessRes.status === 200,
      'Admin role granted access to administrative endpoint'
    );

    // 13. POST /api/challenges/:id/complete (Student Challenge Completion & Cooldown Verification)
    const completeRes = await fetch(`${BASE_URL}/challenges/plastic-free-week/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${studentToken}`
      },
      body: JSON.stringify({
        proofType: 'photo',
        notes: 'Reusable bottle used during lunch break'
      })
    });
    const completeData = await completeRes.json();
    // It should either return 200 (if not completed today) or 429 (if duplicate cooldown active)
    const completionAllowedOrCooldown = completeRes.status === 200 || completeRes.status === 429;
    record(
      'Challenge Completion & Anti-Duplicate Cooldown Protection',
      '/api/challenges/plastic-free-week/complete',
      'POST',
      '200 or 429',
      completeRes.status,
      completionAllowedOrCooldown,
      completeRes.status === 429 ? `Duplicate check passed: ${completeData.error}` : `Completion verified! Points: ${completeData.data?.pointsAwarded}`
    );

    // 14. CORS headers check
    const corsHeaders = {
      origin: challengesRes.headers.get('access-control-allow-origin'),
      methods: challengesRes.headers.get('access-control-allow-methods')
    };
    record(
      'CORS Configuration for Local Development',
      '/api/challenges',
      'GET (Headers)',
      '*',
      corsHeaders.origin || 'missing',
      corsHeaders.origin === '*',
      `Allow-Origin: ${corsHeaders.origin}, Allow-Methods: ${corsHeaders.methods}`
    );

    console.log('\n=============================================');
    const passedCount = results.filter(r => r.pass).length;
    console.log(`Summary: ${passedCount}/${results.length} tests passed successfully.`);
    console.log('=============================================\n');

  } catch (err) {
    console.error('Test execution failed with error:', err);
  }
}

runTests();
