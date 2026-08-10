import smtplib
from email.mime.text import MIMEText
from twilio.rest import Client

# ----------------- EMAIL NOTIFICATION -----------------
def send_transaction_email(user_email: str, amount: float, balance: float, transaction_type: str):
    sender_email = "your_bank_email@gmail.com"  # our password
    sender_password = "your_gmail_app_password" # Gmail App Password

    if transaction_type == "deposit":
        subject = "Deposit Alert - Arcana Bank"
        msg_text = f"ARCANA BANK\n\nDear Customer,\nYour account has been CREDITED with Rs. {amount:,.2f}.\nAvailable Balance: Rs. {balance:,.2f}."
    elif transaction_type == "withdraw":
        subject = "Withdrawal Alert - Arcana Bank"
        msg_text = f"ARCANA BANK\n\nDear Customer,\nAn amount of Rs. {amount:,.2f} has been DEBITED from your account.\nAvailable Balance: Rs. {balance:,.2f}."
    elif transaction_type == "transfer":
        subject = "Fund Transfer Alert - Arcana Bank"
        msg_text = f"ARCANA BANK\n\nDear Customer,\nSuccessfully transferred Rs. {amount:,.2f}.\nAvailable Balance: Rs. {balance:,.2f}."

    msg = MIMEText(msg_text)
    msg['Subject'] = subject
    msg['From'] = sender_email
    msg['To'] = user_email

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, user_email, msg.as_string())
        server.quit()
        print(f"Email Sent Successfully to {user_email}!")
    except Exception as e:
        print(f"Failed to send email: {e}")


# ----------------- SMS NOTIFICATION (OPTIONAL) -----------------
def send_transaction_sms(user_phone: str, amount: float, balance: float, transaction_type: str):
    # Twilio Credentials 
    TWILIO_ACCOUNT_SID = 'your_account_sid'
    TWILIO_AUTH_TOKEN = 'your_auth_token'
    TWILIO_PHONE_NUMBER = '+1234567890'

    if transaction_type == "deposit":
        body = f"ARCANA BANK: Rs.{amount:,.2f} Credited. New Balance: Rs.{balance:,.2f}"
    else:
        body = f"ARCANA BANK: Rs.{amount:,.2f} Debited. New Balance: Rs.{balance:,.2f}"

    try:
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        message = client.messages.create(
            body=body,
            from_=TWILIO_PHONE_NUMBER,
            to=user_phone
        )
        print("SMS Sent Successfully! SID:", message.sid)
    except Exception as e:
        print(f"Failed to send SMS: {e}")