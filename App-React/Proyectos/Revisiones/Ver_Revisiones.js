import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import base64 from "react-native-base64";
import { useEffect, useState } from "react";



function formatoOb(parti) {
  const elementos = [];
  lista = Array.from(parti);
  let contar = 1
  lista.forEach(element => {
    
    elementos.push(
     
       
        <View key={contar} style={styles.datos}>
          <Text style={styles.listas}>Comentario: {element.Comentario} </Text>
          <Text style={styles.listas}>Estatus: {element.Estatus} </Text>
        </View>
    
    );
    contar = contar+1
  });

  return <View style={styles.lista}>{elementos}</View>;
}

export default function Ver_Revsion({ navigation, route }) {
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
        <Text style={styles.titulo}> Estatus: </Text><Text style={styles.texto}> {data.Estatus}</Text>
      </View>
      <View style={styles.cards}>
        <Text style={styles.titulo}> Fecha: </Text>
        <Text style={styles.texto}> {data.Fecha}</Text>
      </View>
      <View style={styles.cards}> 
        <Text style={styles.titulo}> Fecha Inicio: </Text>
        <Text style={styles.texto}> {data.FechaIni}</Text>
      </View>
      <View style={styles.cards}> 
        <Text style={styles.titulo}> Fecha Terminación: </Text>
        <Text style={styles.texto}> {data.FechaTer}</Text>
      </View>
      <View style={styles.cards}> 
        <Text style={styles.titulo}> Realizado por: </Text>
        <Text style={styles.texto}> {data.IdPersona}</Text>
      </View>
      <View style={styles.cards}> 
        <Text style={styles.titulo}> Al Proyecto: </Text>
        <Text style={styles.texto}> {data.IdProyecto}</Text>
      </View>
      <View style={styles.cardsListas}> 
        <Text style={styles.titulo}> Observaciones: </Text>
        {formatoOb(data.Observaciones)}
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
