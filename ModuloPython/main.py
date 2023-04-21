
from flask import Flask
from ModuloProyectos.Proyectos import Proyecto
app = Flask(__name__)



@app.route("/")
def home():
    return "<h1> HomePage </h1>"


@app.route("/Proyecto/Revisiones")
#Aquí va las funciones


@app.route("/Proyecto/Entregables")


@app.route("/Proyecto/Proyectos", methods=['GET'])
def mostrar():
    return Proyecto.proyectos()