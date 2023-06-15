import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import base64 from "react-native-base64";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { ruta } from "../Pantallas_Utilidades/ruta"



export default function Registrar_Revision({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [fechaEnt, setFechaE] = useState(new Date());


  const [idPro, setIdPro] = useState("0");
 

  const [archvio, setArchivo] = useState("");
  const [comentario, setComentario] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    console.log(e)
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  

  const mostrarModo = (currentMode) => {
    DateTimePickerAndroid.open({
      value: fechaEnt,
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate;
        console.log(currentDate)
        setFechaE(currentDate);
      },
      mode: currentMode,
      is24Hour: true,
    });
  };

  const mostrarPicker = () => {
    mostrarModo("date");
  };


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
        <Text style={styles.titulo}> IdProyecto: </Text>
        <TextInput
          style={styles.input}
          onChangeText={setIdPro}
          maxLength={2}
          value={idPro}
          keyboardType='numeric'
        />
      </View>

      <View style={styles.cards}>
      <Text style={styles.titulo}> Archivo: </Text>
        <TextInput
          style={styles.input}
          onChangeText={setArchivo}
          value={archvio}
        />
        
        
      </View>

      <View style={styles.cards}>
        <Text style={styles.titulo}> Fecha Programada: </Text>

        <TouchableOpacity onPress={showDatepicker} style={styles.fecha}>
          <Text style={styles.texto}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cards}>
        <Text style={styles.titulo}> Fecha Entregado: </Text>
        <TouchableOpacity onPress={mostrarPicker} style={styles.fecha}>
          <Text style={styles.texto}>{fechaEnt.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.cards}>
      <Text style={styles.titulo}> Observaciones: </Text>
        <TextInput
          style={styles.input}
          onChangeText={setComentario}
          value={comentario}
        />
        
        
      </View>




      <Button
            icon={<Icon name="save" size={15} color="white" />}
            onPress={
              async () => {
                let bod = {
                  "IdProyecto":Number(idPro),
                  "Fecha_Programada": date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear(),
                  "Fecha_entregado": fechaEnt.getDate()+"/"+(fechaEnt.getMonth()+1)+"/"+fechaEnt.getFullYear(),
                  "Observaciones":comentario,
                  "Archivo":archvio
              }
                bod = JSON.stringify(bod)
                const response = await fetch(
                  ruta+"/proyecto/entregables",
                  {
                    method: "POST",
                    headers: {
                      Authorization:
                        "Basic " + base64.encode("juan@correo.com" + ":" + "1234"),
                      'content-type': 'application/json'
                    },
                    body:bod
                  }
                )
                  .then((response) => response.json())
                  .then((responseJson) => {
                   
                    console.log(responseJson);
                    navigation.goBack()
                  })
                  .catch((error) => {
                    //Error
                    console.error(error+ "Error");
                  });
              }
            }
            title={"  Guardar"}
          />
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
  datos: {
    display: "flex",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "80%",
    margin: 5,
  },
  temas:{
    display: "flex",
    flexDirection: "column",
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    margin: 5,
    borderWidth: 2,
    borderRadius: 5,
    
  },
  temaText:{
    fontSize: 22,
  },
  input: {
    width: "95%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderColor: "gray",
    margin: 5,
    height: 40,
    fontSize: 22,
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },
  fecha: {
    width: "50%",
    backgroundColor: "#30A2FF",
    borderColor: "#30A2FF",
    borderRadius: 5,
    borderWidth: 1,
  },
  cards: {
    display: "flex",
    flexDirection: "column",
    width: "95%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderColor: "black",
    margin: 5,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
  },
  texto: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
  },
  cardsListas: {
    display: "flex",
    flexDirection: "row",
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",

    margin: 5,
  },
  
});
