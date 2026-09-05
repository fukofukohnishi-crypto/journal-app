const DB_NAME = 'journal-app'
const DB_VERSION = 1
const STORE_NAME = 'records'

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        })
        store.createIndex('timestamp', 'timestamp')
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

// record: { timestamp, bodyScore, spaceScore, origins, originNotes, thoughts }
// bodyScore = 体の調子 (0-100), spaceScore = 心の余白 (0-100)
// origins = 頭にあること（複数選択の id 配列）
// originNotes = 選んだ頭にあることごとの一言（{ [originId]: string }、任意）
// thoughts = 今日思えたこと（選んだ時点の文言をそのまま保存する文字列配列、任意）
export async function addRecord(record) {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    tx.objectStore(STORE_NAME).add(record)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function getAllRecords() {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const req = tx.objectStore(STORE_NAME).index('timestamp').getAll()
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

// date: 表示したい日の Date（時刻部分は無視される）
export async function getRecordsForDate(date) {
  const start = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime()
  const end = start + 24 * 60 * 60 * 1000
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const range = IDBKeyRange.bound(start, end, false, true)
    const req = tx.objectStore(STORE_NAME).index('timestamp').getAll(range)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}
