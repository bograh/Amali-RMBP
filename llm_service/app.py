from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from routes import swagger
from routes.chat import Chat, AudioChat, Person
from routes.translate import Translate

app = Flask(__name__)
api = Api(app)

CORS(app)

app.register_blueprint(swagger.swagger_ui_blueprint, url_prefix=swagger.SWAGGER_URL)


api.add_resource(Chat, '/api/v1/chat')
api.add_resource(AudioChat, '/api/v1/chat/voice')
api.add_resource(Translate, '/api/v1/translate')

api.add_resource(Person, '/person')


if __name__ == "__main__":
    app.run(debug=True)