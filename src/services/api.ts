import { 
  AuthResponse, 
  AuthUser, 
  LoginPayload, 
  SignupPayload, 
  ChallengeItem, 
  ChallengeCompletionPayload, 
  ChallengeCompletionResult, 
  EnvironmentalImpactSummary, 
  SchoolAnalyticsOverview 
} from './types';

const API_BASE = '/api';
const TOKEN_KEY = 'ecoquest_auth_token';

class ApiService {
  private getHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  public setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  // 1. AUTHENTICATION
  public auth = {
    login: async (payload: LoginPayload): Promise<AuthResponse> => {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({ error: 'Login failed' }));
        throw new Error(error.error || 'Authentication error');
      }
      const data: AuthResponse = await res.json();
      this.setToken(data.token);
      return data;
    },

    signup: async (payload: SignupPayload): Promise<AuthResponse> => {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({ error: 'Registration failed' }));
        throw new Error(error.error || 'Signup failed');
      }
      const data: AuthResponse = await res.json();
      this.setToken(data.token);
      return data;
    },

    getMe: async (): Promise<AuthUser> => {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: this.getHeaders(),
      });
      if (!res.ok) {
        throw new Error('Failed to retrieve user session');
      }
      const data = await res.json();
      return data.user;
    },

    logout: async (): Promise<void> => {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: this.getHeaders(),
      }).catch(() => {});
      this.removeToken();
    }
  };

  // 2. CHALLENGES API
  public challenges = {
    list: async (filters?: { category?: string; difficulty?: string }): Promise<ChallengeItem[]> => {
      const params = new URLSearchParams();
      if (filters?.category && filters.category !== 'All') params.append('category', filters.category);
      if (filters?.difficulty && filters.difficulty !== 'All') params.append('difficulty', filters.difficulty);

      const url = `${API_BASE}/challenges${params.toString() ? '?' + params.toString() : ''}`;
      const res = await fetch(url, { headers: this.getHeaders() });
      if (!res.ok) throw new Error('Failed to fetch challenges');
      const data = await res.json();
      return data.challenges || [];
    },

    get: async (id: string): Promise<ChallengeItem> => {
      const res = await fetch(`${API_BASE}/challenges/${id}`, { headers: this.getHeaders() });
      if (!res.ok) throw new Error('Challenge not found');
      const data = await res.json();
      return data.challenge;
    },

    complete: async (id: string, payload: ChallengeCompletionPayload): Promise<ChallengeCompletionResult> => {
      const res = await fetch(`${API_BASE}/challenges/${id}/complete`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete challenge');
      }
      return data.data;
    }
  };

  // 3. GAMIFICATION API
  public gamification = {
    getBadges: async () => {
      const res = await fetch(`${API_BASE}/gamification/badges`, { headers: this.getHeaders() });
      if (!res.ok) throw new Error('Failed to load badges');
      const data = await res.json();
      return data.badges;
    },

    getStudentLeaderboard: async (classId?: string) => {
      const url = `${API_BASE}/gamification/leaderboard/students${classId ? '?classId=' + classId : ''}`;
      const res = await fetch(url, { headers: this.getHeaders() });
      if (!res.ok) throw new Error('Failed to load student leaderboard');
      const data = await res.json();
      return data.leaderboard;
    },

    getClassLeaderboard: async () => {
      const res = await fetch(`${API_BASE}/gamification/leaderboard/classes`, { headers: this.getHeaders() });
      if (!res.ok) throw new Error('Failed to load class tournament standings');
      const data = await res.json();
      return data.classes;
    }
  };

  // 4. ENVIRONMENTAL IMPACT API
  public impact = {
    getStudentImpact: async (userId: string = 'u-4'): Promise<EnvironmentalImpactSummary> => {
      const res = await fetch(`${API_BASE}/impact/student/${userId}`, { headers: this.getHeaders() });
      if (!res.ok) throw new Error('Failed to load environmental impact audit');
      const data = await res.json();
      return data.impact;
    }
  };

  // 5. SCHOOL ANALYTICS API
  public analytics = {
    getOverview: async (): Promise<SchoolAnalyticsOverview> => {
      const res = await fetch(`${API_BASE}/analytics/overview`, { headers: this.getHeaders() });
      if (!res.ok) throw new Error('Failed to load school analytics overview');
      const data = await res.json();
      return data.analytics;
    }
  };
}

export const api = new ApiService();
export default api;
