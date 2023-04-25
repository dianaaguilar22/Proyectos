
from flask import Flask
from ModuloProyectos.Proyectos import Proyecto
from rutaBluePrints import proyectosBP


app = Flask(__name__)

app.register_blueprint(proyectosBP)

@app.route("/")
def home():
    return "<h1> HomePage </h1>"





if __name__=='__main__':
    app.run(debug=True)