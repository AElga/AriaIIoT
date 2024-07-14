#communication channel between the front end and back end
import globals
from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import mqtt_connect

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/test')
def home():
    t = globals.allData[1].to_string()
    return t
# globals.get_value(t, "X_axis_RMS_Velocity_mmPerSec_1")


# @app.route('/test2')
# def home():
#     return globals.allData[1].to_string()

# @app.route('/test3')
# def home():
#     return globals.allData[2].to_string()

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