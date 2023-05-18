from ProyectosRest.ModuloPython.mongoDB import Conexion
from datetime import datetime

def to_json_entregable(entregable):
    consulta = { "Fecha_Programada": "", "Fecha_entregado": "", "Observaciones": "","Archivo": ""}
    consulta["Fecha_Programada"] = str(entregable.get("Fecha_Programada"))
    consulta["Fecha_entregado"]=str(entregable.get("Fecha_entregado"))
    consulta["Observaciones"]=str (entregable.get("Observaciones"))
    consulta["Archivo"]=str (entregable.get("Archivo"))

    return consulta


class Entregables:
    def __init__(self):
        self.cn = Conexion()

    def consultarEntregable(self,id):
        resp = {"Estatus": "", "Mensaje": ""}
        res = self.cn.entregables.find_one({"_id": id})


        print(res)
        if res:
            resp["Estatus"] = "OK"
            resp["Mensaje"] = "Si existe el entregable"
            resp["Entregables"] = to_json_entregable(res)
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "Fallo"
        return resp

    def agregarEntregable(self, dato):
        resp = {"Estatus": "", "Mensaje": ""}
        existe = self.cn.entregables.find_one({"_id": dato["_id"]})
        print(dato)
        if not (existe):
            try:
                fecha_programada = datetime.strptime(dato["Fecha_Programada"], '%d/%m/%y')
                print(fecha_programada)
                fecha_entregado = datetime.strptime(dato["Fecha_entregado"], '%d/%m/%y')
                print(fecha_entregado)
                self.cn.entregables.insert_one(dato)
                resp["Estatus"] = "Oki"
                resp["Mensaje"] = "El entregable se ingreso bien"

            except:
                resp["Estatus"] = "Error"
                resp["Mensaje"] = "La fecha no es correcta"
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "El entregable ya existe"

        return resp

    def eliminarEntregable(self,id):
        resp = {"Estatus": "", "Mensaje": ""}
        res = self.cn.entregables.find_one({"_id": id})


        print(res)
        if res:
            self.cn.entregables.delete_one({"_id": id})
            resp["Estatus"] = "OK"
            resp["Mensaje"] = "Se elimino el entregable"
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "El entregable no existe"
        return resp




