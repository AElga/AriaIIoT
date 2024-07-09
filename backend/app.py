#communication channel between the front end and back end
import globals
from flask import Flask
from flask_cors import CORS
import mqtt_connect

app = Flask(__name__)
CORS(app)

@app.route('/test')
def home():
    t = globals.allData[0]
    return globals.get_value(t, "Temperature_C_1")

# @app.route('/test2')
# def home():
#     return globals.allData[1].to_string()

# @app.route('/test3')
# def home():
#     return globals.allData[2].to_string()


if __name__ == '__main__':
    app.run(debug=True)
