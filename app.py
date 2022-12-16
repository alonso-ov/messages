from flask import Flask, render_template, make_response, jsonify
from flask_socketio import SocketIO

app = Flask(__name__)

app.config['SECRET_KEY'] = 'password'

socketio = SocketIO(app)

@app.route('/', methods=['GET'])
def root():
    return render_template('home.html')

def messageReceived():
    print('Message was received'*120)

@socketio.on('event')
def handleEvent(json):
    print('Received: ' + str(json))
    socketio.emit('response', json, callback=messageReceived)

if __name__ == '__main__':
    socketio.run(app, debug=True)