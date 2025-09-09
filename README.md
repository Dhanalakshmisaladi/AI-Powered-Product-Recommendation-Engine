AI-Powered Product Recommendation Engine
Overview
This project is a full-stack web application that provides personalized product recommendations to users based on their preferences and browsing history. It leverages a Flask backend, a React frontend, and the Google Gemini Pro LLM to generate intelligent and relevant suggestions in a simulated e-commerce environment. The core of this project lies in its carefully designed prompt engineering, which ensures the AI's responses are accurate, contextual, and helpful.

Tech Stack
Backend: Python, Flask, Flask-CORS

Frontend: JavaScript, React.js

AI / LLM: Google Gemini Pro via the google-generativeai library

Environment Management: venv (Python), npm (Node.js)

Features
Dynamic Product Catalog: Fetches and displays a grid of all available products.

User Preference Form: Captures user interests like product category and price range.

Browsing History Simulation: Clicking a product adds it to a persistent browsing history list.

AI-Powered Recommendations: Sends user data to a Gemini-powered backend to receive personalized product recommendations.

Personalized Reasoning: The AI provides a unique, context-aware reason for each recommendation.

Interactive UI: Users can click on recommended items to view their full details.

Robust Error Handling: The application gracefully handles cases where no recommendations are found or if the AI returns an invalid product.

Responsive Design: A clean, two-column layout that adapts to smaller screen sizes for mobile viewing.

Setup and Installation
To run this project locally, you will need two separate terminals.

Backend Setup (Flask Server)
Navigate to the backend directory:

cd backend

Create and activate a Python virtual environment:

# Create the environment
python -m venv venv

# Activate on Windows
.\venv\Scripts\activate

# Activate on macOS/Linux
source venv/bin/activate

Install the required dependencies:

python -m pip install -r requirements.txt

Create your environment file:

Create a new file named .env in the backend directory.

Add your Google Gemini API key to it:

GEMINI_API_KEY='your_api_key_here'

Run the Flask server:

python app.py

The backend will now be running on http://127.0.0.1:5001.

Frontend Setup (React App)
In a new terminal, navigate to the frontend directory:

cd frontend

Install the required dependencies:

npm install

Run the React development server:

npm start

The application will automatically open in your browser at http://localhost:3000.

My Approach & Prompt Engineering Strategy
My development process was structured to build a robust and scalable application, with a primary focus on the quality of the AI interaction.

1. Backend First Development
I began by setting up the Flask backend and establishing the core logic for the AI service. This allowed me to test and iterate on the most critical part of the application—the prompt engineering—using an API client before ever touching the frontend.

2. Iterative Prompt Engineering
The quality of the AI's recommendations is the most important evaluation criteria (30%), so I dedicated significant effort to refining the prompt through several versions.

V1 (Initial Prompt): A basic prompt that provided user data and asked for recommendations. This worked, but it suffered from a critical flaw: hallucination. The AI would often invent products that were not in the provided catalog if it couldn't find a perfect match.

V2 (Strict & Logical): I re-engineered the prompt to be much stricter. I changed the AI's persona from a "helpful assistant" to a "logical database filter." I added non-negotiable rules in all caps, such as "You MUST ONLY recommend products from the provided catalog" and "If you cannot find good matches, you MUST return an empty list." This completely solved the hallucination problem.

V3 (Final Polish - Personalized Reasoning): To make the output even more impressive, I added a final rule: "Your reasoning for each recommendation MUST be personalized by referencing the user's preferences or browsing history." This small change resulted in significantly more compelling and context-aware explanations, directly tying the recommendation back to the user's actions.

3. Clean Frontend Architecture
The frontend was built with a clean, component-based architecture. State management is centralized in the main App.js component using useState and useEffect hooks, which is a modern and efficient approach for an application of this scale. All components are functional and focused on a single responsibility, making the code easy to read and maintain.

4. Robust Error Handling
I implemented error handling on both the frontend and backend. Most importantly, the frontend Recommendations.js component defensively checks if a product ID returned by the AI actually exists in the local product catalog before attempting to render it. This prevents the application from crashing if the AI ever makes a mistake, ensuring a smooth user experience.
