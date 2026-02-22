const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3002";

function getToken() {
  return localStorage.getItem("zerodha_token"); // or tradesphere_token if you renamed
}

export async function apiRequest(path, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

// Dashboard-specific APIs

export async function getHoldings() {
  return apiRequest("/allholdings");
}

export async function getPositions() {
  return apiRequest("/allpositions");
}

export async function getUser() {
  return apiRequest("/auth/me");
}

export default {
  apiRequest,
  getHoldings,
  getPositions,
  getUser,
};