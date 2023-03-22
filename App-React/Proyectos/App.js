import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StyleSheet, Text, View } from "react-native";
import Home from "./Pantallas_Utilidades/Home";
import Consultar_Proyectos from "./Proyectos_Modulo/Consultar_Proyectos";
import Eliminar_Proyectos from "./Proyectos_Modulo/Eliminar_Proyectos";
import Menu_Proyectos from "./Proyectos_Modulo/Menu_Proyectos";
import Modificar_Proyectos from "./Proyectos_Modulo/Modificar_Proyectos";
import Registrar_Proyectos from "./Proyectos_Modulo/Registrar_Proyectos";



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Proyectos" component={Home} />
        <Stack.Screen name="MenuProyectos" component={Menu_Proyectos} />
        <Stack.Screen name="EliminarProyectos" component={Eliminar_Proyectos} />
        <Stack.Screen name="RegistrarProyecto" component={Registrar_Proyectos} />
        <Stack.Screen name="ConsultarProyecto" component={Consultar_Proyectos} />
        <Stack.Screen name="ModificarProyecto" component={Modificar_Proyectos} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


