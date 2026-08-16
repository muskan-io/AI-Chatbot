from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from google import genai
import os

# Load variables from .env
load_dotenv()

# Get Gemini API key
api_key = os.getenv("GEMINI_API_KEY")

# Create Gemini client
client = genai.Client(api_key=api_key)

# Create Flask application
app = Flask(__name__)


# Home page
@app.route("/")
def home():
    return render_template("index.html")


# Chat endpoint
@app.route("/chat", methods=["POST"])
def chat():

    try:
        user_message = request.json["message"]

        print("User message:", user_message)

        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=user_message
        )

        print("Gemini response received")

        return jsonify({
            "reply": response.text
        })

    except Exception as e:

        print("ERROR:", repr(e))

        return jsonify({
            "error": str(e)
        }), 500


# Start Flask
if __name__ == "__main__":
    app.run(debug=True)