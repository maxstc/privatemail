#https://docs.python.org/3/library/email.examples.html
# Import smtplib for the actual sending function
import smtplib

# Import the email modules we'll need
from email.message import EmailMessage

# Open the plain text file whose name is in textfile for reading.
with open("textfile.txt") as fp:
    # Create a text/plain message
    msg = EmailMessage()
    msg.set_content(fp.read())

# me == the sender's email address
# you == the recipient's email address
msg['Subject'] = "Hello there"
msg['From'] = "max@mail.com"
msg['To'] = "xam@mail.com"

# Send the message via our own SMTP server.
s = smtplib.SMTP(host='localhost', port=3001)
s.send_message(msg)
s.quit()