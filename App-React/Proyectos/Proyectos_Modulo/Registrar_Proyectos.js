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
function formatoTemas(lista) {
  const elementos = [];
  for (let index = 0; index < lista.length; index++) {
    elementos.push(
      <Text key={index}  style={styles.temaText}>
        {" "}
        {lista[index]}
      </Text>
    );
  }

  return elementos;
}

function formatoParti(parti) {
  const elementos = [];
  lista = Array.from(parti);
  let contar = 1;
  lista.forEach((element) => {
    elementos.push(
      <View key={contar} style={styles.datos}>
        <Text style={styles.temaText}>IdPersona: {element.IdPersona} </Text>
        <Text style={styles.temaText}>Tipo: {element.Tipo} </Text>
      </View>
    );
    contar = contar + 1;
  });

  return <View style={styles.lista}>{elementos}</View>;
}

export default function Registrar_Proyectos({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [fechater, setFechaT] = useState(new Date());


  const [nombre, setNombre] = useState("Nombre del Proyecto");
  const [temas, setTemas] = useState([]);
  const [participantes, setPar] = useState([]);
  const [tema, setTema] = useState("Tema");
  const [tipo, setTipo] = useState("A");
  const [nombrePar, setNPar] = useState("1");

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
        <Text style={styles.titulo}> Nombre: </Text>
        <TextInput
          style={styles.input}
          onChangeText={setNombre}
          value={nombre}
        />
      </View>
      <View style={styles.cards}>
        <Text style={styles.titulo}> Temas</Text>
        <View style={styles.cardsListas}>
          <TextInput style={styles.input} onChangeText={setTema} value={tema} />
          <Button
            icon={<Icon name="plus" size={15} color="white" />}
            onPress={() => {
              if (tema != "") {
                if (!temas.includes(tema)) {
                  let paso = [...temas];

                  paso.push(tema);

                  setTemas(paso);
                }
              }
            }}
          />
        </View>
        <View style={styles.temas}>
          {formatoTemas(temas)}
        </View>
        
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
        <Text style={styles.titulo}> Participantes</Text>
        <View style={styles.cardsListas}>
          <View style={styles.cards}>
            <TextInput
              style={styles.input}
              onChangeText={setNPar}
              maxLength={2}
              keyboardType='numeric'
              value={nombrePar}
            />
            <TextInput
              style={styles.input}
              onChangeText={setTipo}
              
              maxLength={1}
              value={tipo}
            />
          </View>

          <Button
            icon={<Icon name="plus" size={15} color="white" />}
            onPress={() => {
              if (nombrePar != "" && tipo != "") {
                console.log(nombrePar)
                let paso = [...participantes];
                let part = {
                  IdPersona: Number(nombrePar),
                  Tipo: tipo,
                };
                paso.push(part);

                setPar(paso);
              }
            }}
          />
        </View>
        <View style={styles.temas}>
        {formatoParti(participantes)}
        </View>
        
      </View>
      <Button
            icon={<Icon name="save" size={15} color="white" />}
            onPress={
              async () => {
                let bod = {
                  
                  "Nombre": nombre,
                  "Temas": 
                     temas
                  ,"Fecha_Inicio": date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear(),
                  "Fecha_Termina": fechater.getDate()+"/"+(fechater.getMonth()+1)+"/"+fechater.getFullYear(),
                  "Participantes": 
                     participantes
                  
                }
                bod = JSON.stringify(bod)
                const response = await fetch(
                  ruta+"/proyecto/proyectos",
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
