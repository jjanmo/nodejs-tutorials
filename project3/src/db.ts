import Database from 'better-sqlite3'
import path from 'path'

const TABLE_NAME = 'user'

function initializeDB() {
  const db = new Database(path.join(__dirname, 'data.db'))

  const statement = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?")
  const result = statement.get(TABLE_NAME)

  if (!result) {
    db.exec(
      'CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, nickname VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)'
    )
  }
  return db
}

const db = initializeDB()

export default db
