import Database from 'better-sqlite3'
import path from 'path'

const initializeDB = () => {
  const db = new Database(path.join(__dirname, 'data.db'))

  db.exec(
    'CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, nickname VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)'
  )
  return db
}

const db = initializeDB()

export default db
