import sqlite3 from 'sqlite3';



const db = new sqlite3.Database('mydatabase.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the database.');
    }
});

const createTableSQL = `
    CREATE TABLE IF NOT EXISTS FormData (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      checkbox INTEGER NOT NULL
    )
`;

db.serialize(() => {
    db.run(createTableSQL, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table "FormData" created successfully.');
        }
    });
});

export default db;
