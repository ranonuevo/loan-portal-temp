import { STORAGE_KEY } from './constants'

export type AppData = {
  personalDetails?: Record<string, any>
  calculator?: Record<string, any>
  consent?: Record<string, any>
  [key: string]: any
}

export function getAppData(): AppData | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (err) {
    console.error('getAppData error', err)
    return null
  }
}

export function setAppData(data: AppData) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (err) {
    console.error('setAppData error', err)
  }
}

export function updateAppData(partial: Partial<AppData>): AppData | null {
  if (typeof window === 'undefined') return null
  try {
    const existing = getAppData() || {}
    const merged = { ...existing, ...partial }
    setAppData(merged)
    return merged
  } catch (err) {
    console.error('updateAppData error', err)
    return null
  }
}

export function clearAppData() {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (err) {
    console.error('clearAppData error', err)
  }
}
