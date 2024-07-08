#function to convert jsonformat messages to key-value pair dictionaries
#from mqtt_connect import mqttc 


def parseJSON (s, dict):
    if s[0] != '{':
        return
    key = ""
    value = ""
    start = 1
    end = 2
    while s[end] != "}":
        if s[end] == "\"" and s[end+1] == ":":
            key = s[start + 1 : end]
            start = end + 2
            end = start + 1
        elif s[end] == "\"" and (s[end+1] == "," or s[end+1] == "}") :
            value = s[start + 1 : end]
            if s[end + 1] != "}" :
                start = end + 2
                end = start + 1
            dict[key] = value
        end +=1

def contains(s, list):
    c = 0
    for i in list:
        if i == s: return c
        else: 
            c+=1
            print(c)
    return -1

def topic_contains(s, list):
    for i in list:
        if i == s: return True
    return False    
    # return -1

# data = mqttc.user_data_get()
# testdict = {}
# test = "{\"Current_1\":\"6.5\",\"Current_2\":"4.0","Current_3":"4.4","Current_4":"3.2","V12":"395.8","V23":"396.5","V31":"392.9","Power":"3.5","TotEnergy":"97756833.9"}"

# print(data)
# parseJSON(test, testdict)
# print(testdict.items())