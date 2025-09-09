from flask import Flask, jsonify, request
from flask_cors import CORS  # <-- 1. IMPORT THIS
from services.product_service import load_products
from services.llm_service import get_recommendations

# Initialize the Flask application
app = Flask(__name__)
CORS(app)  # <-- 2. INITIALIZE CORS

# --- API Endpoints ---

@app.route('/api/status', methods=['GET'])
def get_status():
    """A simple endpoint to check if the API is running."""
    return jsonify({"status": "API is running"}), 200

@app.route('/api/products', methods=['GET'])
def get_products():
    """Endpoint to get the entire product catalog."""
    products = load_products()
    return jsonify(products)

@app.route('/api/recommendations', methods=['POST'])
def handle_recommendations():
    """
    Handles requests for product recommendations.
    Expects a JSON body with 'preferences' and 'history'.
    """
    user_data = request.get_json()
    if not user_data:
        return jsonify({"error": "Invalid input, JSON body required."}), 400

    user_preferences = user_data.get('preferences', {})
    browsing_history = user_data.get('history', [])

    product_catalog = load_products()
    if not product_catalog:
        return jsonify({"error": "Product catalog is unavailable."}), 500

    recommendations = get_recommendations(user_preferences, browsing_history, product_catalog)

    return jsonify(recommendations)

# This is the main entry point to run the application
if __name__ == '__main__':
    app.run(debug=True, port=5001)