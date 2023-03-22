import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Pantallas_Utilidades/Home";
import Consultar_Proyectos from "./Proyectos_Modulo/Consultar_Proyectos";
import Eliminar_Proyectos from "./Proyectos_Modulo/Eliminar_Proyectos";
import Menu_Proyectos from "./Proyectos_Modulo/Menu_Proyectos";
import Modificar_Proyectos from "./Proyectos_Modulo/Modificar_Proyectos";
import Registrar_Proyectos from "./Proyectos_Modulo/Registrar_Proyectos";
import Consultar_Revision from "./Revisiones/Consultar_Revisiones";
import Eliminar_Revision from "./Revisiones/Eliminar_Revisiones";
import Menu_Revisiones from "./Revisiones/Menu_Revisiones";
import Modificar_Revision from "./Revisiones/Modificar_Revisiones";
import Registrar_Revision from "./Revisiones/Registrar_Revisiones";
import Ent_Agregar from "./Ui_Entrgables/Ent_Agregar";
import Ent_Consultar from "./Ui_Entrgables/Ent_Consultar";
import Menu_Entregables from "./Ui_Entrgables/Ent_Menu";
import Ent_Modificar from "./Ui_Entrgables/Ent_Modificar";



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MenuProyectos" component={Menu_Proyectos} />
        <Stack.Screen name="EliminarProyectos" component={Eliminar_Proyectos} />
        <Stack.Screen name="RegitrarProyectos" component={Registrar_Proyectos} />
        <Stack.Screen name="ConsultarProyecto" component={Consultar_Proyectos} />
        <Stack.Screen name="ModificarProyecto" component={Modificar_Proyectos} />

        <Stack.Screen name="MenuRevisiones" component={Menu_Revisiones} />
        <Stack.Screen name="EliminarRevision" component={Eliminar_Revision} />
        <Stack.Screen name="ConsultarRevision" component={Consultar_Revision} />
        <Stack.Screen name="ResgitrarRevision" component={Modificar_Revision} />
        <Stack.Screen name="ModificarRevision" component={Registrar_Revision} />


        <Stack.Screen name="MenuEntregables" component={Menu_Entregables} />
        <Stack.Screen name="Ent_Agregar" component={Ent_Agregar} />
        <Stack.Screen name="Ent_Consultar" component={Ent_Consultar} />
        <Stack.Screen name="Ent_Eliminar" component={Ent_Consultar} />
        <Stack.Screen name="Ent_Modificar" component={Ent_Modificar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


