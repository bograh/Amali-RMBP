# from flask import Flask
# from flask_cors import CORS
# from flask_restful import Api
# from routes import swagger
# from routes.chat import Chat
# from routes.translate import Translate

# app = Flask(__name__)
# api = Api(app)

# CORS(app)

# app.register_blueprint(swagger.swagger_ui_blueprint, url_prefix=swagger.SWAGGER_URL)

# api.add_resource(Chat, '/api/v1/chat')
# api.add_resource(Translate, '/api/v1/translate')

# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask, request
from flask_restful import Api
from routes import swagger
from routes.chat import Chat, AudioChat
from routes.translate import Translate
from models.message import db

app = Flask(__name__)
api = Api(app)

app.register_blueprint(swagger.swagger_ui_blueprint, url_prefix=swagger.SWAGGER_URL)

# @app._got_first_request
# def create_tables():
#     with app.app_context():
#         db.create_all()


api.add_resource(Chat, '/api/v1/chat')
api.add_resource(AudioChat, '/api/v1/chat/voice')
api.add_resource(Translate, '/api/v1/translate')


if __name__ == "__main__":
    app.run(debug=True)