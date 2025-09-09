import json
import os

# Construct the path to the products.json file
# This ensures it works correctly regardless of where the script is run from
DATA_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'products.json')

def load_products():
    """
    Loads the product catalog from the products.json file.
    """
    try:
        with open(DATA_PATH, 'r') as f:
            products = json.load(f)
        return products
    except FileNotFoundError:
        print(f"Error: The file at {DATA_PATH} was not found.")
        return []
    except json.JSONDecodeError:
        print(f"Error: The file at {DATA_PATH} is not a valid JSON file.")
        return []