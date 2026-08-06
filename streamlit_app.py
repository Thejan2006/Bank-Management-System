import streamlit as st
from user_management import create_user, login_user, update_user_profile, verify_password
from bank_operations import (
    create_account, get_balance, deposit_money, 
    withdraw_money, get_transactions_history, transfer_money
)

# --- 1. PAGE CONFIGURATION ---
st.set_page_config(page_title="MyBank Secure", page_icon="🏦", layout="centered")

# --- 2. CUSTOM CSS FOR PROFESSIONAL UI ---
st.markdown("""
    <style>
    /* Background and basic fonts */
    .main { background-color: #f4f6f9; }
    
    /* Customizing the main buttons */
    .stButton>button {
        width: 100%;
        border-radius: 8px;
        height: 3em;
        background-color: #0056b3;
        color: white;
        font-weight: bold;
        border: none;
        transition: 0.3s;
    }
    .stButton>button:hover {
        background-color: #004085;
        color: white;
        border: 1px solid #0056b3;
    }
    
    /* Headings */
    h1, h2, h3 { color: #0056b3; }
    
    /* Transaction History Cards */
    .history-card {
        background-color: white;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        margin-bottom: 10px;
        border-left: 5px solid #0056b3;
    }
    </style>
""", unsafe_allow_html=True)

# --- 3. SESSION STATE SETUP ---
if 'user_id' not in st.session_state:
    st.session_state.user_id = None
    st.session_state.username = None

# ==========================================
# --- 4. AUTHENTICATION (LOGIN/REGISTER) ---
# ==========================================
if st.session_state.user_id is None:
    st.markdown("<h1 style='text-align: center;'>🏦 MyBank Secure Portal</h1>", unsafe_allow_html=True)
    st.markdown("<p style='text-align: center; color: gray;'>Experience Modern Digital Banking</p>", unsafe_allow_html=True)
    st.write("---")
    
    # Center the login/register forms using columns
    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        tab1, tab2 = st.tabs(["🔐 Login", "📝 Register"])
        
        # LOGIN TAB
        with tab1:
            st.markdown("### Welcome Back!")
            login_username = st.text_input("Username", key="login_user")
            login_password = st.text_input("Password", type="password", key="login_pass")
            
            if st.button("Login to Account"):
                if login_username and login_password:
                    user_id = login_user(login_username, login_password)
                    if user_id:
                        st.session_state.user_id = user_id
                        st.session_state.username = login_username
                        st.success("Login successful! Loading dashboard...")
                        st.rerun()
                    else:
                        st.error("Invalid username or password.")
                else:
                    st.warning("Please fill in all fields.")
                    
        # REGISTER TAB
        with tab2:
            st.markdown("### Create New Account")
            reg_username = st.text_input("Choose Username", key="reg_user")
            reg_password = st.text_input("Choose Password", type="password", key="reg_pass")
            reg_email = st.text_input("Email Address", key="reg_email")
            
            if st.button("Register Now"):
                if reg_username and reg_password and reg_email:
                    create_user(reg_username, reg_password, reg_email)
                    st.success("Account created successfully! Please go to the Login tab.")
                else:
                    st.warning("Please fill in all fields.")

