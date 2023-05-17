from datetime import datetime
from bson import ObjectId

from ProyectosRest.ModuloPython.mongoDB import Conexion





class Proyecto:
    def __init__(self):
        self.cn = Conexion()

    def consultarProyectos(self, id):
        resp = {"Estatus": "", "Mensaje": ""}
        res = self.cn.proyectos.find_one({"_id": id})
        proyectos = []
        for pro in res:
            print(pro)
            proyectos.append(self.to_json_proyecto(pro))

        if len(proyectos) > 0:
            resp["Estatus"] = "OK"
            resp["Mensaje"] = "Listado de Proyectos Chidos"
            resp["Proyectos"] = proyectos
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "Fallo"
        return resp

    def to_json_proyecto(self, proyecto):
        nuevo = {"Nombre": "", "Temas": "", "Fecha_Inicio": "", "Fecha_Termina": "", "Participantes": ""}
        nuevo["Nombre"] = str(proyecto.get("Nombre"))

        temas = []
        for t in proyecto.get("Temas"):
            temas.append(t)
        nuevo["Temas"] = temas
        nuevo["Fecha_Inicio"] = str(proyecto.get("Fecha_Inicio"))
        nuevo["Fecha_Termina"] = str(proyecto.get("Fecha_Termina"))

        participantes = []
        for p in proyecto.get("Participantes"):
            parti = {"Nombre": "", "Tipo": ""}
            par = self.cn.bd.persona.find_one({"_id":p.get("IdPersona")})
            print(par)
            parti["Nombre"] = par.get("Nombre")
            parti["Tipo"] = par.get("Tipo")
            participantes.append(parti)
        nuevo["Participantes"] = participantes
        return nuevo

    def eliminarProyecto(self, id_pro):
        resp = {"Estatus": "", "Mensaje": ""}
        res = self.cn.proyectos.delete_one({"_id": id_pro})

        if res.deleted_count > 0:
            resp["Estatus"] = "ok"
            resp["Mensaje"] = "El proyecto se elemino"
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "El proyecto no se encuentra o no existe"
        return resp

    def agregarProyecto(self, dato):
        resp = {"Estatus": "", "Mensaje": ""}
        existe = self.cn.proyectos.find_one({"_id": dato["_id"]})
        print(dato)
        if not(existe):
            try:
                fecha_inicio = datetime.strptime(dato["Fecha_Inicio"], '%d/%m/%y')
                print(fecha_inicio)
                fecha_termina = datetime.strptime(dato["Fecha_Termina"], '%d/%m/%y')
                print(fecha_termina)

                if fecha_inicio < fecha_termina:
                    self.cn.proyectos.insert_one(dato)
                    resp["Estatus"] = "Oki"
                    resp["Mensaje"] = "El proyecto se ingreso bien"
                else:
                    resp["Estatus"] = "Error"
                    resp["Mensaje"] = "La fecha de inicio es mayor a la de termino"
            except:
                resp["Estatus"] = "Error"
                resp["Mensaje"] = "La fecha esta mal ingresada"
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "El proyecto ya existe"

        return resp

    def modificarProyecto(self, dato):
        resp = {"Estatus": "", "Mensaje": ""}
        existe = self.cn.proyectos.find_one({"_id": dato["_id"]})
        if existe:
            try:
                fecha_inicio = datetime.strptime(dato["Fecha_Inicio"], '%d/%m/%y')
                print(fecha_inicio)
                fecha_termina = datetime.strptime(dato["Fecha_Termina"], '%d/%m/%y')
                print(fecha_termina)
                print(fecha_inicio < fecha_termina)
                if fecha_inicio < fecha_termina:
                    self.cn.proyectos.update_one({"_id": dato["_id"]}, {"$set": dato})
                    resp["Estatus"] = "Oki"
                    resp["Mensaje"] = "El proyecto se actualizo"
                else:
                    resp["Estatus"] = "Error"
                    resp["Mensaje"] = "La fecha de inicio es mayor a la de termino"
            except:
                resp["Estatus"] = "Error"
                resp["Mensaje"] = "La fecha esta mal ingresada"
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "El proyecto no existe"

        return resp
