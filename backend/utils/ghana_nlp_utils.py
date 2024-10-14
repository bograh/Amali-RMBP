import os
from ghana_nlp import GhanaNLP
from dotenv import load_dotenv

load_dotenv()
nlp = GhanaNLP(api_key=os.getenv("SUBSCRIPTION_KEY"))
FILE_NAME = "transl.mp3"
LANGUAGE_TO_TRANSLATE = "tw"
# text_to_translate = input("Enter text to translate: ")
text_to_translate = "Kofi is going to the market to buy rice."

def translate_to_tw(text):
    translated_text = nlp.translate(text, "en-tw")
    # text_to_speech(translated_text)
    return translated_text

def translate_to_en(text):
    return nlp.translate(text, language_pair="tw-en")

def text_to_speech(translated_text):
    audio_data = nlp.tts(translated_text, LANGUAGE_TO_TRANSLATE)
    with open(FILE_NAME, "wb") as file:
        file.write(audio_data)

def speech_to_text(audio_file_path):
    transcribed_info = nlp.stt(audio_file_path, LANGUAGE_TO_TRANSLATE)
    return transcribed_info

# translated_text = translate(text_to_translate)
# print(translated_text)