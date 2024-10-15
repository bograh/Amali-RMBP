import os
from dotenv import load_dotenv
import requests

load_dotenv()
SUB_KEY = os.getenv("SUBSCRIPTION_KEY")
API_URL = "https://translation-api.ghananlp.org/v1/translate"
FILE_NAME = "transl.mp3"

HEADERS = {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": SUB_KEY
}


def translate_to_tw(input_text):
    body = {
        "in": input_text,
        "lang": "en-tw"
    }
    response = requests.post(API_URL, json=body, headers=HEADERS)
    if response.status_code == 200:
        translated_text = response.text
        return translated_text
    print(f"Error: {response.text}")

    return None

def translate_to_en(input_text):
    body = {
        "in": input_text,
        "lang": "tw-en"
    }
    response = requests.post(API_URL, json=body, headers=HEADERS)
    if response.status_code == 200:
        translated_text = response.text
        return translated_text
    print(f"Error: {response.text}")

    return None

def text_to_speech(input_text):
    api_url = "https://translation-api.ghananlp.org/tts/v1/tts"
    body = {
        "text": input_text,
        "language": "tw"
    }
    response = requests.post(api_url, json=body, headers=HEADERS)
    if response.status_code == 200:
        audio_data = response.content
        with open(FILE_NAME, "wb") as file:
            file.write(audio_data)
    else:
        print(f"Error: An error occured")

    return None

def speech_to_text(file_path):
    api_url = "https://translation-api.ghananlp.org/asr/v1/transcribe?language=tw"
    
    with open(file_path, "rb") as audio_file:
        binary = audio_file.read()
    
    headers = {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": SUB_KEY
    }
    files = {
        "file": (file_path, binary)  # Specify the content type
    }

    response = requests.post(api_url, data=binary, headers=headers)
    if response.status_code == 200:
        transcription_result = response.json()
        return transcription_result
    else:
        print(f"Error: {response.status_code} - {response.text}")

    return None