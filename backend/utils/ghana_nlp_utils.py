import os
from ghana_nlp import GhanaNLP
from dotenv import load_dotenv

load_dotenv()
nlp = GhanaNLP(api_key=os.getenv("SUBSCRIPTION_KEY"))
FILE_NAME = "output.mp3"
LANGUAGE_TO_TRANSLATE = "tw"

def translate_to_tw(text):
    translated_text = nlp.translate(text, "en-tw")
    return translated_text

def translate_to_en(text):
    translated_text = nlp.translate(text, language_pair="tw-en")
    return translated_text

def text_to_speech(translated_text):
    audio_data = nlp.tts(translated_text, LANGUAGE_TO_TRANSLATE)
    with open(FILE_NAME, "wb") as file:
        file.write(audio_data)

def speech_to_text(audio_file_path):
    transcribed_info = nlp.stt(audio_file_path, LANGUAGE_TO_TRANSLATE)
    return transcribed_info