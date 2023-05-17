from flask import blueprints, request
from ProyectosRest.ModuloPython.ModuloProyectos.Proyectos import Proyecto


proyectosBP = blueprints.Blueprint("Proyectos", __name__)



@proyectosBP.route("/proyecto/revisiones")
def mostrarRev():
    return "Hola en Revsiones"


# Aquí va las funciones

@proyectosBP.route("/proyecto/entregables")
def mostrarEnt():
    return "Hola"


@proyectosBP.route("/proyecto/proyectos", methods=['GET'])
def mostrarProyectos():
    pr = Proyecto()
    return pr.consultarProyectos()

@proyectosBP.route("/proyecto/proyectos/<int:id>", methods=['DELETE'])
def eliminarProyectos(id):
    pr = Proyecto()
    return pr.eliminarProyecto(id)

@proyectosBP.route("/proyecto/proyectos", methods=['POST'])
def insertar():
    pr = Proyecto()
    datos = request.get_json()
    return pr.agregarProyecto(datos)
