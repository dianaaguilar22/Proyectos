import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import base64 from "react-native-base64";
import { useEffect, useState } from "react";



export default function Consultar_Proyectos() {
  const [data, setData] = useState([]);
  
 
  const getProyectos = async () =>  {
    const response = await fetch("https://3471-2806-261-2400-1c92-2dc2-5589-cc3-f7b1.ngrok-free.app/proyecto/proyectos/2",{
  method: 'GET',
  headers: {
    Authorization: "Basic " + base64.encode("juan@correo.com" + ":" + "1234"),
  },})
      .then((response) => response.json())
      .then((responseJson) => {
        alert(JSON.stringify(responseJson));
        console.log(typeof responseJson);

        console.log(responseJson)
      })
      .catch((error) => {
        //Error
        alert(JSON.stringify(error));
        console.error(error);
      });
  }
  

  useEffect(() => {
    getProyectos();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cards}>
        <Text style={styles.id}>ID</Text>

        <Text style={styles.titulo}>Nombre </Text>

        <View style={styles.buttons}>
          <Button title="2" />
          <Button title="E" />
          <Button title="E" />
        </View>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 20,
  },
  cards: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    width: "30%",
    borderColor: "black",
    borderWidth: 1,
  },
  id: {
    padding: 10,
    width: "10%",
    borderColor: "black",
    borderWidth: 1,
    fontSize: 9,
  },
  titulo: {
    padding: 10,
    width: "50%",
    borderColor: "black",
    borderWidth: 1,
  },
});
