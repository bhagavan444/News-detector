from flask import Flask, request, jsonify
from flask_cors import CORS  
import requests
import os
import fitz  # PyMuPDF for PDF text extraction
import tempfile
import re
import json

# ===== Initialize Flask =====
app = Flask(__name__)
CORS(app)

# ===== Gemini API Config =====
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "your_gemini_api_key_here")
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

def ask_gemini(prompt: str):
    """Send text to Gemini API and get response"""
    headers = {"Content-Type": "application/json"}
    params = {"key": GEMINI_API_KEY}
    data = {
        "contents": [
            {"parts": [{"text": prompt}]}
        ]
    }
    try:
        response = requests.post(GEMINI_API_URL, headers=headers, params=params, json=data)
        response.raise_for_status()
        result = response.json()
        return result["candidates"][0]["content"]["parts"][0]["text"]
    except Exception as e:
        return f"Error contacting Gemini API: {str(e)}"

def extract_text_from_pdf(file_path):
    """Extract text from PDF using PyMuPDF"""
    text = ""
    doc = fitz.open(file_path)
    for page in doc:
        text += page.get_text()
    return text.strip()

def parse_gemini_json(response_text):
    """Parse Gemini response to extract strict JSON with prediction and confidence"""
    try:
        # Ensure valid JSON is returned
        match = re.search(r"\{.*\}", response_text, re.DOTALL)
        if match:
            parsed = json.loads(match.group())
            # Clamp confidence between 0 and 1
            confidence = float(parsed.get("confidence", 0))
            confidence = max(0.0, min(1.0, confidence))
            prediction = parsed.get("prediction", "").upper()
            if prediction not in ["FAKE", "REAL"]:
                prediction = "FAKE"  # default fallback
            return {"prediction": prediction, "confidence": confidence}
    except Exception:
        pass
    # fallback
    return {"prediction": "FAKE", "confidence": 0.0}

# ===== Routes =====

@app.route("/")
def home():
    return jsonify({
        "message": "Fake News Detection API is running 🚀",
        "next_steps": [
            "Add batch testing with multiple news items at once.",
            "Generate PDF/TXT reports automatically for results.",
            "Include a history dashboard with charts for real vs fake over time."
        ]
    })

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text", "").strip()
    if not text:
        return jsonify({"error": "Empty text provided!"}), 400

    prompt = f"""
You are a strict fake news detector.
Analyze the following news and respond ONLY in valid JSON format with two fields:
- "prediction": either "FAKE" or "REAL"
- "confidence": a number between 0 and 1 (higher = more confident)

News:
{text}
"""
    gemini_response = ask_gemini(prompt)
    result = parse_gemini_json(gemini_response)

    return jsonify(result)

@app.route("/predict_file", methods=["POST"])
def predict_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if not file.filename:
        return jsonify({"error": "Empty filename"}), 400

    try:
        with tempfile.NamedTemporaryFile(delete=False) as tmp:
            file.save(tmp.name)
            file_path = tmp.name

        if file.filename.endswith(".pdf"):
            text = extract_text_from_pdf(file_path)
        elif file.filename.endswith(".txt"):
            text = file.read().decode("utf-8")
        else:
            return jsonify({"error": "Only PDF and TXT files are supported"}), 400

        if not text.strip():
            return jsonify({"error": "No readable text found in file"}), 400

        prompt = f"""
You are a strict fake news detector.
Analyze the following news and respond ONLY in valid JSON format with two fields:
- "prediction": either "FAKE" or "REAL"
- "confidence": a number between 0 and 1 (higher = more confident)

News:
{text[:3000]} (truncated)
"""
        gemini_response = ask_gemini(prompt)
        result = parse_gemini_json(gemini_response)

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ===== Run App =====
if __name__ == "__main__":
    app.run(debug=True, port=5000)
