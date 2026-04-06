from flask import Flask, jsonify, request

app = Flask(__name__)

courses = []
next_id = 1

def find_course(course_id):
    return next((course for course in courses if course["id"] == course_id), None)  

@app.route("/")
def home():
    return "Backend is running!", 200


@app.route("/courses", methods=["GET"])
def get_courses():
    return jsonify(courses), 200

@app.route("/courses", methods=["POST"])
def add_course():
    global next_id
    data = request.get_json()

    if not data or "name" not in data or "description" not in data:
        return jsonify({"error": "Invalid input"}), 400

    new_course = {
        "id": next_id,
        "name": data["name"].strip(),
        "code": data["code"].strip(),
        "created_at": None,
    }

    courses.append(new_course)
    next_id += 1
    return jsonify(new_course), 201

@app.route("/courses/<int:course_id>", methods=["GET"])
def get_course(course_id):
    course = find_course(course_id)
    if course:
        return jsonify(course), 200
    return jsonify({"error": "Course not found"}), 404

@app.route("/courses/<int:course_id>", methods=["DELETE"])
def delete_course(course_id):
    course = find_course(course_id)
    if course:
        courses.remove(course)
        return jsonify({"message": "Course deleted"}), 200
    return jsonify({"error": "Course not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5000)


