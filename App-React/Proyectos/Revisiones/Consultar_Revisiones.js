import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView,FlatList } from "react-native";
import base64 from "react-native-base64";
import { useEffect, useState } from "react";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
function VistaCard(navigation, item) {
  return(<View style={styles.cards}>
    <Text style={styles.id}>{item.id}</Text>

    <Text style={styles.titulo}>{item.Fecha} </Text>

    <View style={styles.buttons}>
    <Button
          icon={<Icon name="edit" size={15} color="white" />}
          
          onPress={""}
        />
        <Button
          icon={<Icon name="trash" size={15} color="white" />}
          onPress={""}
        />
        <Button
          icon={<Icon name="arrow-right" size={15} color="white" />}
          onPress={() => navigation.navigate('VerRevision', {item: item})}
        />
    </View>
    
  </View>)}

export default function Consultar_Revision( { navigation }){
  const [data, setData] = useState([]);
  
 
  const getProyectos = async () =>  {
    const response = await fetch("http://192.168.100.5:5000/proyecto/revisiones",{
  method: 'GET',
  headers: {
    Authorization: "Basic " + base64.encode("juan@correo.com" + ":" + "1234"),
  },})
      .then((response) => response.json())
      .then((responseJson) => {
        
       
        setData(responseJson.Revisiones)
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
    <SafeAreaView style={styles.container}>
      { data? <FlatList
        data={data}
        renderItem={({item}) => VistaCard(navigation, item)}
        keyExtractor={item => item.id}
      />: <Text>{"No hay datos"}</Text>}
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
    width:"100%"
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

    justifyContent: 'space-between',
    
  },
  id: {
    padding: 10,
    width: "15%",
   
    fontSize: 12,
  },
  titulo: {
    padding: 10,
    width: "50%",
    
  }
});
