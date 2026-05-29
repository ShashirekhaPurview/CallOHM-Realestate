import { tokenStorage, refreshToken } from './loginService'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// ---------------------------------------------------------------------------
// Authenticated fetch helpers
// ---------------------------------------------------------------------------

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
  return res.json()
}

// ---------------------------------------------------------------------------
// Public endpoints (no auth)
// ---------------------------------------------------------------------------

/**
 * GET /contacts/country-codes
 * Returns: { total, countryCodes: [{ dialCode, name, isoCode, minLength, maxLength }] }
 */
export async function getCountryCodes() {
  const res = await fetch(`${BASE_URL}/contacts/country-codes`, {
    headers: { accept: 'application/json' },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const message = body.detail ?? body.message ?? (res.status === 429 ? 'Too many requests - please wait a moment and try again.' : `Request failed with status ${res.status}`)
    const error = new Error(message)
    error.status = res.status
    throw error
  }
  return res.json()
}

// ---------------------------------------------------------------------------
// Authenticated endpoints
// ---------------------------------------------------------------------------

/**
 * POST /contacts
 * body: { contactName, countryCode, phoneNumber, categoryID }
 */
export function createContact(data) {
  return request('/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

/**
 * GET /contacts?category_id=X&limit=10&offset=0
 * Returns: { total, limit, offset, contacts: [...] }
 */
export function getContacts(categoryId, limit = 10, offset = 0) {
  const params = new URLSearchParams({ category_id: categoryId, limit, offset })
  return request(`/contacts?${params}`)
}

/**
 * PUT /contacts/{id}
 * body: { customerID, contactName, countryCode, phoneNumber, categoryID }
 */
export function updateContact(customerId, data) {
  return request(`/contacts/${customerId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

/**
 * DELETE /contacts/{id}
 */
export function deleteContact(customerId) {
  return request(`/contacts/${customerId}`, { method: 'DELETE' })
}

/**
 * GET /contacts/admin?category_id=X&user_id=Y&limit=10&offset=0
 */
export function getContactsAdmin(categoryId, userId, limit = 10, offset = 0) {
  const params = new URLSearchParams({ category_id: categoryId, user_id: userId, limit, offset })
  return request(`/contacts/admin?${params}`)
}

/**
 * DELETE /contacts/phone/{phone}?country_code=X&category_id=Y
 * params: optional { country_code, category_id }
 */
export function deleteContactByPhone(phone, params = {}) {
  const qs = new URLSearchParams(params)
  const query = qs.toString() ? `?${qs}` : ''
  return request(`/contacts/phone/${encodeURIComponent(phone)}${query}`, { method: 'DELETE' })
}

/**
 * GET /contacts/search?category_id=X&phone_number=X&name=X&size=X
 * params: any of { category_id, phone_number, name, size }
 */
export function searchContacts(params = {}) {
  const qs = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ''))
  )
  return request(`/contacts/search?${qs}`)
}

/**
 * GET /contacts/template?category_id=X&format=excel
 * Returns a file blob. Returns { blob, filename }.
 */
export async function downloadTemplate(categoryId, format = 'excel') {
  if (tokenStorage.isExpired()) {
    try { await refreshToken() } catch (err) { if (!tokenStorage.isLoggedIn()) redirectToLogin(); throw err }
  }

  const params = new URLSearchParams({ category_id: categoryId, format })
  let token = tokenStorage.getAccessToken()
  let res = await fetch(`${BASE_URL}/contacts/template?${params}`, {
    headers: { accept: '*/*', Authorization: `Bearer ${token}` },
  })

  if (res.status === 401) {
    try { await refreshToken() } catch (err) { if (!tokenStorage.isLoggedIn()) redirectToLogin(); throw err }
    token = tokenStorage.getAccessToken()
    res = await fetch(`${BASE_URL}/contacts/template?${params}`, {
      headers: { accept: '*/*', Authorization: `Bearer ${token}` },
    })
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const message = body.detail ?? body.message ?? (res.status === 429 ? 'Too many requests - please wait a moment and try again.' : `Request failed with status ${res.status}`)
    const error = new Error(message)
    error.status = res.status
    throw error
  }

  const blob = await res.blob()
  const ext = format === 'csv' ? 'csv' : 'xlsx'
  const filename = `contacts-template.${ext}`
  return { blob, filename }
}

/**
 * POST /contacts/upload?category_id=X
 * Uses FormData with key 'file'. Returns upload summary JSON.
 */
export async function uploadContacts(categoryId, file) {
  if (tokenStorage.isExpired()) {
    try { await refreshToken() } catch (err) { if (!tokenStorage.isLoggedIn()) redirectToLogin(); throw err }
  }

  const formData = new FormData()
  formData.append('file', file)

  const params = new URLSearchParams({ category_id: categoryId })
  let token = tokenStorage.getAccessToken()

  let res = await fetch(`${BASE_URL}/contacts/upload?${params}`, {
    method: 'POST',
    headers: { accept: 'application/json', Authorization: `Bearer ${token}` },
    body: formData,
  })

  if (res.status === 401) {
    try { await refreshToken() } catch (err) { if (!tokenStorage.isLoggedIn()) redirectToLogin(); throw err }
    token = tokenStorage.getAccessToken()
    res = await fetch(`${BASE_URL}/contacts/upload?${params}`, {
      method: 'POST',
      headers: { accept: 'application/json', Authorization: `Bearer ${token}` },
      body: formData,
    })
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const message = body.detail ?? body.message ?? (res.status === 429 ? 'Too many requests - please wait a moment and try again.' : `Request failed with status ${res.status}`)
    const error = new Error(message)
    error.status = res.status
    throw error
  }
  return res.json()
}
