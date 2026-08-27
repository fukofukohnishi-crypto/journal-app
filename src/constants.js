export const TYPES = [
  { id: 'work', label: '仕事', color: '#5b7fa6' },
  { id: 'child', label: '子供', color: '#c9824b' },
  { id: 'self', label: '自分', color: '#7a5ea8' },
  { id: 'body', label: '体', color: '#4f9573' },
  { id: 'unknown', label: 'わからない', color: '#8a8a8a' },
]

export const BODY_PARTS = [
  { id: 'shoulder', label: '肩' },
  { id: 'stomach', label: '胃' },
  { id: 'head', label: '頭' },
  { id: 'throat', label: '喉' },
  { id: 'breath', label: '呼吸' },
]

export function typeColor(id) {
  return TYPES.find((t) => t.id === id)?.color ?? '#9a9a9a'
}
