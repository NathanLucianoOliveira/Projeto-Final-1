import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { StackTypes } from "../../routes/stack";
import { Layout } from "../../Layouts/Layout";

const Home = () => {
  const navigation = useNavigation<StackTypes>();
  const handleParticipar = () => {
    navigation.navigate("Grupo"); // Navega para a tela de grupo
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>
          Bem vindo ao Amigo Chocolate Secreto!
        </Text>
        <Image
          style={styles.imageStyle}
          source={require("../../../assets/coelhinho2.png")}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipar}>
          <Text style={styles.buttonText}>Participar</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#EEDBB5",
    paddingTop: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#37474F",
    textAlign: "center",
    marginTop: 0,
    marginBottom: 10,
  },
  imageStyle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#C17C54",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 20,
    shadowColor: "#2D2926",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF7EB",
    textAlign: "center"
  },
});

export default Home;
