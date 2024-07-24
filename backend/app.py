#communication channel between the front end and back end
import globals
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import mqtt_connect
from topic_data import TopicData

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")



@app.route('/test1')
def home():
    t= None
    for x in (globals.allData):
        if x.get_topic() == "Vib_Temp_Measurements":
            t = x
    tdict = t.get_dict()
    return tdict


@app.route('/test2')
def home1():
    t= None
    for x in (globals.allData):
        if x.get_topic() == "Energy_Monitoring":
            t = x
    tdict = t.get_dict()
    return tdict

@app.route('/test3')
def home2():
    t= None
    for x in (globals.allData):
        if x.get_topic() == "MP_Energy_Monitoring":
            t = x
    tdict = t.get_dict()
    return tdict

@app.route('/log', methods=["POST"])
def lgn():
    user = request.json['username']
    passw = request.json['password']
    print(user + " " + passw)
    if globals.authenticate(user, passw):
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})

if __name__ == '__main__':
    app.run(debug=True)

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