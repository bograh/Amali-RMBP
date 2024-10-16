from flask import request
from flask_restful import Resource
from utils import ghana_nlp_utils as nlp
from utils import llm_util as llm

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