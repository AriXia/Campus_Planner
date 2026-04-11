from flask import Blueprint, jsonify, request
from datetime import datetime, timezone

events_bp = Blueprint("events", __name__)

events = []
next_id = 1

def find_event(event_id):
    return next((event for event in events if event["id"] == event_id), None)

@events_bp.route("/events", methods=["GET"])
def get_events():
    return jsonify(events), 200

@events_bp.route("/events", methods=["POST"])
def add_event():
    global next_id
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    missing = [f for f in ("title", "location", "date", "time") if f not in data or not str(data[f]).strip()]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    new_event = {
        "id": next_id,
        "title": data["title"].strip(),
        "location": data["location"].strip(),
        "date": data["date"].strip(),
        "time": data["time"].strip(),
        "description": data.get("description", "").strip() or None,
        "link": data.get("link", "").strip() or None,
        "completed": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    events.append(new_event)
    next_id += 1
    return jsonify(new_event), 201

@events_bp.route("/events/<int:event_id>", methods=["GET"])
def get_event(event_id):
    event = find_event(event_id)
    if event:
        return jsonify(event), 200
    return jsonify({"error": "Event not found"}), 404

@events_bp.route("/events/<int:event_id>/complete", methods=["POST"])
def complete_event(event_id):
    event = find_event(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404
    events.remove(event)
    return jsonify({"message": f"Event '{event['title']}' marked as completed and removed"}), 200

@events_bp.route("/events/<int:event_id>", methods=["DELETE"])
def delete_event(event_id):
    event = find_event(event_id)
    if event:
        events.remove(event)
        return jsonify({"message": "Event deleted"}), 200
    return jsonify({"error": "Event not found"}), 404

