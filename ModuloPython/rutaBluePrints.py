from flask import blueprints, request

from ProyectosRest.ModuloPython.ModuloEntregables.Entregables import Entregables
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

@proyectosBP.route("/proyecto/entregable/<int:id>",methods=['GET'])
def mostrarEnt(id):
    ent=Entregables()
    return ent.consultarEntregable(id)

@proyectosBP.route("/proyecto/entregables",methods=['DELETE'])
def eliminarEnt():

    return "Hola"

@proyectosBP.route("/proyecto/proyectos/<int:id>", methods=['GET'])
def mostrarProyectos(id):
    pr = Proyecto()
    return pr.consultarProyectos(id)

@proyectosBP.route("/proyecto/proyectos/<int:id>", methods=['DELETE'])
def eliminarProyectos(id):
    pr = Proyecto()
    return pr.eliminarProyecto(id)

@proyectosBP.route("/proyecto/proyectos", methods=['POST'])
def insertarProyecto():
    pr = Proyecto()
    datos = request.get_json()
    return pr.agregarProyecto(datos)

@proyectosBP.route("/proyecto/proyectos", methods=['PUT'])
def modificarProyecto():
    pr = Proyecto()
    datos = request.get_json()
    return pr.modificarProyecto(datos)
