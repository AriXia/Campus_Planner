from flask import Flask
from flask_cors import CORS
from events import events_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(events_bp)

@app.route("/")
def home():
    return "Backend is running!", 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)