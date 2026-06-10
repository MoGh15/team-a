import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5004/api/auth';

// Safe JSON.parse — never crashes on null or "undefined" string
const safeParse = (key) => {
  try {
    const val = localStorage.getItem(key);
    if (!val || val === 'undefined' || val === 'null') return null;
    return JSON.parse(val);
  } catch {
    return null;
  }
};

const useAuthStore = create((set) => ({
  user: safeParse('user'),
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });

      // Backend returns { token, admin } — not { token, user }
      const { token, admin } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(admin));

      set({ token, user: admin, isLoading: false, error: null });
      return true;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      set({ isLoading: false, error: message });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, error: null });
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;