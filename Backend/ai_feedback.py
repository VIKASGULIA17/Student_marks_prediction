import os
from dotenv import load_dotenv  # ✅ ADD THIS
load_dotenv()  # ✅ ADD THIS

from openai import OpenAI

# ✅ Now your env variable is available!
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

client = OpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1"  # Required for OpenRouter!
)

def generate_feedback(student_data: dict) -> str:
    model = "mistralai/mistral-7b-instruct"

    prompt = f"""
    The student data is: {student_data}
    Analyze it and generate feedback categories with scores, status, tips, strengths.
    Return JSON format like:
    {{
      "feedback": [
        {{
          "title": "...",
          "score": ...,
          "status": "...",
          "tips": ["..."],
          "strengths": ["..."]
        }},
        ...
      ]
    }}
    """

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": "You are a helpful educational coach."},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content
