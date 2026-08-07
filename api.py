from fastapi import FastAPI
from pydantic import BaseModel
from bank_operations import get_balance, deposit_money, withdraw_money, transfer_money

app = FastAPI() #start api



@app.get("/")
def read_root():
    return {"message": "Welcome to the Bank Management System API!"}

@app.get("/status")
def check_status():
    return {"status": "API is running smoothly."}

@app.get("/balance/{user_id}")
def check_balance(user_id: int):
    account = get_balance(user_id)
    if account:
        return {"account_number": account[0], "balance": account[1]}
    else:
     return {"error": "User not found"}
 

class DepositRequest(BaseModel):
    user_id: int
    amount: float# to define the amount to deposit
    
@app.post("/deposit")
def deposit_funds(request: DepositRequest):
    success = deposit_money(request.user_id, request.amount)
    if success:
        return {"message": f"Successfully deposited Rs. {request.amount}. to {request.user_id}'s account."}
    else:
        return {"error": "Deposit failed. Please check your account and try again."}

class WithdrawRequest(BaseModel):
    user_id: int
    amount: float # to define the amount to withdraw

@app.post("/withdraw")
def withdraw_funds(request: WithdrawRequest):
    success = withdraw_money(request.user_id, request.amount)
    if success:
        return {"message": f"Successfully withdrew Rs. {request.amount} from {request.user_id}'s account."}
    else:
        return {"error": "Withdrawal failed. Please check your account balance and try again."}
    
    
class TransferRequest(BaseModel):
    sender_id: int
    receiver_account_number: str
    amount: float # to define the amount to transfer    
    
    
@app.post("/transfer")
def transfer_funds(request: TransferRequest):
    success = transfer_money(request.sender_id, request.receiver_account_number, request.amount)
    if success:
        return {"message": f"Successfully transferred Rs. {request.amount} from {request.sender_id}'s account to {request.receiver_account_number}."}
    else:
        return {"error": "Transfer failed. Please check your account balance and the receiver's account number and try again."}