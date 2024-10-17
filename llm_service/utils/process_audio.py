from . import ghana_nlp_utils as nlp
from . import llm_util as llm

def process_audio(file_path_input, file_path_output):
    try:
        msg = nlp.speech_to_text(file_path_input)
        prompt = nlp.translate_to_en(msg)
        llm_response = llm.prompt_llm(prompt)
        translated_llm_response = nlp.translate_to_tw(llm_response)
        nlp.text_to_speech(translated_llm_response, file_path_output)
    except Exception as e:
        print(f"Error processing audio: {str(e)}")