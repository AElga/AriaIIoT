import globals



class TopicData:

    def __init__(self, topic="", dict={}):
       if globals.topic_contains(topic, globals.topics): self._topic = topic
       if len(dict) !=0: self._dict = dict

    def get_topic(self):
        return self._topic
    
    def get_dict(self):
        return self._dict

    def set_topic(self, topic):
        if globals.topic_contains(topic, globals.topics): self._topic = topic

    def set_dict(self, dict):
        if len(dict) !=0: self._dict = dict

    def to_string(self):
        return self._topic + ", " + str(self._dict) + "\n"
    
    def __str__(self):
        return self._topic + ", " + str(self._dict) + "\n"
    
    def __eq__(self, s):
        return self._topic == s
