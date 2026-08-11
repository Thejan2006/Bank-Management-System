import hashlib
import random
import sqlite3
from database import DB_NAME


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
        return True
    except sqlite3.IntegrityError:
        print("Error: Username or Email already exists!")
        return False
    finally:
        conn.close()

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

def verify_password(user_id, password):
    hashed_password = hash_password(password)
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE id = ? AND password = ?", (user_id, hashed_password))
    user = cursor.fetchone()
    conn.close()
    
    if user:
        return True
    else:
        return False

def create_account(user_id, initial_deposit):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    cursor.execute("SELECT id FROM users WHERE id = ?", (user_id,)) # check if user exist
    user = cursor.fetchone()
    
    if not user:
        print(f"Error: User with ID {user_id} does not exist.")
        conn.close()
        return {"error": f"User with ID {user_id} does not exist."}
    
    cursor.execute("SELECT account_number FROM accounts WHERE user_id = ?", (user_id,))# check if user already have account
    existing_account = cursor.fetchone()
    
    if existing_account:
        conn.close()
        return {"error": "User already has an account."}
    
    # Generate a unique account number
    account_number = str(random.randint(1000000000, 9999999999))
    
    try:
        cursor.execute("INSERT INTO accounts (user_id, account_number, balance) VALUES (?, ?, ?)", (user_id, account_number, initial_deposit))
        conn.commit()
        print(f"Account '{account_number}' created successfully with initial deposit of {initial_deposit}.")
        return account_number  # return the account number if the account is created successfully
    except sqlite3.IntegrityError:
        print("Error: Failed to create account.")
        return None
    finally:
        conn.close()

def update_user_profile(user_id, new_username, new_eamil):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT username, email FROM users WHERE id = ?", (user_id,))
        current_data = cursor.fetchone()  # Fetch the current data after the update
        if not current_data:  
            print("Profile not found.")
            return False
        
        current_username, current_email = current_data
        
        username_to_update = new_username if new_username else current_username
        email_to_update = new_eamil if new_eamil else current_email
        
        cursor.execute("UPDATE users SET username = ?, email = ? WHERE id = ?", (username_to_update, email_to_update, user_id))
        conn.commit()
        print("Profile updated successfully.")
        return True
    
    except sqlite3.IntegrityError:
        print("Error: Username or Email already exists!")
        return False  
    
    finally:
        conn.close()

# 🔴 new fuction we create to get user infromation
def get_user_info(user_id: int):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    try:
        # users table get emali and name 
        cursor.execute("SELECT id, username, email FROM users WHERE id = ?", (user_id,))
        user = cursor.fetchone()
        
        if not user:
            return None
            
        # accounts table  get user name and id
        cursor.execute("SELECT balance FROM accounts WHERE user_id = ?", (user_id,))
        account = cursor.fetchone()
        
        balance = account[0] if account else 0.00
        
        return {
            "user_id": user[0],
            "name": user[1],
            "email": user[2],
            "balance": balance
        }
    except Exception as e:
        print(f"Error fetching user info: {e}")
        return None
    finally:
        conn.close()
        
