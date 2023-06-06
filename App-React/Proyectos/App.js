import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Pantallas_Utilidades/Home";
import Consultar_Proyectos from "./Proyectos_Modulo/Consultar_Proyectos";
import Menu_Proyectos from "./Proyectos_Modulo/Menu_Proyectos";
import Modificar_Proyectos from "./Proyectos_Modulo/Modificar_Proyectos";
import Registrar_Proyectos from "./Proyectos_Modulo/Registrar_Proyectos";
import Consultar_Revision from "./Revisiones/Consultar_Revisiones";
import Menu_Revisiones from "./Revisiones/Menu_Revisiones";
import Modificar_Revision from "./Revisiones/Modificar_Revisiones";
import Registrar_Revision from "./Revisiones/Registrar_Revisiones";
import Ent_Agregar from "./Ui_Entrgables/Ent_Agregar";
import Ent_Consultar from "./Ui_Entrgables/Ent_Consultar";
import Menu_Entregables from "./Ui_Entrgables/Ent_Menu";
import Ent_Modificar from "./Ui_Entrgables/Ent_Modificar";
import Ver_Proyecto from "./Proyectos_Modulo/Ver_Proyecto";
import Ent_Ver from "./Ui_Entrgables/Ent_Ver";
import Ver_Revsion from "./Revisiones/Ver_Revisiones";



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MenuProyectos" component={Menu_Proyectos} />
        <Stack.Screen name="Proyecto" component={Ver_Proyecto} />
        <Stack.Screen name="RegitrarProyectos" component={Registrar_Proyectos} />
        <Stack.Screen name="ConsultarProyecto" component={Consultar_Proyectos} />
        <Stack.Screen name="ModificarProyecto" component={Modificar_Proyectos} />
        
        <Stack.Screen name="MenuRevisiones" component={Menu_Revisiones} />
        <Stack.Screen name="VerRevision" component={Ver_Revsion} />
        <Stack.Screen name="ConsultarRevision" component={Consultar_Revision} />
        <Stack.Screen name="ResgitrarRevision" component={Modificar_Revision} />
        <Stack.Screen name="ModificarRevision" component={Registrar_Revision} />


        <Stack.Screen name="MenuEntregables" component={Menu_Entregables} />
        <Stack.Screen name="Ent_Agregar" component={Ent_Agregar} />
        <Stack.Screen name="Ent_Consultar" component={Ent_Consultar} />
        <Stack.Screen name="Ent_Ver" component={Ent_Ver} />
        <Stack.Screen name="Ent_Modificar" component={Ent_Modificar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


