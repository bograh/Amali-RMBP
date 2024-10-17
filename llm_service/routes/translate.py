from flask import request
from flask_restful import Resource
from utils import ghana_nlp_utils as nlp
from utils.jwt_utils import jwt_required

class Translate(Resource):
    @jwt_required
    def post(self):
        try:
            data = request.get_json()
            if not data:
                return {"status": "failed", "message": "Invalid JSON data"}, 400
            text = data.get('text')
        
            if not text:
                return {"status": "failed", "message": "Missing fields"}, 400
            
            return {"status": "success", "translated_text": nlp.translate_to_tw(text)}, 200
        
        except Exception as e:
            return {"status": "failed", "message": str(e)}, 500