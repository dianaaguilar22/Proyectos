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

function formatoParti(parti) {
  const elementos = [];
  lista = Array.from(parti);
  let contar = 1;
  lista.forEach((element) => {
    elementos.push(
      <View key={contar} style={styles.datos}>
        <Text style={styles.temaText}>Comentario: {element.Comentario} </Text>
        <Text style={styles.temaText}>Estatus: {element.Estatus} </Text>
      </View>
    );
    contar = contar + 1;
  });

  return <View style={styles.lista}>{elementos}</View>;
}

export default function Modificar_Revision({ navigation, route }) {

  const data = route.params.item;
  let fec = data.Fecha.split("/")
  
  let fin = data.FechaTer.split("/")
  const [date, setDate] = useState(new Date(fec[2]+"-"+fec[1]+"-"+fec[0]));
  const [fechater, setFechaT] = useState(new Date(fin[2]+"-"+fin[1]+"-"+fin[0]));


  const [idPro, setIdPro] = useState(data.IdProyecto);
 
  const [Observaciones, setO] = useState(data.Observaciones);
  const [idPersona, setIdPersona] = useState(data.IdPersona);

  const [estatus, setE] = useState();
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
      value: fechater,
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate;
        console.log(currentDate)
        setFechaT(currentDate);
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
      <Text style={styles.titulo}> IdPersona: </Text>
        <TextInput
          style={styles.input}
          onChangeText={setIdPersona}
          maxLength={2}
          value={idPersona}
          keyboardType='numeric'
        />
        
        
      </View>

      <View style={styles.cards}>
        <Text style={styles.titulo}> Fecha Inicio: </Text>

        <TouchableOpacity onPress={showDatepicker} style={styles.fecha}>
          <Text style={styles.texto}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cards}>
        <Text style={styles.titulo}> Fecha Terminación: </Text>
        <TouchableOpacity onPress={mostrarPicker} style={styles.fecha}>
          <Text style={styles.texto}>{fechater.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cards}>
        <Text style={styles.titulo}> Observaciones</Text>
        <View style={styles.cardsListas}>
          <View style={styles.cards}>
            <TextInput
              style={styles.input}
              onChangeText={setComentario}
              
            
              value={comentario}
            />
            <TextInput
              style={styles.input}
              onChangeText={setE}
              
              maxLength={1}
              value={estatus}
            />
          </View>

          <Button
            icon={<Icon name="plus" size={15} color="white" />}
            onPress={() => {
              if (comentario != "" && estatus != "") {
                let paso = [...Observaciones];
                let part = {
                  Comentario: comentario,
                  Estatus: estatus,
                };
                paso.push(part);

                setO(paso);
              }
            }}
          />
        </View>
        <View style={styles.temas}>
        {formatoParti(Observaciones)}
        </View>
        
      </View>



      <Button
            icon={<Icon name="save" size={15} color="white" />}
            onPress={
              async () => {
                let bod = {
                    "_id": data.id,
                  "IdProyecto":idPro,
                  "FechaIni": date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear(),
                  "FechaTer": fechater.getDate()+"/"+(fechater.getMonth()+1)+"/"+fechater.getFullYear(),
                  "Observaciones":Observaciones,
                  "IdPersona":Number(idPersona),
                  "Estatus":"Activo"
              }
                bod = JSON.stringify(bod)
                const response = await fetch(
                  ruta+"/proyecto/revisiones",
                  {
                    method: "PUT",
                    headers: {
                      Authorization:
                        "Basic " + base64.encode("luis@correo.com" + ":" + "1234"),
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
