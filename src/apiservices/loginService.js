const BASE_URL = import.meta.env.VITE_API_BASE_URL

// ---------------------------------------------------------------------------
// Token storage
// ---------------------------------------------------------------------------

const KEYS = {
  ACCESS_TOKEN:  'callohm_access_token',
  REFRESH_TOKEN: 'callohm_refresh_token',
  EXPIRES_AT:    'callohm_token_expires_at',
}

export const tokenStorage = {
  save(data) {
    const expiresAt = Date.now() + data.expires_in * 1000
    localStorage.setItem(KEYS.ACCESS_TOKEN,  data.access_token)
    localStorage.setItem(KEYS.REFRESH_TOKEN, data.refresh_token)
    localStorage.setItem(KEYS.EXPIRES_AT,    String(expiresAt))
  },

  getAccessToken()  { return localStorage.getItem(KEYS.ACCESS_TOKEN)  },
  getRefreshToken() { return localStorage.getItem(KEYS.REFRESH_TOKEN) },

  isExpired() {
    const expiresAt = Number(localStorage.getItem(KEYS.EXPIRES_AT) ?? 0)
    return Date.now() >= expiresAt
  },

  clear() {
    Object.values(KEYS).forEach(key => localStorage.removeItem(key))
  },

  isLoggedIn() {
    return !!localStorage.getItem(KEYS.ACCESS_TOKEN)
  },
}

// ---------------------------------------------------------------------------
// Shared fetch helper
// ---------------------------------------------------------------------------

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`
  const res  = await fetch(url, {
    ...options,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const message = body.detail ?? body.message ?? (res.status === 429 ? 'Too many requests - please wait a moment and try again.' : `Request failed with status ${res.status}`)
    const error = new Error(message)
    error.status = res.status
    throw error
  }

  // 204 No Content - return null
  if (res.status === 204) return null

  return res.json()
}

// ---------------------------------------------------------------------------
// Auth endpoints
// ---------------------------------------------------------------------------

/**
 * POST /auth/login
 * Authenticates the user and stores tokens in localStorage.
 */
export async function login(email, password) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  tokenStorage.save(data)
  return data
}

/**
 * POST /auth/refresh
 * Exchanges the stored refresh token for a new access token.
 */
export async function refreshToken() {
  const storedRefreshToken = tokenStorage.getRefreshToken()
  if (!storedRefreshToken) {
    tokenStorage.clear()
    throw new Error('No refresh token available. Please log in again.')
  }

  try {
    const data = await request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: storedRefreshToken }),
    })
    tokenStorage.save(data)
    return data
  } catch (err) {
    // Only clear tokens when the refresh token is genuinely rejected (401/403).
    // For transient errors (429, 5xx, network) keep the session alive.
    if (err.status === 401 || err.status === 403) {
      tokenStorage.clear()
    }
    throw err
  }
}

/**
 * POST /auth/logout
 * Revokes the session on the server and clears local tokens.
 * Best-effort - local tokens are always cleared even if the server call fails.
 */
export async function logout() {
  const accessToken  = tokenStorage.getAccessToken()
  const refreshTokenValue = tokenStorage.getRefreshToken()

  if (accessToken && refreshTokenValue) {
    await request('/auth/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ refresh_token: refreshTokenValue }),
    }).catch(() => {
      // Server-side revocation is best-effort; always clear locally.
    })
  }

  tokenStorage.clear()
}

/**
 * GET /auth/me
 * Returns the profile of the currently authenticated user.
 */
export async function getMe() {
  const accessToken = tokenStorage.getAccessToken()
  if (!accessToken) {
    throw new Error('Not authenticated.')
  }

  return request('/auth/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  })
}
