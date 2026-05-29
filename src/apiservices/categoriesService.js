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

export function getCategories() {
  return request('/categories/')
}

export function createCategory(data) {
  return request('/categories/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function searchCategories(params = {}) {
  const qs = new URLSearchParams()
  if (params.category_id   != null) qs.set('category_id',   params.category_id)
  if (params.category_name != null) qs.set('category_name', params.category_name)
  const query = qs.toString()
  return request(`/categories/search${query ? `?${query}` : ''}`)
}

export function getCategoryById(id) {
  return request(`/categories/${id}`)
}

export function updateCategory(id, data) {
  return request(`/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function deleteCategory(id) {
  return request(`/categories/${id}`, { method: 'DELETE' })
}
