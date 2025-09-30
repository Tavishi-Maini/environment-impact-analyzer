from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime


app = Flask(__name__)
CORS(app)  # allow cross-origin requests from frontend

saved_assessments = []

def get_dummy_score(product):
    product = product.lower()
    if "shirt" in product:
        return 75
    elif "phone" in product:
        return 40
    elif "plastic" in product:
        return 30
    return 55

@app.route("/api/score", methods=["POST"])
def score():
    data = request.get_json()
    products = data.get("products", [])

    if not products:
        return jsonify({"error": "No products provided"}), 400

    response = []
    for product in products:
        score = get_dummy_score(product)
        response.append({
            "product": product,
            "score": score,
            "message": f"Environmental score for {product}"
        })
    return jsonify(response)

@app.route("/api/save", methods=["POST"])
def save_assessment():
    data = request.get_json()
    # Add a date field
    saved_assessments.append({
        "date": datetime.now().isoformat(),  # store current timestamp
        "results": data
    })
    return jsonify({"message": "Assessment saved successfully", "saved": data})

@app.route("/api/saved", methods=["GET"])
def get_saved():
    return jsonify(saved_assessments)

if __name__ == "__main__":
    from datetime import datetime
    app.run(debug=True, port=5000)
