import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# --- Initialize the Gemini Model ---
try:
    # Configure the Gemini API with the key from the .env file
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        raise ValueError("GEMINI_API_KEY not found. Please check your .env file.")
    
    genai.configure(api_key=gemini_api_key)
    
    # Create the generative model instance
    model = genai.GenerativeModel('gemini-1.5-flash-latest')
    print("✅ Gemini model initialized successfully.")

except Exception as e:
    print(f"❌ Error initializing Gemini model: {e}")
    model = None

# --- Main Recommendation Function ---
def get_recommendations(user_preferences, browsing_history, product_catalog):
    """
    Generates product recommendations using the Google Gemini API.
    """
    if not model:
        return {"error": "Gemini model is not available."}

    # --- This is the strict V2 Prompt ---
    prompt = f"""
    You are a logical AI Product Recommendation Engine. Your task is to act like a database filter, NOT a creative assistant.
    You MUST follow these rules strictly:
    1. ONLY recommend products that are present in the provided "Available Product Catalog".
    2. Your reasoning for each recommendation MUST be personalized by referencing the user's preferences or browsing history. For example, say "Because you're looking for [Category]..." or "Since you viewed [Product Name]...".
    3. You MUST return the exact "product_id" from the catalog for each recommendation.
    4. If you cannot find any good matches, you MUST return an empty list in the "recommendations" array. DO NOT invent products.

    Here is the user's data:
    - User Preferences: {json.dumps(user_preferences)}
    - User Browsing History: {json.dumps(browsing_history)}

    Here is the FULL Available Product Catalog for you to choose from:
    ```json
    {json.dumps(product_catalog, indent=2)}
    ```

    Analyze all the data and find the 3 best matches from the catalog.

    Your final output MUST be ONLY a valid JSON object in the following format. Do not add any other text, explanations, or markdown formatting before or after the JSON object.
    {{
        "recommendations": [
            {{ "product_id": "an_exact_id_from_the_catalog", "reason": "A short reason why this specific product from the catalog is a good match." }},
            {{ "product_id": "another_exact_id_from_the_catalog", "reason": "Another short reason." }}
        ]
    }}
    """

    # Ensure this try/except block is indented correctly inside the function
    try:
        # Call the Gemini API
        response = model.generate_content(prompt)

        # Clean up the response to ensure it's a valid JSON string
        response_text = response.text.strip().replace("```json", "").replace("```", "")

        # Convert the JSON string to a Python dictionary
        recommendations = json.loads(response_text)
        return recommendations

    except Exception as e:
        print(f"An error occurred while calling the Gemini API: {e}")
        return {"error": f"Failed to get recommendations from Gemini. Details: {str(e)}"}