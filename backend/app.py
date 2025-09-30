from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow React frontend to connect

@app.route("/")
def home():
    return jsonify({"message": "Backend running!"})


@app.route("/api/score", methods=["POST"])
def get_score():
    data = request.get_json()
    product = data.get("product", "Unknown product")

    # Slightly expanded dummy scoring
    if "shirt" in product.lower():
        score = 75
    elif "phone" in product.lower():
        score = 40
    elif "plastic" in product.lower():
        score = 30
    else:
        score = 55

    return jsonify({
        "product": product,
        "score": score,
        "message": f"Environmental score for {product}"
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)
