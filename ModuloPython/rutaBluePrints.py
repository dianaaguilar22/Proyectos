from flask import blueprints, request
from ProyectosRest.ModuloPython.ModuloProyectos.Proyectos import Proyecto


proyectosBP = blueprints.Blueprint("Proyectos", __name__)



@proyectosBP.route("/proyecto/revisiones")
def mostrarRev():
    return "Hola en Revsiones"


# Aquí va las funciones

@proyectosBP.route("/proyecto/entregables",methods=['POST'])
def agregarEnt():
    return "Hola"

@proyectosBP.route("/proyecto/entregables",methods=['PUT'])
def modificarEnt():
    return "Hola"

@proyectosBP.route("/proyecto/entregables",methods=['GET'])
def mostrarEnt():
    return "Hola"

@proyectosBP.route("/proyecto/entregables",methods=['DELETE'])
def eliminarEnt():
    cn=Conexion()
    return cn.eliminarEnt()

@proyectosBP.route("/proyecto/proyectos", methods=['GET'])
def mostrar():
    pr = Proyecto()
    return pr.consultarProyectos()


@proyectosBP.route("/proyecto/proyectos", methods=['POST'])
def insertar():
    datos = request.get_json()
    return
