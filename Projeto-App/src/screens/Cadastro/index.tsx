import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { StackTypes } from "../../routes/stack";

import { Feather } from "@expo/vector-icons";
import { UserService } from "../../services/UserService";

const Cadastro = () => {
  const [email, setEmail] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [hidePassword, setHidePassword] = useState(true);
  const userService = new UserService();

  const navigation = useNavigation<StackTypes>();

  const handleNavegarLogin = () => {
    navigation.navigate("Login");
  };

  const handleLogin = async () => {
    const user = await userService.registrar({
      email,
      nome,
      sobrenome,
      password,
      username: "",
    });

    alert(user.data.message);

    if (user.data.success) {
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <Image
        style={styles.imageStyle}
        source={require("../../../assets/coelhinho2.png")}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          onChangeText={setNome}
          value={nome}
        />
        <TextInput
          style={styles.input}
          placeholder="Sobrenome"
          onChangeText={setSobrenome}
          value={sobrenome}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!hidePassword}
            onChangeText={setPassword}
            value={password}
          />
          <Pressable
            onPress={() => setHidePassword((prev) => !prev)}
            style={styles.eyeIcon}
          >
            {hidePassword ? (
              <Feather name="eye" size={24} />
            ) : (
              <Feather name="eye-off" size={24} />
            )}
          </Pressable>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
        activeOpacity={0.1}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleNavegarLogin}
        style={styles.button}
        activeOpacity={0.1}
      >
        <Text style={styles.buttonText}>Ir para login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEDBB5", // Fundo em um tom de caramelo claro
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#37474F", // Um azul escuro acinzentado para o título
    textAlign: "center",
    marginTop: 20, // Aumente este valor conforme necessário para descer o texto
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#D3A46F", // Borda em tom de bronze claro
    backgroundColor: "#FFFAF2", // Fundo do input em um tom de marfim
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#5C3A21", // Texto em tom de marrom escuro
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
    marginBottom: 20,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
  },
  button: {
    width: "80%",
    height: 50,
    borderRadius: 20,
    backgroundColor: "#C17C54", // Botão em tom de marrom-avermelhado
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#2D2926", // Sombra para dar profundidade
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: "#FFF7EB", // Texto do botão em marfim claro
    fontSize: 18,
    fontWeight: "600",
  },
  imageStyle: {
    width: 120, // Tamanho aumentado para que a imagem seja mais destacada
    height: 120, // Tamanho aumentado para que a imagem seja mais destacada
    borderRadius: 60, // Metade da largura/altura para manter a forma circular
    alignSelf: "center",
    marginTop: 5, // Aumente esta margem para diminuir a proximidade com o texto "Login"
    marginBottom: 20, // Adicionado para dar espaço antes dos campos de entrada
  },
});

export default Cadastro;
