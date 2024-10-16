import os
from uuid import uuid4
from flask import request
from flask_restful import Resource
from utils import ghana_nlp_utils as nlp
from utils import llm_util as llm
from models.message import db, Message

class Chat(Resource):
    def post(self):
        data = request.get_json()
        if not data:
            return {"status": "failed", "message": "Invalid JSON data"}, 400

        msg = data.get("message")
        if not msg:
            return {"status": "failed", "message": "Missing JSON fields"}, 400
        
        try:
            prompt = nlp.translate_to_en(msg)
            llm_response = llm.prompt_llm(prompt)
            translated_llm_response = nlp.translate_to_tw(llm_response)

            return {"status": "success", "response": translated_llm_response}
        
        except Exception as e:
            return {"status": "failed", "message": str(e)}, 500


# def add_message():
#     user_id = 10000

#     new_message = Message(user_id=user_id)
#     db.session.add(new_message)
#     db.session.commit()

#     return {"status": "success", "message_id": new_message.id}, 201

class AudioChat(Resource):
    def post(self):
        _file_id = uuid4()
        input_dir = 'static/audios/input/'
        output_dir = 'static/audios/output/'

        os.makedirs(input_dir, exist_ok=True)
        os.makedirs(output_dir, exist_ok=True)

        file_path_input = os.path.join(input_dir, f"{_file_id}.mp3")
        file_path_output = os.path.join(input_dir, f"{_file_id}.mp3")
        file = request.files.get("audio_message")

        if not file:
            return {"status": "failed", "message": "No file sent"}, 400
        file.save(file_path_input)

        try:
            msg = nlp.speech_to_text(file_path_input)
            # print(msg) # Debugging line
            prompt = nlp.translate_to_en(msg)
            llm_response = llm.prompt_llm(prompt)
            translated_llm_response = nlp.translate_to_tw(llm_response)

            return {"status": "success", "response": translated_llm_response}
        except Exception as e:
            return {"status": "failed", "message": str(e)}, 500