from fastapi import FastAPI

app = FastAPI() #start api
@app.get("/")
def read_root():
    return {"message": "Welcome to the Bank Management System API!"}

@app.get("/status")
def check_status():
    return {"status": "API is running smoothly."}