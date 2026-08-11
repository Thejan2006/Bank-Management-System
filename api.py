from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
from bank_operations import get_balance, deposit_money, withdraw_money, transfer_money, get_transactions_history
from fastapi.middleware.cors import CORSMiddleware

# User management & Notifications 
from user_management import get_user_info, create_user, login_user, create_account, update_user_profile
from notifications import send_transaction_email

app = FastAPI()

from database import create_tables

@app.on_event("startup")
def startup_event():
    create_tables()

origins = [
    "http://localhost:3000",  # Local testing සඳහා
    "https://bank-management-system-48jazdd1e-dumidu-thejan-s-projects.vercel.app",  # Vercel Frontend URL 
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Bank Management System API!"}

@app.get("/status")
def check_status():
    return {"status": "API is running smoothly."}

# --- DASHBOARD & USER ENDPOINTS ---
@app.get("/user/{user_id}")
def get_user_endpoint(user_id: int):
    user_data = get_user_info(user_id)
    if user_data:
        return user_data
    else:
        raise HTTPException(status_code=404, detail="User not found")

@app.get("/balance/{user_id}")
def check_balance(user_id: int):
    account = get_balance(user_id)
    if account:
        return {"account_number": account[0], "balance": account[1]}
    else:
        return {"error": "User not found"}

# --- DEPOSIT WITH EMAIL ---
class DepositRequest(BaseModel):
    user_id: int
    amount: float
    
@app.post("/deposit")
def deposit_funds(request: DepositRequest, background_tasks: BackgroundTasks):
    success = deposit_money(request.user_id, request.amount)
    if success:
        user_info = get_user_info(request.user_id)
        if user_info and user_info.get("email"):
            background_tasks.add_task(
                send_transaction_email,
                user_info["email"],
                request.amount,
                user_info["balance"],
                "deposit"
            )
        return {"message": f"Successfully deposited Rs. {request.amount} to user ID {request.user_id}'s account."}
    else:
        return {"error": "Deposit failed. Please check your account and try again."}

# --- WITHDRAW WITH EMAIL ---
class WithdrawRequest(BaseModel):
    user_id: int
    amount: float

@app.post("/withdraw")
def withdraw_funds(request: WithdrawRequest, background_tasks: BackgroundTasks):
    success = withdraw_money(request.user_id, request.amount)
    if success:
        user_info = get_user_info(request.user_id)
        if user_info and user_info.get("email"):
            background_tasks.add_task(
                send_transaction_email,
                user_info["email"],
                request.amount,
                user_info["balance"],
                "withdraw"
            )
        return {"message": f"Successfully withdrew Rs. {request.amount} from user ID {request.user_id}'s account."}
    else:
        return {"error": "Withdrawal failed. Please check your account balance and try again."}

# --- TRANSFER WITH EMAIL ---    
class TransferRequest(BaseModel):
    sender_id: int
    receiver_account_number: str
    amount: float
    
@app.post("/transfer")
def transfer_funds(request: TransferRequest, background_tasks: BackgroundTasks):
    success = transfer_money(request.sender_id, request.receiver_account_number, request.amount)
    if success:
        sender_info = get_user_info(request.sender_id)
        if sender_info and sender_info.get("email"):
            background_tasks.add_task(
                send_transaction_email,
                sender_info["email"],
                request.amount,
                sender_info["balance"],
                "transfer"
            )
        return {"message": f"Successfully transferred Rs. {request.amount} from user ID {request.sender_id}'s account to {request.receiver_account_number}."}
    else:
        return {"error": "Transfer failed. Please check your account balance and the receiver's account number."}

# --- TRANSACTIONS HISTORY ---
@app.get("/transactions/{user_id}")
def get_transaction_history(user_id: int):
    transactions = get_transactions_history(user_id)
    if transactions:
        return {"transactions": transactions}
    else:
        return {"error": "No transaction history found for the specified user."}

# --- AUTHENTICATION & PROFILE ---
class RegisterRequest(BaseModel):
    name: str
    pin: str
    email: str
   
@app.post("/register")
def register_user_endpoint(request: RegisterRequest):
    success = create_user(request.name, request.pin, request.email)
    if success:
        return {"message": f"User '{request.name}' registered successfully."}
    else:
        return {"error": "Username or Email already exists!"}  
    
class LoginRequest(BaseModel):
    username: str
    password: str   
    
@app.post("/login")
def login_user_endpoint(request: LoginRequest):
    user_id = login_user(request.username, request.password)
    if user_id:
        return {"message": f"User '{request.username}' logged in successfully.", "user_id": user_id}
    else:
        return {"error": "Invalid username or password."}    
    
class CreateAccountRequest(BaseModel):
    user_id: int
    initial_deposit: float
    
@app.post("/create_account")
def create_account_endpoint(request: CreateAccountRequest):
    account_number = create_account(request.user_id, request.initial_deposit)
    if account_number:
        return {
            "message": f"Account created successfully for user ID {request.user_id}.",
            "account_number": account_number
        }
    else:
        return {"error": "Account creation failed. Please check the user ID and try again."}
    
class UpdateProfileRequest(BaseModel):
    user_id: int
    new_username: str = None
    new_email: str = None

@app.put("/update_profile")
def update_profile_endpoint(request: UpdateProfileRequest):
    success = update_user_profile(request.user_id, request.new_username, request.new_email)
    if success:
        return {"message": f"User profile updated successfully for user ID {request.user_id}."}
    else:
        return {"error": "Profile update failed. Please check the user ID and try again."}
