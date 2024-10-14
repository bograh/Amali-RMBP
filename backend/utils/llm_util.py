import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"),)
MODEL=os.getenv("MODEL")

def prompt_llm(prompt):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "Summarize the response in not more than 3 sentences",
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        model=MODEL
    )
    return chat_completion.choices[0].message.content

print(prompt_llm("Explain the importance of fast language models"))