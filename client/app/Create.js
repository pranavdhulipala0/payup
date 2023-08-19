import React from "react";
import { useEffect, useState } from "react";
import { Stack, useNavigation } from "expo-router";
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
// import filter from 'lodash.filter'
import styles from "../styles/styles";

const Create = ({ route }) => {
  const navigation = useNavigation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [userList, setUserList] = useState([]);
  const [list, setList] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [username, setUsername] = useState("");
  const params = useLocalSearchParams();
  useEffect(() => {
    fetchUsers().then(() => {
      setIsLoaded(true);
      const { username } = params;
      setUsername(username);
      addToList(username);
    });
  }, []);

  async function createGroupFunction() {
    try {
      const response = await fetch("https://payup-043m.onrender.com/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({
          roomId: 1,
          roomName: groupName,
          users: groupmem,
          usercount: groupmem.length,
        }), // Convert the body to JSON format using JSON.stringify
      });
      // response=response.json();
      // console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        console.log("Created!");
      }
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Error fetching data:", error);
    }
    console.log(groupmem);
    navigation.navigate("index");
  }

  async function fetchUsers() {
    try {
      const response = await fetch("https://payup-043m.onrender.com/getUsers");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response
        .json()
        .then((res) => {
          console.log(res);
          setUserList(res);
          // setList(res);
        })
        .then(() => {
          console.log(userList);
        });
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Error fetching data:", error);
    }
  }

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (q) => {
    setSearchQuery(q);
    const formattedQuery = q.toLowerCase();
    console.log(formattedQuery);

    if (formattedQuery.length > 0) {
      console.log("userList: " + userList);
      var subarr = userList.filter((str) =>
        str.toString().toLowerCase().includes(q)
      );
      console.log("subarray is " + subarr);
      setList(subarr);
      console.log("list: " + list);
    } else {
      console.log("search query length =0");
      setList([]);
    }
  };

  useEffect(() => {
    //  setGroupmem(selectedNames);
  }, [groupmem, groupName]);
  const [groupmem, setGroupmem] = useState([]);

  const addToList = (name) => {
    if (!groupmem.includes(name)) {
      setGroupmem((prev) => [...prev, name]);
      console.log("added to list " + groupmem);
    }
  };

  const removeName = (name) => {
    console.log("removed name " + name);
  };

  return (
    <ScrollView style={styles.whiteBackground}>
      <View style={styles.containerBox}>
        <Text> Group Name:</Text>
        <TextInput
          placeholder="Enter Group Name"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(e) => {
            setGroupName(e);
          }}
          value={groupName}
          style={styles.theBetterSearchBar}
        ></TextInput>
      </View>
      <View style={styles.containerBox}>
        <Text>Add users</Text>

        <TextInput
          placeholder="Search"
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(q) => {
            handleSearch(q);
          }}
          style={styles.search}
        ></TextInput>
        <ScrollView>
          {list.map((x, i) => (
            // <View key={i} style={styles.item}><Text>{x}</Text></View>\
            <View key={i}>
              <TouchableOpacity
                style={styles.smallContainerBox}
                onPress={() => {
                  addToList(x);
                }}
              >
                <Text>{x}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {groupmem.length > 0 ? (
        <View style={{}}>
          <View style={styles.containerBox}>
            <Text style={styles.roomText}>Group Members</Text>

            {groupmem.map((x, i) => (
              <View style={styles.groupMemberListBox} key={i}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.theBestText}>{x}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      removeName(x);
                    }}
                  >
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View></View>
      )}

      <TouchableOpacity
        style={styles.greenButton}
        onPress={() => {
          createGroupFunction();
        }}
      >
        <Text
          style={{ color: "white", fontWeight: "bold", alignItems: "center" }}
        >
          CREATE GROUP
        </Text>
      </TouchableOpacity>
    </ScrollView>
    // <View style = {{alignItems:"center"}}>
    //     {isLoaded ? <View>{userList.map((x,i)=>(<Text key={i}>{x}</Text>))}</View> : <ActivityIndicator />}
    //     <Text style = {styles.textWithMargin}>Create a new group with {name}</Text>
    // </View>
  );
};

export default Create;
