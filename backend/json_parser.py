#function to convert jsonformat messages to key-value pair dictionaries
def parseJSON (s, dist):
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

 
