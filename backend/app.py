from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from supabase import create_client


# SUPABASE KEYS

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

supabase = create_client(url, key)


# FLASK APP 

app = Flask(__name__)
CORS(app)


# HOME ROUTE (test)

@app.route("/")
def home():
    return "Backend running"



# GET ALL ASSIGNMENTS

@app.route("/assignments", methods=["GET"])
def get_assignments():
    response = supabase.table("assignments").select("*").execute()
    return jsonify(response.data), 200



# ADD NEW ASSIGNMENT

@app.route("/assignments", methods=["POST"])
def add_assignment():
    data = request.get_json() or {}

    # validation
    if not data.get("assignment_title") or not data.get("class_name"):
        return jsonify({"error": "Missing assignment_title or class_name"}), 400

    new_assignment = {
        "assignment_title": data["assignment_title"].strip(),
        "class_name": data["class_name"].strip(),
        "due_date": data.get("due_date") 
    }

    response = supabase.table("assignments").insert(new_assignment).execute()

    return jsonify(response.data), 201


@app.route("/courses/<int:course_id>", methods=["GET"])
def get_course(course_id):
    response = supabase.table("courses").select("*").eq("id", course_id).execute()

    if response.data:
        return jsonify(response.data[0]), 200

    return jsonify({"error": "Course not found"}), 404

@app.route("/assignments/<int:assignment_id>", methods=["DELETE"])
def delete_assignment(assignment_id):
    supabase.table("assignments") \
        .delete() \
        .eq("id", assignment_id) \
        .execute()

    return jsonify({"message": f"Assignment {assignment_id} deleted"}), 200



# GET ALL EVENTS

@app.route("/events", methods=["GET"])
def get_events():
    response = supabase.table("events").select("*").execute()
    return jsonify(response.data), 200



# ADD NEW EVENT

@app.route("/events", methods=["POST"])
def add_event():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    missing = [f for f in ("title", "location", "date", "time") if f not in data or not str(data[f]).strip()]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    new_event = {
        "title": data["title"].strip(),
        "location": data["location"].strip(),
        "date": data["date"].strip(),
        "time": data["time"].strip(),
        "description": data.get("description", "").strip() or None,
        "link": data.get("link", "").strip() or None,
        "completed": False,
    }

    response = supabase.table("events").insert(new_event).execute()
    return jsonify(response.data), 201



# GET SINGLE EVENT

@app.route("/events/<int:event_id>", methods=["GET"])
def get_event(event_id):
    response = supabase.table("events").select("*").eq("id", event_id).execute()

    if response.data:
        return jsonify(response.data[0]), 200
    return jsonify({"error": "Event not found"}), 404



# MARK EVENT AS COMPLETE

@app.route("/events/<int:event_id>/complete", methods=["POST"])
def complete_event(event_id):
    response = supabase.table("events").select("*").eq("id", event_id).execute()

    if not response.data:
        return jsonify({"error": "Event not found"}), 404

    event = response.data[0]
    supabase.table("events").delete().eq("id", event_id).execute()
    return jsonify({"message": f"Event '{event['title']}' marked as completed and removed"}), 200



# DELETE EVENT

@app.route("/events/<int:event_id>", methods=["DELETE"])
def delete_event(event_id):
    response = supabase.table("events").select("*").eq("id", event_id).execute()

    if response.data:
        supabase.table("events").delete().eq("id", event_id).execute()
        return jsonify({"message": "Event deleted"}), 200
    return jsonify({"error": "Event not found"}), 404



# RUN APP

if __name__ == "__main__":
    app.run(debug=True, port=5000)


