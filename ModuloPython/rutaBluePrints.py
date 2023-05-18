from flask import blueprints, request
from flask_httpauth import HTTPBasicAuth
from ProyectosRest.ModuloPython.ModuloEntregables.Entregables import Entregables
from ProyectosRest.ModuloPython.ModuloProyectos.Proyectos import Proyecto
from ProyectosRest.ModuloPython.ModuloRevisiones.Revisiones import Revisiones
from ProyectosRest.ModuloPython.mongoDB import Conexion

proyectosBP = blueprints.Blueprint("Proyectos", __name__)

auth = HTTPBasicAuth()


@auth.verify_password
def login(username, password):
    cn = Conexion()
    user = cn.validarLogin(usuario=username, password=password)
    if user is not None:
        return user
    else:
        return False


@auth.get_user_roles
def get_user_role(user):
    return user["Tipo"]


@auth.error_handler
def error_handler():
    return {"Estatus": "Error", "Mensaje": "No tiene autorizacion para realizar la ejecucion"}


# Aquí va las funciones


@proyectosBP.route("/proyecto/entregables", methods=['POST'])
@auth.login_required(role="Alumno")
def agregarEnt():
    ent = Entregables()
    datos = request.get_json()
    return ent.agregarEntregable(datos)


@proyectosBP.route("/proyecto/entregables", methods=['PUT'])
@auth.login_required(role="Alumno")
def modificarEnt():
    ent = Entregables()
    datos = request.get_json()
    return ent.modificarEntregable(datos)


@proyectosBP.route("/proyecto/entregables/<int:id>", methods=['GET'])
@auth.login_required(role=["Alumno", "Docente"])
def mostrarEnt(id):
    ent = Entregables()
    return ent.consultarEntregable(id)


@proyectosBP.route("/proyecto/entregables/<int:id>", methods=['DELETE'])
@auth.login_required(role="Alumno")
def eliminarEnt(id):
    en = Entregables()
    return en.eliminarEntregable(id)


@proyectosBP.route("/proyecto/proyectos/<int:id>", methods=['GET'])
@auth.login_required(role=["Alumno", "Docente"])
def mostrarProyectos(id):
    pr = Proyecto()
    return pr.consultarProyectos(id)


@proyectosBP.route("/proyecto/proyectos/<int:id>", methods=['DELETE'])
@auth.login_required(role="Alumno")
def eliminarProyectos(id):
    pr = Proyecto()
    return pr.eliminarProyecto(id)


@proyectosBP.route("/proyecto/proyectos", methods=['POST'])
@auth.login_required(role="Alumno")
def insertarProyecto():
    pr = Proyecto()
    datos = request.get_json()
    return pr.agregarProyecto(datos)


# ------------------------Revisiones------------------------

@proyectosBP.route("/proyecto/revisiones/<int:id>", methods=['GET'])
@auth.login_required(role=["Alumno", "Docente"])
def mostrarRevisiones(id):
    re = Revisiones()
    return re.consultarRevision(id)


@proyectosBP.route("/proyecto/revisiones", methods=["POST"])
@auth.login_required(role="Docente")
def insertarRevision():
    re = Revisiones()
    datos = request.get_json()
    return re.agregarRevision(datos)


@proyectosBP.route("/proyecto/revisiones/<int:id>", methods=["DELETE"])
@auth.login_required(role="Docente")
def eliminarRevision(id):
    re = Revisiones()
    return re.eliminarRevision(id)


@proyectosBP.route("/proyecto/revisiones/<int:id>", methods=["PUT"])
@auth.login_required(role="Docente")
def modicarRevisiones(id):
    re = Revisiones()
    return re.modificarRevision(id)
