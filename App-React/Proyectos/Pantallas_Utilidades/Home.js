import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.botones}>
        <Button onPress={() => navigation.navigate('MenuProyectos')} title="Proyectos" color="#841584" />
      </View>
      <View style={styles.botones}>
        <Button onPress={() => navigation.navigate('MenuProyectos')} title="Entregables" color="#841584" />
      </View>
      <View style={styles.botones}>
        <Button onPress={() => navigation.navigate('MenuProyectos')} title="Revisiones" color="#841584" />
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
