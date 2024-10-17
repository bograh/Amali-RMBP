import os
import threading
import time
from uuid import uuid4
from flask import request
from flask_restful import Resource
from utils import ghana_nlp_utils as nlp
from utils import llm_util as llm
from utils.jwt_utils import jwt_required
from utils.process_audio import process_audio

class Chat(Resource):
    @jwt_required
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


class AudioChat(Resource):
    @jwt_required
    def post(self):
        _file_id = str(uuid4())
        input_dir = 'static/audios/input/'
        output_dir = 'static/audios/output/'

        os.makedirs(input_dir, exist_ok=True)
        os.makedirs(output_dir, exist_ok=True)

        file_path_input = os.path.join(input_dir, f"{_file_id}.mp3")
        file = request.files.get("audio_message")

        if not file:
            return {"status": "failed", "message": "No message sent"}, 400

        file.save(file_path_input)
        file_path_output = os.path.join(output_dir, f"{_file_id}.mp3")

        threading.Thread(target=process_audio, args=(file_path_input, file_path_output)).start()

        return {"status": "processing", "msg_id": _file_id}, 202

    @jwt_required        
    def get(self):
        msg_id = request.args.get('msg_id')
        file_path = f"static/audios/output/{msg_id}.mp3"

        while not os.path.exists(file_path):
            time.sleep(1)

        return {"status": "completed", "file_path": file_path}, 200


class Person(Resource):
    @jwt_required
    def get(self):
        return {"username": "Jack", "id": str(uuid4())}