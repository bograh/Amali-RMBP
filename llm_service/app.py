from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from routes import swagger
from routes.chat import Chat
from routes.translate import Translate

app = Flask(__name__)
api = Api(app)

CORS(app)

app.register_blueprint(swagger.swagger_ui_blueprint, url_prefix=swagger.SWAGGER_URL)

api.add_resource(Chat, '/api/v1/chat')
api.add_resource(Translate, '/api/v1/translate')

if __name__ == "__main__":
    app.run(debug=True)
