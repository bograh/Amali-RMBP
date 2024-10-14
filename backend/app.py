from flask import Flask, jsonify, render_template
from routes import translate, swagger, llm


app = Flask(__name__)

app.register_blueprint(translate.bp)
app.register_blueprint(llm.bp)
app.register_blueprint(swagger.swagger_ui_blueprint, url_prefix=swagger.SWAGGER_URL)

@app.route("/")
def index():
    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)
 





