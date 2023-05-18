from ProyectosRest.ModuloPython.mongoDB import Conexion
from datetime import datetime

class Revisiones:
    def __init__(self):
        self.cn = Conexion()

    #------------------------------Consultar------------------------------
    def consultarRevision(self, id):
        resp = {"Estatus": "", "Mensaje": ""}
        res = self.cn.revisiones.find_one({"_id": id})
        revisiones = []
        for rev in res:
            print(rev)
            revisiones.append(self.to_json_revision(rev))

        if len(revisiones) > 0:
            resp["Estatus"] = "OK"
            resp["Mensaje"] = "Listado de Revisiones Chidas"
            resp["Proyectos"] = revisiones
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "Fallo"
        return resp

    #------------------------------ToJson ------------------------------

    def to_json_revision(self, revi):
        nuevo = {"Fecha": "", "IdProyecto": "", "Observaciones": "", "Porcentaje": ""}

        nuevo["Fecha"] = str(revi.get("Fecha"))
        nuevo["IdProyecto"] = str(revi.get("IdProyecto"))
        observaciones = []
        for o in revi.get("Observaciones"):
            observaciones.append(o)
        nuevo["Observaciones"] = observaciones
        nuevo["Porcentaje"] = str(revi.get("Porcentaje"))

        return nuevo

    # ------------------------------Agregar ------------------------------

    def agregarRevision(self, dato):
        resp = {"Estatus": "", "Mensaje": ""}
        existe = self.cn.revisiones.find_one({"_id": dato["_id"]})
        print(dato)
        if not (existe):
            try:
                fecha = datetime.strptime(dato["Fecha"], '%d/%m/%y')
                print(fecha)
                hoy = datetime.now()

                if fecha <= hoy:
                    self.cn.revisiones.insert_one(dato)
                    resp["Estatus"] = "Oki"
                    resp["Mensaje"] = "La revision se ingreso bien"
                else:
                    resp["Estatus"] = "Error"
                    resp["Mensaje"] = "La fecha es mayor a la de hoy"
            except:
                resp["Estatus"] = "Error"
                resp["Mensaje"] = "La fecha esta mal ingresada"
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "La revision ya existe"

        return resp

    # ------------------------------Modificar ------------------------------

    def modificarRevision(self, dato):
        resp = {"Estatus": "", "Mensaje": ""}
        existe = self.cn.revisiones.find_one({"_id": dato["_id"]})
        print(dato)
        if (existe):
            try:
                fecha = datetime.strptime(dato["Fecha"], '%d/%m/%y')
                print(fecha)
                hoy = datetime.now()

                if fecha <= hoy:
                    self.cn.revisiones.update_one({"_id": dato["_id"]}, {"$set": dato})
                    resp["Estatus"] = "Oki"
                    resp["Mensaje"] = "La revision se modifico bien"
                else:
                    resp["Estatus"] = "Error"
                    resp["Mensaje"] = "La fecha es mayor a la de hoy"
            except:
                resp["Estatus"] = "Error"
                resp["Mensaje"] = "La fecha esta mal ingresada"
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "La revision no existe"

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