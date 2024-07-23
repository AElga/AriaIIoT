topics = [] #used for duplicate detection
allData = []

TempUsername = "FadlAllah@Alhamdulilah.rab"
TempPass = "NodeRedSucks"
LoggedIn = False

def authenticate(u, p):
    if u == TempUsername and p == TempPass: LoggedIn = True
    return LoggedIn

def topic_contains(s, list):
    for i in list:
        if i == s: return True
    return False

def get_value(topic, key):
    # check if key is in the topic or no
    dict = topic.get_dict()
    if dict.get(key) == None:
        return ""
    return dict.get(key)
