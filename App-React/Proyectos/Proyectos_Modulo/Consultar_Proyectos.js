import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import base64 from "react-native-base64";
import { useEffect, useState } from "react";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { ruta } from "../Pantallas_Utilidades/ruta"
function VistaCard( navigation, item) {
  return (
    <View style={styles.cards}>
      <Text style={styles.id}>{item.id}</Text>

      <Text style={styles.titulo}>{item.Nombre} </Text>

      <View style={styles.buttons}>
        <Button
          icon={<Icon name="edit" size={15} color="white" />}
          
          onPress={() => navigation.navigate('ModificarProyecto', {item: item})}
        />
        <Button
          icon={<Icon name="trash" size={15} color="white" />}
          onPress={async () => {
            const response = await fetch(
              ruta+"/proyecto/proyectos/"+item.id,
              {
                method: "DELETE",
                headers: {
                  Authorization:
                    "Basic " + base64.encode("juan@correo.com" + ":" + "1234"),
                },
              }
            )
              .then((response) => response.json())
              .then((responseJson) => {
               
                console.log(responseJson);
                navigation.goBack()
              })
              .catch((error) => {
                //Error
                console.error(error);
              });
          }}
        />
        <Button
          icon={<Icon name="arrow-right" size={15} color="white" />}
          onPress={() => navigation.navigate('Proyecto', {item: item})}
        />
      </View>
    </View>
  );
}

export default function Consultar_Proyectos( { navigation }) {
  const [data, setData] = useState([]);

  const getProyectos = async () => {
    const response = await fetch(
    ruta+"/proyecto/proyectos",
      {
        method: "GET",
        headers: {
          Authorization:
            "Basic " + base64.encode("juan@correo.com" + ":" + "1234"),
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson.Proyectos);
        console.log(responseJson.Proyectos);
      })
      .catch((error) => {
        //Error
        console.error(error);
      });
  };

  useEffect(() => {
    getProyectos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {data ? (
        <FlatList
          data={data}
          renderItem={({ item }) => VistaCard(navigation, item)}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>{"No hay datos"}</Text>
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    width: "100%",
  },
  cards: {
    display: "flex",
    flexDirection: "row",
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    width: "30%",
    justifyContent: "space-between",
  },
  id: {
    padding: 10,
    width: "15%",

    fontSize: 12,
  },
  titulo: {
    padding: 10,
    width: "50%",
  },
});
