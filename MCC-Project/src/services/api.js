const API_BASE_URL = 'http://localhost:9000';

// Auth endpoints
export const authAPI = {
  signUp: async (username, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  signIn: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Event endpoints
export const eventAPI = {
  getEvents: async (token) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}/event/`, {
      method: 'GET',
      headers: headers,
    });
    return response.json();
  },

  getEvent: async (eventId, token) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}/event/${eventId}`, {
      method: 'GET',
      headers: headers,
    });
    return response.json();
  },

  createEvent: async (title, description, date, location, token, user) => {
    const response = await fetch(`${API_BASE_URL}/event/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        date,
        location,
        userName: user.username,
        ownerId: user.id,
      }),
    });
    return response.json();
  },

  updateEvent: async (eventId, updates, token) => {
    const response = await fetch(`${API_BASE_URL}/event/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
    return response.json();
  },

  deleteEvent: async (eventId, token) => {
    const response = await fetch(`${API_BASE_URL}/event/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

// Helper functions
export const getToken = () => localStorage.getItem('token');
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
export const isAuthenticated = () => !!getToken();
