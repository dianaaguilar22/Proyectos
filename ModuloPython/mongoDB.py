from pymongo import MongoClient

class Conexion():

    def __init__(self):
        self.cliente = MongoClient()
        self.bd = self.cliente.titulaTec
        self.col=self.bd.proyectos()