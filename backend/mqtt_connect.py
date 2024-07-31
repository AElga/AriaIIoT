#enter the information and configure the mqtt connection for the current account
import globals
import json_parser
import paho.mqtt.client as mqtt
from mqtt_requests import extract_topic
from flask_socketio import emit
import app
import threading

message_count = 0

#function to understand the number of messages recieved in a minute
def reset_and_print_message_count():
    global message_count
    print(f"Messages received in the last minute: {message_count}")
    message_count = 0
    # Schedule this function to be called again after 60 seconds
    threading.Timer(60, reset_and_print_message_count).start()

# whenever the "subscribe" or "unsubscribe" method is called, process the following logic
def on_subscribe(client, userdata, mid, reason_code_list, properties):
    # Since we subscribed only for a single channel, reason_code_list contains
    # a single entry
    if reason_code_list[0].is_failure:
        print(f"Broker rejected you subscription: {reason_code_list[0]}")
    else:
        print(f"Broker granted the following QoS: {reason_code_list[0].value}")

def on_unsubscribe(client, userdata, mid, reason_code_list, properties):
    # Be careful, the reason_code_list is only present in MQTTv5.
    # In MQTTv3 it will always be empty
    if len(reason_code_list) == 0 or not reason_code_list[0].is_failure:
        print("unsubscribe succeeded (if SUBACK is received in MQTTv3 it success)")
    else:
        print(f"Broker replied with failure: {reason_code_list[0]}")
    client.disconnect()


#take a recieved message, parse it, and save it to the corresponding topic entry
def on_message(client, userdata, message):

    topic = message.topic
    payload = message.payload.decode('utf-8')  # Decode payload if it's a string
    dict = {}
    json_parser.parseJSON(payload, dict)
    #Debugging: 
    # print(f"Received message on topic {topic} ")
    if not globals.topic_contains(topic, globals.topics):
        globals.topics.append(topic)
    for i, (t, _) in enumerate(userdata):
        if t == topic:
            userdata[i] = (topic, dict)
            break
    else:
        userdata.append((topic, dict))

    extract_topic(userdata)

# once connected, start the subscription
def on_connect(client, userdata, flags, reason_code, properties):
    if reason_code.is_failure:
        print(f"Failed to connect: {reason_code}. loop_forever() will retry connection")
    else:
        # we should always subscribe from on_connect callback to be sure
        # our subscribed is persisted across reconnections.
        
        client.subscribe("#", qos=2)

#initalize the client and set the functions
mqttc = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
mqttc.on_connect = on_connect
mqttc.on_message = on_message
mqttc.on_subscribe = on_subscribe
mqttc.on_unsubscribe = on_unsubscribe

#sign in and start the server loop
mqttc.user_data_set([])
mqttc.username_pw_set("aria", "A?fB)N9)Ew'25C5Y")
mqttc.connect("www.ariatechnologies-iiot.com", 1883, 60)
mqttc.loop_start()
#Debugging: print(f"Received the following message: {mqttc.user_data_get()}")