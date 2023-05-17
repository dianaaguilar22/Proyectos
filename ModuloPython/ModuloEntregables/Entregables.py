from ProyectosRest.ModuloPython.mongoDB import Conexion


def to_json_entregable(entregable):
    nuevo = {"Nombre": "", "Temas": "", "Fecha_Inicio": "","Fecha_Termina": "","Participantes": ""}
    nuevo["Nombre"] = str(entregable.get("Nombre"))

    temas = []
    for t in entregable.get("Temas"):
        temas.append(t)
    nuevo["Temas"] = temas
    nuevo["Fecha_Inicio"] = str(entregable.get("Fecha_Inicio"))
    nuevo["Fecha_Termina"] = str(entregable.get("Fecha_Termina"))

    participantes = []
    for p in entregable.get("Participantes"):
        participantes.append(p)
    nuevo["Participantes"] = participantes
    return nuevo


class Entregables:
    def __init__(self):
        self.cn = Conexion()

    def consultarEntregable(self):
        resp = {"Estatus": "", "Mensaje": ""}
        res = self.cn.entregables.find_one({})
        entregables = []
        for ent in res:

            entregables.append(to_json_entregable(ent))

        if len(entregables) > 0:
            resp["Estatus"] = "OK"
            resp["Mensaje"] = "Listado de Entregables"
            resp["Proyectos"] = entregables
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "Fallo"
        return resp

