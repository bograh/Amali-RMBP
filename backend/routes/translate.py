from flask import Blueprint, jsonify, request
# from utils import ghana_nlp_utils as nlp
from utils import translate_util as nlp
import random
from uuid import uuid4


bp = Blueprint("translate", __name__, url_prefix="/api/v1")


@bp.route('/translate', methods=['POST'])
def translate_route():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "failed", "message": "Invalid JSON data"}), 400
        text = data.get('text')
    
        if not text:
            return jsonify({"status": "failed", "message": "Missing fields"}), 400
        
        return jsonify({
            "status": "success", "translated_text": nlp.translate_to_tw(text)}), 200
    
    except Exception as e:
        return jsonify({
            "status": "failed", "message": str(e)}), 500


@bp.route("/translate-audio", methods=['POST'])
def translate_audio():
    file_path = f"static/audios/{uuid4()}.mp3"
    f = request.files['audio']
    f.save(file_path)
    output = nlp.speech_to_text(file_path)
    return jsonify({"status": "success", "transcription": output, "translation": nlp.translate_to_en(output)})




    
    