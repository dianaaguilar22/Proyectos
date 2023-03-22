import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View } from "react-native";



export default function Menu_Entregables({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.botones}>
      <Button
        onPress={() => navigation.navigate()}
        title="Registrar"
        color="#841584"
      />
      </View>
      <View style={styles.botones}>
      <Button
        onPress={() => navigation.navigate('ResgitrarProyectos')}
        title="Consultar"
        color="#841584"
      />
      </View>
      <View style={styles.botones}>
      <Button
        onPress={() => navigation.navigate('ResgitrarProyectos')}
        title="Eliminar"
        color="#841584"
      />
      </View>
      <View style={styles.botones}>
      <Button
        onPress={() => navigation.navigate('ResgitrarProyectos')}
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