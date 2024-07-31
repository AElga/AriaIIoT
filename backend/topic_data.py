#This class holds the information regarding MQTT topics and their json messages
#in a compact and easy-to-handle fashion

import globals

class TopicData:
    #Constructor: ensure that the incoming topic string exsits and that its json message is not empty
    def __init__(self, topic="", dict={}):
       if globals.topic_contains(topic, globals.topics): self._topic = topic
       if len(dict) !=0: self._dict = dict

    #getters and setters
    def get_topic(self):
        return self._topic
    
    def get_dict(self):
        return self._dict

    def set_topic(self, topic):
        if globals.topic_contains(topic, globals.topics): self._topic = topic

    def set_dict(self, dict):
        if len(dict) !=0: self._dict = dict

    #to stirng function to return the topic and json message in the following format
    def to_string(self):
        return self._topic + ", " + str(self._dict) + "\n"

    #operator overloads for print() and '=='   
    def __str__(self):
        return self._topic + ", " + str(self._dict) + "\n"
    
    def __eq__(self, s):
        return self._topic == s
