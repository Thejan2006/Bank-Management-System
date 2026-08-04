from database import create_tables, create_user, login_user, create_account, get_balance, deposit_money, withdraw_money, get_transactions_history

def user_dashboard(user_id):
    while True:
        print("\n--- USER DASHBOARD ---")
        print("1. Create Bank Account")
        print("2. Check Balance (Coming Soon)")
        print("3. Logout")
        
        choice = input("Enter your choice (1-3): ")
        
        if choice == '1':
            try:
                deposit = float(input("Enter initial deposit amount: "))
                create_account(user_id, deposit)
            except ValueError:
                print(" Invalid amount! Please enter a valid number.")
        elif choice == '2':
            print("Feature coming in next step!")
        elif choice == '3':
            print("Logging out...")
            break
        else:
            print(" Invalid choice!")

def main():
    create_tables()

    while True:
        print("\n==============================")
        print("   BANK MANAGEMENT SYSTEM   ")
        print("==============================")
        print("1. Create New User")
        print("2. Login")
        print("3. Exit")
        
        choice = input("Enter your choice (1-3): ")

        if choice == '1':
            print("\n--- Create New User ---")
            username = input("Enter Username: ")
            password = input("Enter Password: ")
            email = input("Enter Email: ")
            create_user(username, password, email)

        elif choice == '2':
            print("\n--- User Login ---")
            username = input("Enter Username: ")
            password = input("Enter Password: ")
            
            user_id = login_user(username, password)
            
            if user_id:
                print(f"(Logged in User ID: {user_id})")
                user_dashboard(user_id) # මෙතනින් තමයි Dashboard එකට යන්නේ

        elif choice == '3':
            print("\nThank you for using the Bank Management System! Exiting...")
            break

        else:
            print("\nInvalid choice! Please enter 1, 2, or 3.")
            
            
            
def user_dashboard(user_id):
    while True:
        print("\n--- USER DASHBOARD ---")
        print("1. Create Bank Account")
        print("2. Check Balance")
        print("3. Deposit Money")
        print("4. Withdraw Money")
        print("5. View Transaction History")
        print("6. Logout")
        
        choice = input("Enter your choice (1-6): ")
        
        if choice == '1':
            try:
                deposit = float(input("Enter initial deposit amount: Rs. "))
                if deposit >= 0:
                    create_account(user_id, deposit)
                else:
                    print("Amount cannot be negative!")
            except ValueError:
                print("Invalid amount! Please enter a valid number.")
                
        elif choice == '2':
            account = get_balance(user_id)
            if account:
                print(f"\nAccount Number: {account[0]}")
                print(f"Current Balance: Rs. {account[1]}")
            else:
                print("You don't have an account yet.")
                
        elif choice == '3':
            try:
                amount = float(input("Enter amount to deposit: Rs. "))
                if amount > 0:
                    deposit_money(user_id, amount)
                else:
                    print("Deposit amount must be greater than 0.")
            except ValueError:
                print("Invalid amount!")
                
        elif choice == '4':
            try:
                amount = float(input("Enter amount to withdraw: Rs. "))
                if amount > 0:
                    withdraw_money(user_id, amount)
                else:
                    print("Withdrawal amount must be greater than 0.")
            except ValueError:
                print("Invalid amount!")
        
        elif choice == '5':
            history = get_transactions_history(user_id)
            if not history:
                print("\nNo transactions found.")
            else:
               print("\n----------------------------------------------------")
               print("DATE & TIME           | TYPE       | AMOUNT (Rs.)")
               print("----------------------------------------------------")
            for t in history:
                    print(f"Timestamp: {t[0]}, Type: {t[1]}, Amount: Rs. {t[2]}")
                    
                    
                    
        elif choice == '6':
            print("Logging out...")
            break      
        else:
            print("Invalid choice!")            

if __name__ == "__main__":
    main()