# ==========================================
# --- 5. SECURE DASHBOARD ---
# ==========================================
else:
    user_id = st.session_state.user_id

    # Sidebar Navigation
    with st.sidebar:
        st.markdown(f"### 👋 Welcome, **{st.session_state.username}**")
        st.write("---")
        menu = st.radio(
            "📍 Navigation Menu", 
            ["📊 Dashboard & Balance", "💳 Open Account", "📥 Deposit Funds", "📤 Withdraw Funds", "🔄 Transfer Money", "📜 Transaction History", "⚙️ Account Settings"]
        )
        st.write("---")
        if st.button("🚪 Logout"):
            st.session_state.user_id = None
            st.session_state.username = None
            st.rerun()

    # --- MENU: Dashboard & Balance ---
    if menu == "📊 Dashboard & Balance":
        st.title("📊 Account Overview")
        account = get_balance(user_id)
        if account:
            st.info(f"**Account Number:** {account[0]}")
            st.success(f"**Available Balance:** Rs. {account[1]:,.2f}")
        else:
            st.warning("You don't have a bank account yet. Please go to 'Open Account' from the sidebar!")

    # --- MENU: Open Account ---
    elif menu == "💳 Open Account":
        st.title("💳 Open a New Bank Account")
        account = get_balance(user_id)
        if account:
            st.warning(f"You already have an active account! (Account No: {account[0]})")
        else:
            st.write("Start your banking journey by making an initial deposit.")
            initial_deposit = st.number_input("Initial Deposit Amount (Rs.)", min_value=0.0, step=100.0)
            if st.button("Create Account"):
                create_account(user_id, initial_deposit)
                st.success(f"Account successfully created with an initial deposit of Rs. {initial_deposit:,.2f}!")
                st.rerun()

    # --- MENU: Deposit ---
    elif menu == "📥 Deposit Funds":
        st.title("📥 Deposit Money")
        account = get_balance(user_id)
        if not account:
            st.warning("Please create a bank account first.")
        else:
            st.info(f"Current Balance: Rs. {account[1]:,.2f}")
            amount = st.number_input("Amount to Deposit (Rs.)", min_value=1.0, step=100.0)
            if st.button("Deposit Now"):
                deposit_money(user_id, amount)
                st.success(f"Successfully deposited Rs. {amount:,.2f} into your account!")

    # --- MENU: Withdraw ---
    elif menu == "📤 Withdraw Funds":
        st.title("📤 Withdraw Money")
        account = get_balance(user_id)
        if not account:
            st.warning("Please create a bank account first.")
        else:
            st.info(f"Current Balance: Rs. {account[1]:,.2f}")
            amount = st.number_input("Amount to Withdraw (Rs.)", min_value=1.0, step=100.0)
            st.write("🔒 Security Verification")
            password = st.text_input("Enter your login password to confirm", type="password")
            
            if st.button("Confirm Withdrawal"):
                if verify_password(user_id, password):
                    withdraw_money(user_id, amount)
                    st.success(f"Successfully withdrew Rs. {amount:,.2f}!")
                else:
                    st.error("Incorrect password! Security alert: Withdrawal cancelled.")

    # --- MENU: Transfer Money ---
    elif menu == "🔄 Transfer Money":
        st.title("🔄 Transfer Funds")
        account = get_balance(user_id)
        if not account:
            st.warning("Please create a bank account first.")
        else:
            st.info(f"Your Available Balance: Rs. {account[1]:,.2f}")
            receiver_acc = st.text_input("Receiver's Account Number")
            amount = st.number_input("Amount to Transfer (Rs.)", min_value=1.0, step=100.0)
            st.write("🔒 Security Verification")
            password = st.text_input("Enter your login password to confirm", type="password")
            
            if st.button("Send Money"):
                if verify_password(user_id, password):
                    success = transfer_money(user_id, receiver_acc, amount)
                    if success:
                        st.success(f"Successfully transferred Rs. {amount:,.2f} to Account {receiver_acc}.")
                else:
                    st.error("Incorrect password! Security alert: Transfer cancelled.")

    # --- MENU: Transaction History ---
    elif menu == "📜 Transaction History":
        st.title("📜 Recent Transactions")
        history = get_transactions_history(user_id)
        if not history:
            st.info("No transactions found yet.")
        else:
            for t in history:
                # Using HTML/CSS to make transaction cards look beautiful
                color = "green" if t[1] in ["Deposit", "Transfer In"] else "red"
                symbol = "+" if t[1] in ["Deposit", "Transfer In"] else "-"
                
                st.markdown(f"""
                <div class="history-card">
                    <p style="margin:0; font-size: 14px; color: gray;">🕒 {t[0]}</p>
                    <h4 style="margin:0; color: #333;">{t[1]}</h4>
                    <h3 style="margin:0; color: {color};">{symbol} Rs. {t[2]:,.2f}</h3>
                </div>
                """, unsafe_allow_html=True)

    # --- MENU: Update Profile ---
    elif menu == "⚙️ Account Settings":
        st.title("⚙️ Profile Settings")
        st.write("Update your account details below. Leave blank if you don't want to change them.")
        
        new_username = st.text_input("New Username")
        new_email = st.text_input("New Email Address")
        
        if st.button("Save Changes"):
            success = update_user_profile(
                user_id, 
                new_username if new_username else None, 
                new_email if new_email else None
            )
            if success:
                st.success("Profile details updated successfully!")
                if new_username:
                    st.session_state.username = new_username
                    st.rerun()