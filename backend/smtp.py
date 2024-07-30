import smtplib

s = smtplib.SMTP('smtp-mail.outlook.com', 587)

s.starttls()

s.login("AriaIOTTest@outlook.com", "TestIot2024")

message = "This is a test message"

s.sendmail("AriaIOTTest@outlook.com", "omar.m.elgazzar@outlook.com", message)

s.quit()