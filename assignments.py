from flask import Blueprint, jsonify, request
from datetime import datetime, timezone

assignments_bp = Blueprint("assignments", __name__)

assignments = []
next_id = 1

def find_assignment(assignment_id):
    return next((a for a in assignments if a["id"] == assignment_id), None)

@assignments_bp.route("/assignments", methods=["GET"])
def get_assignments():
    return jsonify(assignments), 200

@assignments_bp.route("/assignments", methods=["POST"])
def add_assignment():
    global next_id
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    missing = [f for f in ("title", "course", "due_date") if f not in data or not str(data[f]).strip()]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    new_assignment = {
        "id": next_id,
        "title": data["title"].strip(),
        "course": data["course"].strip(),
        "due_date": data["due_date"].strip(),
        "description": data.get("description", "").strip() or None,
        "completed": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    assignments.append(new_assignment)
    next_id += 1
    return jsonify(new_assignment), 201

@assignments_bp.route("/assignments/<int:assignment_id>", methods=["GET"])
def get_assignment(assignment_id):
    assignment = find_assignment(assignment_id)
    if assignment:
        return jsonify(assignment), 200
    return jsonify({"error": "Assignment not found"}), 404

@assignments_bp.route("/assignments/<int:assignment_id>/complete", methods=["POST"])
def complete_assignment(assignment_id):
    assignment = find_assignment(assignment_id)
    if not assignment:
        return jsonify({"error": "Assignment not found"}), 404
    assignment["completed"] = True
    return jsonify({"message": f"Assignment '{assignment['title']}' marked as completed"}), 200

@assignments_bp.route("/assignments/<int:assignment_id>", methods=["DELETE"])
def delete_assignment(assignment_id):
    assignment = find_assignment(assignment_id)
    if assignment:
        assignments.remove(assignment)
        return jsonify({"message": "Assignment deleted"}), 200
    return jsonify({"error": "Assignment not found"}), 404
