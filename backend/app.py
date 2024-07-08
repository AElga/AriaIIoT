#communication channel between the front end and back end

from flask import Flask
from flask_cors import CORS
import mqtt_connect 

app = Flask(__name__)
CORS(app)

@app.route('/test')
def home():
    
    return mqtt_connect.mqttc.user_data_get()


if __name__ == '__main__':
    app.run(debug=True)


# @app.post("/register")
# def register(user: User):
#     # Check if user already exists in the database
#     existing_user = users_collection.find_one({"email": user.email})
#     if existing_user:
#         return {"message": "User already exists"}
#     # Insert the new user into the database
#     user_dict = user.dict()
#     users_collection.insert_one(user_dict)
#     # Generate a token
#     token = generate_token(user.email)
#     # Convert ObjectId to string
#     user_dict["_id"] = str(user_dict["_id"])
#     # Store user details and token in local storage
#     user_dict["token"] = token
#     return user_dict