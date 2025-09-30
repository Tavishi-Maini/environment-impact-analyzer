from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"message": "Backend running!"})

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

if __name__ == "__main__":
    app.run(debug=True, port=5000)



