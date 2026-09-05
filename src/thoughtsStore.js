import { DEFAULT_THOUGHTS } from './constants'

const KEY = 'journal-app:thoughts'

// 「今日思えたこと」の項目リストは本人が編集できる（SPEC-A.md セクション1④）
export function getThoughtsList() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULT_THOUGHTS
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0) return parsed
    return DEFAULT_THOUGHTS
  } catch {
    return DEFAULT_THOUGHTS
  }
}

export function saveThoughtsList(list) {
  localStorage.setItem(KEY, JSON.stringify(list))
}
