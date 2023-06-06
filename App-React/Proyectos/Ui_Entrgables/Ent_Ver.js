import { StatusBar } from "expo-status-bar";
import { ScrollView, Alert,Button, Linking, StyleSheet, Text, View } from "react-native";
import base64 from "react-native-base64";
import { useEffect, useState } from "react";
import {useCallback} from 'react';


const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`No se puede abrir: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};


export default function Ent_Ver({ navigation, route }) {
  console.log(route.params.item);
  const data = route.params.item;
  // const getProyectos = async () => {
  //   const response = await fetch(
  //     "http://192.168.100.5:5000/proyecto/proyectos/"+route.params.item.id ,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization:
  //           "Basic " + base64.encode("juan@correo.com" + ":" + "1234"),
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       console.log(responseJson.Proyectos)
  //       setData(responseJson.Proyectos);

  //     })
  //     .catch((error) => {
  //       //Error
  //       console.error(error);
  //     });
  // };

  // useEffect(() => {
  //   getProyectos();
  // }, []);

  return (
    <ScrollView>
      <View style={styles.cards}>
        <Text style={styles.titulo}> ID: </Text> 
        <Text style={styles.texto}> {data.id}</Text>
      </View>
      <View style={styles.cards}>
        <Text style={styles.titulo}> Observaciones: </Text><Text style={styles.texto}> {data.Observaciones}</Text>
      </View>
      
      <View style={styles.cards}>
        <Text style={styles.titulo}> Fecha Programada: </Text>
        <Text style={styles.texto}> {data.Fecha_Programada}</Text>
      </View>
      <View style={styles.cards}> 
        <Text style={styles.titulo}> Fecha Entregado: </Text>
        <Text style={styles.texto}> {data.Fecha_entregado}</Text>
      </View>
      <View style={styles.cards}> 
        <Text style={styles.titulo}> Archivo: </Text>
        <OpenURLButton url={data.Archivo}>{data.Archivo}</OpenURLButton>
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
    justifyContent: "center",
  },
  datos:{
    display: "flex",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width:"80%",
    margin:5
  },
  cards: {
    display: "flex",
    flexDirection: "column",
    width: "95%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    
  },
  link:{
    fontSize:22,
    fontWeight:"bold"
  },
  titulo:{
    fontSize:22,
    fontWeight:"bold"
  },
  texto:{
    fontSize:22,
    
  },
  cardsListas: {
    display: "flex",
    flexDirection: "column",
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
  },
  listas:{
    display: "flex",
    flexDirection: "column",
    width: "95%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderColor: "black",
    margin: 5,
    fontSize:22
  }
});
