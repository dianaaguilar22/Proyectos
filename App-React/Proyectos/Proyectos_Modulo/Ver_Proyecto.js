import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import base64 from "react-native-base64";
import { useEffect, useState } from "react";

function formatoTemas(lista) {
  const elementos = [];
  lista = Array.from(lista);
  for (let index = 0; index < lista.length; index++) {
    elementos.push(<Text key={index} style={styles.listas}> {lista[index]}</Text>);
  }

  return <View style={styles.cards}>{elementos}</View>;
}

function formatoParti(parti) {
  const elementos = [];
  lista = Array.from(parti);
  let contar = 1
  lista.forEach(element => {
    
    elementos.push(
     
       
        <View key={contar} style={styles.datos}>
          <Text style={styles.listas}>Nombre: {element.Nombre} </Text>
          <Text style={styles.listas}>Tipo: {element.Tipo} </Text>
        </View>
    
    );
    contar = contar+1
  });

  return <View style={styles.lista}>{elementos}</View>;
}

export default function Ver_Proyecto({ navigation, route }) {
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
        <Text style={styles.titulo}> Nombre: </Text><Text style={styles.texto}> {data.Nombre}</Text>
      </View>
      <View style={styles.cardsListas}>
        <Text style={styles.titulo}> Temas</Text>
        {formatoTemas(data.Temas)}
      </View>
      <View style={styles.cards}>
        <Text style={styles.titulo}> Fecha Inicio: </Text>
        <Text style={styles.texto}> {data.Fecha_Inicio}</Text>
      </View>
      <View style={styles.cards}> 
        <Text style={styles.titulo}> Fecha Terminación: </Text>
        <Text style={styles.texto}> {data.Fecha_Termina}</Text>
      </View>
      <View style={styles.cardsListas}>
        <Text style={styles.titulo}> Participantes</Text>
        {formatoParti(data.Participantes)}
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
