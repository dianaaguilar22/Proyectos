from ProyectosRest.ModuloPython.mongoDB import Conexion


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

