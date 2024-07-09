#create a client for each tab-topic and prepare the dictionar
from topic_data import TopicData
import globals

# function for extraction of topics from userdata

def extract_topic(userdata):
    for entry in userdata:
        if globals.topic_contains(entry[0], globals.allData):
            for obj in globals.allData:
                if obj.get_topic() == entry[0]:
                    obj.set_dict(entry[1])
                    #print(obj)
                    break
        else: 
            topicdata = TopicData(entry[0], entry[1])
            #print(topicdata)
            globals.allData.append(topicdata)


