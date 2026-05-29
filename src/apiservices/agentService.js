import { tokenStorage, refreshToken } from './loginService'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const AGENT_IDS = {
  default: 'AGENT_EC143AFB4AF6',
  company: 'AGENT_E6B07625E916',
}

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

// ---------------------------------------------------------------------------
// Resource lists (for dropdowns in create/edit forms)
// ---------------------------------------------------------------------------

export function getLLMs({ offset = 0, limit = 100, search } = {}) {
  const qs = new URLSearchParams({ offset, limit })
  if (search) qs.set('search', search)
  return request(`/llm-models/?${qs}`)
}

export function getVoices({ offset = 0, limit = 100, search, language_code, gender, model_provider } = {}) {
  const qs = new URLSearchParams({ offset, limit })
  if (search)         qs.set('search', search)
  if (language_code)  qs.set('language_code', language_code)
  if (gender)         qs.set('gender', gender)
  if (model_provider) qs.set('model_provider', model_provider)
  return request(`/voices/?${qs}`)
}

export function getSTTs({ offset = 0, limit = 100 } = {}) {
  return request(`/stt-models/?offset=${offset}&limit=${limit}`)
}

// ---------------------------------------------------------------------------
// Update agent
// PUT /agents/{agentId}
// ---------------------------------------------------------------------------

export function updateAgent(agentId, data) {
  return request(`/agents/${agentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

// ---------------------------------------------------------------------------
// Single agent + sub-resources
// ---------------------------------------------------------------------------

export function getAgentById(agentId)  { return request(`/agents/${agentId}`)       }
export function getLLM(llmId)          { return request(`/llm-models/${llmId}`)      }
export function getVoice(voiceId)      { return request(`/voices/${voiceId}`)        }
export function getPrompt(promptId)    { return request(`/prompts/${promptId}`)      }
export function getSTT(sttId)          { return request(`/stt-models/${sttId}`)      }
export function getCategory(catId)     { return request(`/categories/${catId}`)      }

export async function getFullAgentById(agentId) {
  const agent = await getAgentById(agentId)
  const [llm, voice, prompt, stt, category] = await Promise.allSettled([
    getLLM(agent.llmID),
    getVoice(agent.voiceID),
    getPrompt(agent.promptID),
    getSTT(agent.sttID),
    getCategory(agent.categoryID),
  ])
  return {
    agent,
    llm:      llm.status      === 'fulfilled' ? llm.value      : null,
    voice:    voice.status    === 'fulfilled' ? voice.value    : null,
    prompt:   prompt.status   === 'fulfilled' ? prompt.value   : null,
    stt:      stt.status      === 'fulfilled' ? stt.value      : null,
    category: category.status === 'fulfilled' ? category.value : { categoryID: agent.categoryID, categoryName: agent.categoryID },
  }
}

// ---------------------------------------------------------------------------
// Agent list (company agents, paginated)
// GET /agents/?offset=0&limit=10&is_active=true|false
// Response: { total, offset, limit, items: [...] }
// Each item already includes modelName, purviewVoiceName, sttName, promptTitle inline.
// ---------------------------------------------------------------------------

export function getAgents({ offset = 0, limit = 10, is_active } = {}) {
  const qs = new URLSearchParams({ offset, limit })
  if (is_active != null) qs.set('is_active', is_active)
  return request(`/agents/?${qs}`)
}

// ---------------------------------------------------------------------------
// Create agent
// POST /agents/
// company_id and user_id are taken from the JWT automatically.
// ---------------------------------------------------------------------------

export function createAgent(data) {
  return request('/agents/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      voicemail_detection_enabled: false,
      voicemail_action: 'hang_up',
      voicemail_message: '',
      transfer_enabled: false,
      transfer_destinations: [],
      transfer_agents: [],
      llm_settings: {},
      stt_settings: {},
      tts_settings: {},
      audio_quality: 'hd',
      ...data,
    }),
  })
}

// ---------------------------------------------------------------------------
// Soft delete - moves to recycle bin, retained for 30 days
// DELETE /agents/{agentId}
// ---------------------------------------------------------------------------

export function deleteAgent(agentId) {
  return request(`/agents/${agentId}`, { method: 'DELETE' })
}

// ---------------------------------------------------------------------------
// Permanent delete
// DELETE /agents/{agentId}/permanent
// ---------------------------------------------------------------------------

export function permanentDeleteAgent(agentId) {
  return request(`/agents/${agentId}/permanent`, { method: 'DELETE' })
}

// ---------------------------------------------------------------------------
// Recycle bin - list soft-deleted agents
// GET /agents/trash?offset=0&limit=10
// ---------------------------------------------------------------------------

export function getTrashAgents({ offset = 0, limit = 10 } = {}) {
  return request(`/agents/trash?offset=${offset}&limit=${limit}`)
}

// ---------------------------------------------------------------------------
// Restore from recycle bin
// POST /agents/{agentId}/restore
// ---------------------------------------------------------------------------

export function restoreAgent(agentId) {
  return request(`/agents/${agentId}/restore`, { method: 'POST' })
}

// ---------------------------------------------------------------------------
// Chat with agent over SSE
// POST /agents/{agentId}/chat
// Body: { message, conversation_id? }
// SSE events: session | delta | done | error
// Pass conversation_id on follow-up messages to maintain context.
// ---------------------------------------------------------------------------

export async function chatAgent(agentId, message, conversationId, onDelta, onDone, onError) {
  if (tokenStorage.isExpired()) {
    try { await refreshToken() } catch (err) { if (!tokenStorage.isLoggedIn()) redirectToLogin(); throw err }
  }

  const token = tokenStorage.getAccessToken()
  const body = conversationId ? { message, conversation_id: conversationId } : { message }

  const res = await fetch(`${BASE_URL}/agents/${agentId}/chat`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}))
    onError?.(errBody.detail ?? `Request failed: ${res.status}`)
    return null
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let sessionConvId = conversationId
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() // keep incomplete trailing line

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        try {
          const event = JSON.parse(line.slice(6))
          if (event.type === 'session') {
            sessionConvId = event.conversation_id
          } else if (event.type === 'delta') {
            onDelta?.(event.text ?? '')
          } else if (event.type === 'done') {
            onDone?.(sessionConvId)
            return sessionConvId
          } else if (event.type === 'error') {
            onError?.(event.detail)
            return sessionConvId
          }
        } catch { /* skip malformed lines */ }
      }
    }
  } finally {
    reader.releaseLock()
  }

  onDone?.(sessionConvId)
  return sessionConvId
}

// ---------------------------------------------------------------------------
// LiveKit voice preview session
// POST /preview/livekit/session
// Body: { agent_id }
// Response: { url, token, room_name, session_id, expires_in }
// Use livekit-client SDK: import { Room, RoomEvent } from 'livekit-client'
//   await room.connect(url, token, { autoSubscribe: true })
//   room.disconnect() to end
// ---------------------------------------------------------------------------

export function livekitSession(agentId) {
  return request('/preview/livekit/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agent_id: agentId }),
  })
}
