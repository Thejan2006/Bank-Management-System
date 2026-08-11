# import sqlite3

# try:
#     conn = sqlite3.connect('bank_management.db')
#     cursor = conn.cursor()

#     cursor.execute("DELETE FROM accounts WHERE account_id IN (6)")
#     conn.commit()
#     print("Rows 6 deleted successfully!")

# except Exception as e:
#     print(f"Error occurred: {e}")

# finally:
#     if 'conn' in locals():
#         conn.close()