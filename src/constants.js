export const ORIGINS = [
  { id: 'work', label: '仕事', color: '#6E8CA0' },
  { id: 'child', label: '子育て', color: '#C08B5C' },
  { id: 'self', label: '自分のこと', color: '#8A7CA8' },
  { id: 'body', label: '体調', color: '#7A9478' },
  { id: 'relationship', label: '人間関係', color: '#B08292' },
  { id: 'unknown', label: 'わからない', color: '#6A6E74' },
]

export function originColor(id) {
  return ORIGINS.find((o) => o.id === id)?.color ?? '#6A6E74'
}
