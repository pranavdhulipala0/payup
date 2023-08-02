import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import axios from "axios";
import Payup from "./Payup";
import card from "../assets/card.jpg";
import create from "../assets/create2.jpg";
import wallet from "../assets/wallet.jpg";
import Card from "./Card";
import Home from "./Home";
import Loading from "./Loading";
import styles from "../styles/styles";
// import fetcher from "../api/fetchData";
const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [myRooms, setMyRooms] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [username, setUsername] = useState("");

  async function fetcher(name) {
    try {
      const response = await fetch("http://192.168.0.199:3002/fetchRooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({ username: name }), // Convert the body to JSON format using JSON.stringify
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json().then((res) => {
        setMyRooms(res);
      }); // Parse the response body as JSO
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    const name = "drakeswd"
    fetcher(name).then((temp) => {
      setIsLoaded(true);
      setUsername(name);
    });
  }, []);

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShadowVisible: true,
          headerTitle: "",
          headerTintColor:'black',
          headerStyle: {
            backgroundColor: 'white'
          },
          headerLeft: () => <Payup img={wallet} />,
          headerRight: () => <Payup img={create} />,
        }}
      />
      {isLoaded ? (
        isLoggedIn ? (
          <Home myRooms={myRooms} username = {username} loadingState={isLoaded} />
        ) : (
          <View>
            <Text style={styles.headingText}>Pleaase login first</Text>
          </View>
        )
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  );
};

export default Index;
