from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import random
import os
import smtplib

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Dummy user data for login verification
users = {
    "ahmedkhorshud2001@gmail.com": {
        "password": "NodeRedSucks",
        "verification_code": None
    }
}

verification_codes = {}

@app.route('/log', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if verify_credentials(username, password):
        verification_code = random.randint(1000, 9999)
        verification_codes[username] = verification_code
        send_verification_code(username, verification_code)
        print(f"Verification code for {username}: {verification_code}")  # Print the verification code
        return jsonify({'success': True, 'step': 'verify'})
    return jsonify({'success': False, 'message': 'Invalid email or password'}), 401

@app.route('/verify', methods=['POST'])
def verify_code():
    data = request.json
    username = data.get('username')
    code = data.get('code')
    if verification_codes.get(username) == int(code):
        verification_codes.pop(username)  # Remove the used code
        return jsonify({'success': True})
    return jsonify({'success': False, 'message': 'Invalid verification code'}), 401

def verify_credentials(username, password):
    # Dummy verification, replace with actual logic
    user = users.get(username)
    return user and user['password'] == password

def send_verification_code(email, code):
    s = smtplib.SMTP('smtp-mail.outlook.com', 587)
    s.starttls()
    s.login("AriaIOTTest@outlook.com", "TestIot2024")
    message = f"Your verification code is {code}"
    s.sendmail("AriaIOTTest@outlook.com", email, message)
    s.quit()

@app.route('/test1')
def home():
    # Dummy route
    return jsonify({"message": "Test1"})

@app.route('/test2')
def home1():
    # Dummy route
    return jsonify({"message": "Test2"})

@app.route('/test3')
def home2():
    # Dummy route
    return jsonify({"message": "Test3"})

@socketio.on('message')
def handle_message(msg):
    print('Received message:', msg)
    socketio.emit('message', msg, broadcast=True)

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

def send_update(data):
    socketio.emit('update', data)

if __name__ == '__main__':
    socketio.run(app, debug=True)
