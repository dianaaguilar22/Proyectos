from ProyectosRest.ModuloPython.mongoDB import Conexion
from datetime import datetime

class Revisiones:
    def __init__(self):
        self.cn = Conexion()

    #------------------------------Consultar------------------------------
    def consultarRevision(self, id):
        resp = {"Estatus": "", "Mensaje": ""}
        res = self.cn.revisiones.find_one({"_id": id})

        if res:
            resp["Estatus"] = "OK"
            resp["Mensaje"] = "Listado de Revisiones Chidas"
            resp["Proyectos"] = self.to_json_revision(res)
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "Fallo"
        return resp


    def consultarRevisionTodos(self):
        resp = {"Estatus": "", "Mensaje": ""}
        res = self.cn.revisiones.find({})

        lista = []

        for r in res:
            nuevo = self.to_json_revision(r)
            lista.append(nuevo)
        if res:
            resp["Estatus"] = "OK"
            resp["Mensaje"] = "Listado de Revisiones Chidas"
            resp["Revisiones"] = lista
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "Fallo"
        return resp

    #------------------------------ToJson ------------------------------

    def to_json_revision(self, revi):
        nuevo = {"Fecha": "","id": "", "IdProyecto": str(revi.get("IdProyecto")), "FechaIni": str(revi.get("FechaIni")),
                 "FechaTer": str(revi.get("FechaTer")), "Observaciones": "", "IdPersona": "", "Estatus": ""}

        observaciones = []
        for o in revi.get("Observaciones"):
            par = {"Comentario":"", "Estatus":""}
            par["Comentario"] = str(o.get("Comentario"))
            par["Estatus"] = str(o.get("Estatus"))
            observaciones.append(par)
        nuevo["Observaciones"] = observaciones
        nuevo["IdPersona"] = str(revi.get("IdPersona"))
        nuevo["Estatus"] = str(revi.get("Estatus"))
        nuevo["id"]= str(revi.get("_id"))
        nuevo["Fecha"] = str(revi.get("Fecha"))
        return nuevo

    # ------------------------------Agregar ------------------------------

    def agregarRevision(self, dato):
        resp = {"Estatus": "", "Mensaje": ""}
        existeRev = self.cn.revisiones.find_one({"_id": dato["_id"]})
        existeProy = self.cn.proyectos.find_one({"_id": dato["IdProyecto"]})
        print(dato)
        if existeProy:
            if not (existeRev):
                try:
                    self.cn.revisiones.insert_one(dato)
                    resp["Estatus"] = "Oki"
                    resp["Mensaje"] = "La revision se ingreso bien"
                except:
                    resp["Estatus"] = "Error"
                    resp["Mensaje"] = "La fecha esta mal ingresada"
            else:
                resp["Estatus"] = "Error"
                resp["Mensaje"] = "La revision ya existe"
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "No existe el proyecto al que le quieres agregar la revision"

        return resp

    # ------------------------------Modificar ------------------------------

    def modificarRevision(self, dato):
        resp = {"Estatus": "", "Mensaje": ""}
        existeRev = self.cn.revisiones.find_one({"_id": dato["_id"]})
        existeProy = self.cn.proyectos.find_one({"_id": dato["IdProyecto"]})
        print(dato)
        if existeProy:
            if (existeRev):
                try:
                    self.cn.revisiones.update_one({"_id": dato["_id"]}, {"$set": dato})
                    resp["Estatus"] = "Oki"
                    resp["Mensaje"] = "La revision se modifico bien"
                except:
                    resp["Estatus"] = "Error"
                    resp["Mensaje"] = "La fecha esta mal ingresada"
            else:
                resp["Estatus"] = "Error"
                resp["Mensaje"] = "La revision no existe"
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "No existe el proyecto al que le quieres agregar la revision"

        return resp

    # ------------------------------Eliminar------------------------------

    def eliminarRevision(self, id):
        resp = {"Estatus": "", "Mensaje": ""}
        res = self.cn.revisiones.delete_one({"_id": id})

        if res.deleted_count > 0:
            resp["Estatus"] = "ok"
            resp["Mensaje"] = "La revision se elimino"
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "La revision no se encuentra o no existe"
        return resp