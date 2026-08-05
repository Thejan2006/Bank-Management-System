
import sqlite3
import os
from dotenv import load_dotenv


load_dotenv()

DB_NAME = os.getenv('DB_NAME', 'bank_management.db')

def create_tables():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # Create Users Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
    )
    ''')
    
    # Create Accounts Table
    # FIX: Changed the second 'id' to 'user_id' to link properly with users table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS accounts (  
        account_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        account_number TEXT UNIQUE NOT NULL,
        balance REAL NOT NULL DEFAULT 0.0,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    ''')
    
    # Create Transactions Table
    # FIX: Changed 'account_number' to TEXT to match the accounts table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS transactions (    
        transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_number TEXT NOT NULL,
        transaction_type TEXT NOT NULL,
        amount REAL NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (account_number) REFERENCES accounts (account_number)
    )
    ''')
        
    conn.commit()
    conn.close()
    # print("Database and all tables created successfully.")  


if __name__ == "__main__":
    create_tables()