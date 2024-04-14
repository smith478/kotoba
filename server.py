from flask import Flask, request
import os

app = Flask(__name__)

@app.route('/save-audio', methods=['POST'])
def save_audio():
    audio = request.files['audio']
    audio.save(os.path.join('/tmp', audio.filename))
    return '', 204

if __name__ == '__main__':
    app.run(port=5000)