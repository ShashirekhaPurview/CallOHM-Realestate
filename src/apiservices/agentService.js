import { tokenStorage, refreshToken } from './loginService'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const AGENT_IDS = {
  default: 'AGENT_EC143AFB4AF6',
  company: 'AGENT_E6B07625E916',
}

async function doFetch(path, token) {
  return fetch(`${BASE_URL}${path}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

async function request(path) {
  // Proactively refresh if we already know the token is expired
  if (tokenStorage.isExpired()) {
    await refreshToken()
  }

  let res = await doFetch(path, tokenStorage.getAccessToken())

  // Reactive refresh: token was rejected by the server - try once more
  if (res.status === 401) {
    await refreshToken()
    res = await doFetch(path, tokenStorage.getAccessToken())
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const message = body.detail ?? body.message ?? `Request failed with status ${res.status}`
    const error = new Error(message)
    error.status = res.status
    throw error
  }
  return res.json()
}

export function getAgentById(agentId)  { return request(`/agents/${agentId}`)       }
export function getLLM(llmId)          { return request(`/llm-models/${llmId}`)      }
export function getVoice(voiceId)      { return request(`/voices/${voiceId}`)         }
export function getPrompt(promptId)    { return request(`/prompts/${promptId}`)       }
export function getSTT(sttId)          { return request(`/stt-models/${sttId}`)       }
export function getCategory(catId)     { return request(`/categories/${catId}`)       }

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
