export const ORIGINS = [
  { id: 'work', label: '仕事', color: '#5B7A90' },
  { id: 'child', label: '子供', color: '#B37B45' },
  { id: 'home', label: '家のこと', color: '#8B8073' },
  { id: 'health', label: '自分の体・健康', color: '#6A8568' },
  { id: 'relationship', label: '人との関係', color: '#A06E80' },
  { id: 'future', label: '先のこと', color: '#6E7C9C' },
  { id: 'joy', label: '楽しみなこと', color: '#C09A4E' },
  { id: 'unknown', label: 'わからない', color: '#8A8F96' },
]

export const ACTIONS = [
  { id: 'walk', label: '歩いた' },
  { id: 'stretch', label: 'ストレッチ' },
  { id: 'sleep', label: 'よく寝た' },
  { id: 'alone', label: '一人の時間があった' },
  { id: 'create', label: 'ピアノ・絵・曲' },
]

export function originColor(id) {
  return ORIGINS.find((o) => o.id === id)?.color ?? '#8A8F96'
}
