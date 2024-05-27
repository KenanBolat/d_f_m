import smtplib
import os
import json
from email.message import EmailMessage


def notification(message):
    # try:
    if not message:
        return "no message received"
    else:
        message = json.loads(message)
        mp3_fid = message["mp3_fid"]
        sender_address = os.environ.get("EMAIL_HOST")
        sender_password = os.environ.get("EMAIL_HOST_PASSWORD")
        receiver_address = message["username"]

        msg = EmailMessage()
        msg.set_content(f"mp3 file_id: {mp3_fid} is now ready!")
        msg["Subject"] = "MP3 Download"
        msg["From"] = sender_address
        msg["To"] = receiver_address

        #session = smtplib.SMTP("smtp.gmail.com", 587)
        session = smtplib.SMTP("localhost", 1025)
        # session.starttls()
        session.login(sender_address, sender_password)
        session.send_message(msg, sender_address, receiver_address)
        session.quit()
        print("Mail Sent")


# except Exception as err:
# print(err)
# return err
