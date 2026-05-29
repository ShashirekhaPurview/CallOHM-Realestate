import { tokenStorage, refreshToken } from './loginService'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

async function doFetch(path, token, options = {}) {
  return fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  })
}

function redirectToLogin() {
  window.location.href = '/login'
}

async function request(path, options = {}) {
  if (tokenStorage.isExpired()) {
    try { await refreshToken() } catch (err) { if (!tokenStorage.isLoggedIn()) redirectToLogin(); throw err }
  }

  let res = await doFetch(path, tokenStorage.getAccessToken(), options)

  if (res.status === 401) {
    try { await refreshToken() } catch (err) { if (!tokenStorage.isLoggedIn()) redirectToLogin(); throw err }
    res = await doFetch(path, tokenStorage.getAccessToken(), options)
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const message = body.detail ?? body.message ?? (res.status === 429 ? 'Too many requests - please wait a moment and try again.' : `Request failed with status ${res.status}`)
    const error = new Error(message)
    error.status = res.status
    throw error
  }

  if (res.status === 204) return null
  return res.json()
}

/**
 * GET /prompts/
 * Query: offset, limit, search (searches promptID, title, promptText)
 * Response: { total, offset, limit, items: [...] }
 */
export function getPrompts({ offset = 0, limit = 10, search } = {}) {
  const qs = new URLSearchParams({ offset, limit })
  if (search) qs.set('search', search)
  return request(`/prompts/?${qs}`)
}

/**
 * GET /prompts/search
 * At least one of prompt_id, title, prompt_text required.
 */
export function searchPrompts({ prompt_id, title, prompt_text, offset = 0, limit = 10 } = {}) {
  const qs = new URLSearchParams({ offset, limit })
  if (prompt_id)   qs.set('prompt_id',   prompt_id)
  if (title)       qs.set('title',       title)
  if (prompt_text) qs.set('prompt_text', prompt_text)
  return request(`/prompts/search?${qs}`)
}

/**
 * GET /prompts/{promptId}
 */
export function getPromptById(promptId) {
  return request(`/prompts/${promptId}`)
}

/**
 * POST /prompts/
 * Body: { title, promptText, initialSay, variables }
 */
export function createPrompt(data) {
  return request('/prompts/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

/**
 * PUT /prompts/{promptId}
 * Body: { title, promptText, initialSay, variables }
 */
export function updatePrompt(promptId, data) {
  return request(`/prompts/${promptId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

/**
 * DELETE /prompts/{promptId}
 */
export function deletePrompt(promptId) {
  return request(`/prompts/${promptId}`, { method: 'DELETE' })
}

/**
 * GET /prompts/defaults
 * Query: offset, limit, search
 * Response: { total, offset, limit, items: [...] }
 */
export function getDefaultPrompts({ offset = 0, limit = 10, search } = {}) {
  const qs = new URLSearchParams({ offset, limit })
  if (search) qs.set('search', search)
  return request(`/prompts/defaults?${qs}`)
}
