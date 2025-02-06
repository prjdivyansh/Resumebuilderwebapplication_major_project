from flask import Flask, request, jsonify
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Set your OpenAI API Key
openai.api_key = "your-openai-api-key"

@app.route("/generate", methods=["POST"])
def generate_resume():
    data = request.get_json()
    name = data.get("name", "")
    experience = data.get("experience", "")
    skills = data.get("skills", "")
    
    prompt = f"""
    Generate a professional resume for:
    Name: {name}
    Experience: {experience} years
    Skills: {skills}
    Format it in a professional manner.
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    resume_text = response["choices"][0]["message"]["content"].strip()
    
    return jsonify({"resume": resume_text})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
