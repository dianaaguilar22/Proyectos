from datetime import datetime

from bson import ObjectId

from ProyectosRest.ModuloPython.mongoDB import Conexion


class Proyecto:
    def __init__(self):
        self.cn = Conexion()

    def consultarProyectos(self, id):
        resp = {"Estatus": "", "Mensaje": ""}
        res = self.cn.proyectos.find_one({"_id": id})
        print(res)
        if res:
            resp["Estatus"] = "OK"
            resp["Mensaje"] = "Proyectos Chidos"
            resp["Proyectos"] = self.to_json_proyecto(res)
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "No existe el proyecto"
        return resp

    def consultarProyectoTodos(self):
        resp = {"Estatus": "", "Mensaje": ""}
        res = self.cn.proyectos.find({})
        lista = []

        for p in res:
            print(p)
            if p is not None:
                nuevo = self.to_json_proyecto(p)
                lista.append(nuevo)
        if res:
            resp["Estatus"] = "OK"
            resp["Mensaje"] = "Proyectos Chidos"
            resp["Proyectos"] = lista
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "No existe el proyecto"
        return resp

    def to_json_proyecto(self, proyecto):
        nuevo = {"id": "", "Nombre": "", "Temas": "", "Fecha_Inicio": "", "Fecha_Termina": "", "Participantes": ""}
        nuevo["Nombre"] = str(proyecto.get("Nombre"))
        nuevo["id"] = str(proyecto.get("_id"))
        temas = []
        for t in proyecto.get("Temas"):
            temas.append(t)
        nuevo["Temas"] = temas
        nuevo["Fecha_Inicio"] = str(proyecto.get("Fecha_Inicio"))
        nuevo["Fecha_Termina"] = str(proyecto.get("Fecha_Termina"))

        participantes = []
        for p in proyecto.get("Participantes"):
            parti = {"Nombre": "", "Tipo": ""}

            par = self.cn.bd.persona.find_one({"_id": p.get("IdPersona")})
            print(par)
            if par is not None:
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

        print(dato)

        try:
            fecha_inicio = datetime.strptime(dato["Fecha_Inicio"], '%d/%m/%Y')
            print(fecha_inicio)
            fecha_termina = datetime.strptime(dato["Fecha_Termina"], '%d/%m/%Y')
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

        return resp

    def modificarProyecto(self, dato):
        resp = {"Estatus": "", "Mensaje": ""}
        existe = self.cn.proyectos.find_one({"_id": ObjectId(dato["_id"])})

        if existe:
            try:
                fecha_inicio = datetime.strptime(dato["Fecha_Inicio"], '%d/%m/%Y')
                print(fecha_inicio)
                fecha_termina = datetime.strptime(dato["Fecha_Termina"], '%d/%m/%Y')
                print(fecha_termina)
                print(fecha_inicio < fecha_termina)

                print("Si entro")
                if fecha_inicio < fecha_termina:
                    id = dato["_id"]
                    del dato["_id"]
                    self.cn.proyectos.update_one({"_id":  ObjectId(id)}, {"$set": dato})
                    resp["Estatus"] = "Oki"
                    resp["Mensaje"] = "El proyecto se actualizo"
                else:
                    resp["Estatus"] = "Error"
                    resp["Mensaje"] = "La fecha de inicio es mayor a la de termino"
            except NameError:
                resp["Estatus"] = "Error"
                resp["Mensaje"] = str(NameError)
        else:
            resp["Estatus"] = "Error"
            resp["Mensaje"] = "El proyecto no existe"

        return resp
