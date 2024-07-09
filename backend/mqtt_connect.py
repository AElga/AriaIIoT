#enter the information and configure the mqtt connection for the current account
import globals
import json_parser
import paho.mqtt.client as mqtt
from mqtt_requests import extract_topic

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



def on_message(client, userdata, message):
    topic = message.topic
    payload = message.payload.decode('utf-8')  # Decode payload if it's a string
    dict = {}
    json_parser.parseJSON(payload, dict)
    #Debugging: print(f"Received message on topic {topic}: {dict.items()} ")
    if globals.topic_contains(topic, globals.topics) == False:
        globals.topics.append(topic)
    for i, (t, _) in enumerate(userdata):
        if t == topic:
            userdata[i] = (topic, dict)
            break
    else:
        userdata.append((topic, dict))

    extract_topic(userdata)
    if len(globals.topics) >= 3:
        client.unsubscribe("#")


def on_connect(client, userdata, flags, reason_code, properties):
    if reason_code.is_failure:
        print(f"Failed to connect: {reason_code}. loop_forever() will retry connection")
    else:
        # we should always subscribe from on_connect callback to be sure
        # our subscribed is persisted across reconnections.
        
        client.subscribe("#", qos=2)

mqttc = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
mqttc.on_connect = on_connect
mqttc.on_message = on_message
mqttc.on_subscribe = on_subscribe
mqttc.on_unsubscribe = on_unsubscribe

mqttc.user_data_set([])
mqttc.username_pw_set("aria", "A?fB)N9)Ew'25C5Y")
mqttc.connect("www.ariatechnologies-iiot.com", 1883, 60)
mqttc.loop_forever()
#Debugging: print(f"Received the following message: {mqttc.user_data_get()}")