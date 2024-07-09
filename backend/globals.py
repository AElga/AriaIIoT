topics = [] #used for duplicate detection
allData = []

def topic_contains(s, list):
    for i in list:
        if i == s: return True
    return False

def get_value(topic, key):
    dict = topic.get_dict()
    return dict.get(key)
