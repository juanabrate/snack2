import React, { useEffect } from "react";
import { AppLoading } from "expo";
import useUser from "../components/Users/useUser";
import { gql, useQuery, useMutation } from "@apollo/client";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import Header from "./Header/Header";
import { Image } from "react-native";
const image = {
  main_logo: require("./images/visitar.png"),
  doc: require("./images/doc1.png"),
  logo: require("./images/logoblanco.png"),
};
const QUERY = gql`
  query usuarios($where: JSON) {
    usuarios(where: $where) {
      _id
      email
      nombre
      apellido
      telefono
      rol
      provincia
      matricula
      laboratorio
      verificado
      imagen
      especialidad
      expoToken
    }
  }
`;

const EXPOTOKEN = gql`
  mutation updateUsuario($input: UsuarioInput) {
    updateUsuario(input: $input) {
      expoToken
    }
  }
`;

export default function Home() {
  const { user, userDB, setUserDB } = useUser();
  let uid;
  if (user) uid = user.uid;
  const { loading, data, error, refetch } = useQuery(QUERY, {
    variables: {
      where: {
        uid: uid,
      },
    },
  });
  data && setUserDB(data);

  const [updateToken] = useMutation(EXPOTOKEN);

  async function registerForPushNotification() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status != "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if (status !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // token = (await Notifications.getDevicePushTokenAsync()).data;
    return token;
  }

  useEffect(() => {
    userDB &&
      registerForPushNotification()
        .then((token) =>
          updateToken({
            variables: {
              input: { _id: userDB.usuarios[0]._id, expoToken: token },
            },
          })
        )
        .catch((err) => console.log(err));
  }, [userDB]);

  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_400Regular,
    Roboto_500Medium,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <ImageBackground source={image.doc} style={styles.image}>
          <Image
            source={image.logo}
            style={{ width: 120, height: 60, marginLeft: 20 }}
          />

          <View style={styles.textCont}>
            <Text style={styles.text}>
              Trabajar cada visita como una oportunidad
            </Text>
            <Text style={styles.text2}>
              Crear redes que transmitan la mejor información científica
              disponible a quienes deseen desarrollar su máximo potencial para
              profesionalizar con las mejores herramientas disponibles en el
              mercado a los Agentes de Propaganda Medica y Representantes de
              ventas en Farmacias
            </Text>
          </View>
        </ImageBackground>
      </>
    );
  }
}

const styles = StyleSheet.create({
  Cont: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 20,
  },
  images: {
    borderRadius: 6,
    height: 400,
    marginTop: 100,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderRadius: 20,
    display: "flex",
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
    borderRadius: 10,
    flex: 1,
    margin: 10,
  },
  img: {
    resizeMode: "cover",
    height: 450,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderRadius: 20,
    display: "flex",
    justifyContent: "flex-end",
  },

  textCont: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 338,
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderTopRightRadius: 40,
  },
  text: {
    marginTop: 10,
    fontFamily: "Roboto_400Regular",
    width: "100%",
    color: "white",
    fontSize: 18,
  },
  text2: {
    marginTop: 20,
    fontFamily: "Roboto_100Thin",
    fontSize: 15,
    textAlign: "justify",
    color: "white",
  },
  logo: {
    width: 200,
  },
});
