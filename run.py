from flask import Flask
from events import events_bp
# from app import courses_bp  # uncomment when your coworker's Blueprint is ready

app = Flask(__name__)

app.register_blueprint(events_bp)
# app.register_blueprint(courses_bp)  # uncomment when ready

@app.route("/")
def home():
    return "Backend is running!", 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)
