import sqlite3

conn = sqlite3.connect('bank_management.db')  # Connect to the database (or create it if it doesn't exist)
cursor = conn.cursor()
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
)
''')

conn.commit()  # Commit the changes

conn.close()  # Close the connection

print("Database and users table created successfully.")