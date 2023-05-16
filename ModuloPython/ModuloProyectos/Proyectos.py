from ProyectosRest.ModuloPython.mongoDB import Conexion


class Proyecto:
    def __init__(self):
        self.cn = Conexion()

    def consultarProyectos(self):
        resp = {"Estatus": "", "Mensaje": ""}
        res = self.cn.proyectos.find({})
        proyectos = []
        for pro in res:
            print(pro)
        if len(proyectos) > 0:
            resp["Estatus"] = "OK"
            resp["Mensaje"] = "Listado de Proyectos Chidos"
            resp["Proyectos"] = proyectos
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "Fallo"
        return resp
