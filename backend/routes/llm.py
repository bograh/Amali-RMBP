from flask import Blueprint, jsonify, request
from utils import llm_util as llm

bp = Blueprint("llm", __name__, url_prefix="/api/v1")

@bp.route('/ask-prompt', methods=['POST'])
def ask_prompt():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "failed", "message": "Invalid JSON data"}), 400
        prompt = data.get('prompt')
    
        if not prompt:
            return jsonify({"status": "failed", "message": "Missing fields"}), 400
        
        return jsonify({
            "status": "success", "translated_text": llm.prompt_llm(prompt)}), 200
    
    except Exception as e:
        return jsonify({
            "status": "failed", "message": str(e)}), 500



    
    