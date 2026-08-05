import sqlite3
import random
from database import DB_NAME


def create_account(user_id, initial_deposit):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # Generate a unique account number
    account_number = str(random.randint(1000000000, 9999999999))
    
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
        
        
        
        
def transfer_money(user_id, receiver_account_number, amount):        
    sender_account = get_balance(user_id)
    if not sender_account:
        print("You don't have an account yet. Please create one first.")
        return False
   
    sender_account_number, sender_balance = sender_account
    
    if sender_account_number == receiver_account_number:
        print("You cannot transfer money to your own account.")
        return False
    
    if amount > sender_balance:
        print("Insufficient balance! Your current balance is Rs.", sender_balance)
        return False

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
        return True
        
    except sqlite3.Error as e:
        conn.rollback()
        print(f"Error during transfer: {e}")
        return False
    finally:
        conn.close()    