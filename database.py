import hashlib
import sqlite3
import os
from dotenv import load_dotenv
import random

load_dotenv()

DB_NAME = os.getenv('DB_NAME', 'bank_management.db')



def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def create_user(name, pin, email):
    pin = hash_password(pin)
    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", (name, pin, email))
        conn.commit()
        print(f"User '{name}' created successfully.")
    except sqlite3.IntegrityError:
        print("Error: Username or Email already exists!")
    finally:
        conn.close()

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

def login_user(username, password):
    hashed_password = hash_password(password)
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT id, username FROM users WHERE username = ? AND password = ?", (username, hashed_password))
    user = cursor.fetchone()
    conn.close()
    
    if user:
        print(f"User '{username}' logged in successfully.")
        return user[0]  # Return the user ID
    else:
        print("Invalid username or password.")
        return False

# FIX: Changed 'id' parameter to 'user_id' to avoid shadowing Python's built-in id() function
def create_account(user_id, initial_deposit):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # Generate a unique account number
    account_number = str(random.randint(1000000000, 9999999999))
    
    # FIX: Update the INSERT query to use 'user_id' instead of 'id'
    cursor.execute("INSERT INTO accounts (user_id, account_number, balance) VALUES (?, ?, ?)", (user_id, account_number, initial_deposit))
    
    conn.commit()
    conn.close()
    
    print(f"Account '{account_number}' created successfully with initial deposit of {initial_deposit}.")    
    
    
    
def get_balance(user_id):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # get user account number and balance
    cursor.execute("SELECT account_number, balance FROM accounts WHERE user_id = ?", (user_id,))
    account = cursor.fetchone()
    
    conn.close()
    return account  #if have account (account_number, balance) then return  if not None

def deposit_money(user_id, amount):
    # look have any account for this user
    account = get_balance(user_id)
    
    if not account:
        print("You don't have an account yet. Please create one first.")
        return False
        
    account_number, current_balance = account
    new_balance = current_balance + amount  # new balnce make
    
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    try:
       
        cursor.execute("UPDATE accounts SET balance = ? WHERE account_number = ?", (new_balance, account_number))
        
        
        cursor.execute("INSERT INTO transactions (account_number, transaction_type, amount) VALUES (?, 'Deposit', ?)", (account_number, amount))
        
        conn.commit()
        print(f"Successfully deposited Rs. {amount}. New Balance is: Rs. {new_balance}")
        
    except sqlite3.Error as e:
        print(f"Error during deposit: {e}")
    finally:
        conn.close()    
    
    
def withdraw_money(user_id, amount):
    account = get_balance(user_id)
    if not account:
        print("You don't have an account yet. Please create one first.")
        return False
    account_number, current_balance = account
    if amount <= current_balance:
        new_balance = current_balance - amount
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        try:
            cursor.execute("UPDATE accounts SET balance = ? WHERE account_number = ?", (new_balance, account_number))
            cursor.execute("INSERT INTO transactions (account_number, transaction_type, amount) VALUES (?, 'Withdraw', ?)", (account_number, amount))
            conn.commit()
            print(f"Successfully withdrew Rs. {amount}. New Balance is: Rs. {new_balance}")
        except sqlite3.Error as e:
            print(f"Error during withdrawal: {e}")
        finally:
            conn.close()
            
            
def get_transactions_history(user_id):     
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    #  using sql join get all details about transactions for the user  
    query = '''
        SELECT t.timestamp, t.transaction_type, t.amount 
        FROM transactions t
        JOIN accounts a ON t.account_number = a.account_number
        WHERE a.user_id = ?
        ORDER BY t.timestamp DESC
    '''        
    try:
        cursor.execute(query, (user_id,))
        transactions = cursor.fetchall() # make list of all transactions for this user
        return transactions  
    except sqlite3.Error as e:
        print(f"Error fetching transaction history: {e}")
        return None 
    finally:
        conn.close()
        
        
        
        
def  transfer_money(user_id,receiver_account_number, amount):        
    # Check if sender has sufficient balance
    sender_account = get_balance(user_id)
    if not sender_account:
        print("You don't have an account yet. Please create one first.")
        return False
   
    
    sender_account_number, sender_balance = sender_account
    
    if sender_account_number == receiver_account_number:
            print("You cannot transfer money to your own account.")
            return False
    
    #chnge: Check if sender has sufficient balance
    if amount > sender_balance:
        print("Insufficient balance! Your current balance is Rs.", sender_balance)
        return False

    # start database transaction to ensure atomicity
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    
    try:
        cursor.execute("SELECT account_number, balance FROM accounts WHERE account_number = ?", (receiver_account_number,))
        receiver_account = cursor.fetchone()
        if not receiver_account:
            print("Receiver account number does not exist.")
            return False
        receiver_balance = receiver_account[1]
        
        new_sender_balance = sender_balance - amount
        new_receiver_balance = receiver_balance + amount
        cursor.execute("UPDATE accounts SET balance = ? WHERE account_number = ?", (new_sender_balance, sender_account_number))
        cursor.execute("UPDATE accounts SET balance = ? WHERE account_number = ?", (new_receiver_balance, receiver_account_number))
        cursor.execute("INSERT INTO transactions (account_number, transaction_type, amount) VALUES (?, 'Transfer Out', ?)", (sender_account_number, amount))
        cursor.execute("INSERT INTO transactions (account_number, transaction_type, amount) VALUES (?, 'Transfer In', ?)", (receiver_account_number, amount))
        conn.commit()
        print(f"Successfully transferred Rs. {amount} from {sender_account_number} to {receiver_account_number}.")    
    except sqlite3.Error as e:
        conn.rollback()
        print(f"Error checking receiver account: {e}")
    finally:
        conn.close()

    receiver_account_number, receiver_balance = receiver_account
    new_sender_balance = sender_balance - amount
    new_receiver_balance = receiver_balance + amount

    # Perform the transfer
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    try:
        cursor.execute("UPDATE accounts SET balance = ? WHERE account_number = ?", (new_sender_balance, sender_account_number))
        cursor.execute("UPDATE accounts SET balance = ? WHERE account_number = ?", (new_receiver_balance, receiver_account_number))
        cursor.execute("INSERT INTO transactions (account_number, transaction_type, amount) VALUES (?, 'Transfer Out', ?)", (sender_account_number, amount))
        cursor.execute("INSERT INTO transactions (account_number, transaction_type, amount) VALUES (?, 'Transfer In', ?)", (receiver_account_number, amount))
        conn.commit()
        print(f"Successfully transferred Rs. {amount} from {sender_account_number} to {receiver_account_number}.")
    except sqlite3.Error as e:
        print(f"Error during transfer: {e}")
    finally:
        conn.close()
        
def verify_password(user_id, password):
    hashed_password = hash_password(password)
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE id = ? AND password = ?", (user_id, hashed_password))
    user = cursor.fetchone()
    conn.close()
    
    # Return True if the password is correct, otherwise False
    if user:
        return True
    else:
        return False
           
        
        

if __name__ == "__main__":
    create_tables()