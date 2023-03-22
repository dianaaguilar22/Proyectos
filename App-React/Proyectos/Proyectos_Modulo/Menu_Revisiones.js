import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Menu_Pr({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.botones}>
      <Button
        onPress={() => navigation.navigate('ResgitrarRevision')}
        title="Registrar"
        color="#841584"
      />
      </View>
      <View style={styles.botones}>
      <Button
        onPress={() => navigation.navigate('ConsultarRevision')}
        title="Consultar"
        color="#841584"
      />
      </View>
      <View style={styles.botones}>
      <Button
        onPress={() => navigation.navigate('EliminarRevision')}
        title="Eliminar"
        color="#841584"
      />
      </View>
      <View style={styles.botones}>
      <Button
        onPress={() => navigation.navigate('ModificarRevision')}
        title="Modificar"
        color="#841584"
      />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  botones: {
    margin: 10,
  },
});