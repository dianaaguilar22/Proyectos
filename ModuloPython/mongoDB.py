from pymongo import MongoClient


class Conexion:

    def __init__(self):
        self.cliente = MongoClient(
            "mongodb+srv://admin:admin@proyectos.bw10bli.mongodb.net/?retryWrites=true&w=majority")
        self.bd = self.cliente.Proyectos
        self.proyectos = self.bd.proyecto
        self.entregables = self.bd.entregables
        self.revisiones = self.bd.revisiones
        self.personas = self.bd.persona


    def validarLogin(self, usuario, password):
        user = self.bd.persona.find_one({"usuario": usuario, "password": password})
        if user:
            return user
        else:
            return None