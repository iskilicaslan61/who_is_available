import os
from flask import Flask, render_template, jsonify, abort

app = Flask(__name__)

# Sample data for people and their availability
people = [
    {"id": 1, "name": "Hasan", "available": False},
    {"id": 2, "name": "Hatice", "available": False},
    {"id": 3, "name": "Kutlu", "available": False},
    {"id": 4, "name": "Özhan", "available": False},
    {"id": 5, "name": "Eduardo", "available": False},
    {"id": 6, "name": "Ismail", "available": False},
    {"id": 7, "name": "Ash", "available": False},
    {"id": 8, "name": "John", "available": False},
    {"id": 9, "name": "Anderew", "available": True},
]


@app.route("/")
def home():
    return render_template("index.html", people=people)


@app.route("/api/people")
def list_people():
    return jsonify(people)


@app.route("/toggle_availability/<int:person_id>", methods=["POST"])
def toggle_availability(person_id):
    person = next((p for p in people if p["id"] == person_id), None)
    if person is None:
        abort(404)
    person["available"] = not person["available"]
    return jsonify({"status": "success", "available": person["available"]})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
