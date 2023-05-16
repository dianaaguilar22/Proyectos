from ProyectosRest.ModuloPython.mongoDB import Conexion


def to_json_proyecto(proyecto):
    nuevo = {"Nombre": "", "Temas": "", "Fecha_Inicio": "","Fecha_Termina": "","Participantes": ""}
    nuevo["Nombre"] = str(proyecto.get("Nombre"))

    temas = []
    for t in proyecto.get("Temas"):
        temas.append(t)
    nuevo["Temas"] = temas
    nuevo["Fecha_Inicio"] = str(proyecto.get("Fecha_Inicio"))
    nuevo["Fecha_Termina"] = str(proyecto.get("Fecha_Termina"))

    participantes = []
    for p in proyecto.get("Participantes"):
        participantes.append(p)
    nuevo["Participantes"] = participantes
    return nuevo


class Proyecto:
    def __init__(self):
        self.cn = Conexion()

    def consultarProyectos(self):
        resp = {"Estatus": "", "Mensaje": ""}
        res = self.cn.proyectos.find({})
        proyectos = []
        for pro in res:
            print(pro)
            proyectos.append(to_json_proyecto(pro))

        if len(proyectos) > 0:
            resp["Estatus"] = "OK"
            resp["Mensaje"] = "Listado de Proyectos Chidos"
            resp["Proyectos"] = proyectos
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "Fallo"
        return resp
