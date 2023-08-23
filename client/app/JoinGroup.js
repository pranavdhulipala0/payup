import React from 'react'
import { useState, useEffect } from 'react';
import styles from '../styles/styles';
import {useLocalSearchParams} from 'expo-router';
import {View, Text, TextInput, TouchableOpacity, Modal, Link} from 'react-native';
const JoinGroup = () => {
    const [roomId, setRoomId] = useState("");
    const [output, setOutput] = useState(false);
    const [outputText,setOutputText] = useState("");
    const [modalVisible,setModalVisible] = useState(false);
    const [errorMessage,setErrorMessage] = useState(false);
    const [successMessage,setSuccessMessage] = useState(false);
    const [username,setUsername] = useState("");
    const params = useLocalSearchParams();
    useEffect(() => {
        const { username } = params;
        setUsername(username);
    }, []);
  
    async function joinGroupFunction(){
        try {
            const response = await fetch("https://payup-043m.onrender.com/addUser", {
              method: "POST",
              headers: {
                "Content-Type": "application/json", // Set the content type to JSON
              },
              body: JSON.stringify({
                    newuser:username,
                    roomId:roomId
              }), // Convert the body to JSON format using JSON.stringify
            });

            if(response.status==500){
                setErrorMessage(true);
                setSuccessMessage(false);
                setOutput(true);
                setOutputText("Group does not exist! Enter a valid group ID!!");
            }
            else{
                setErrorMessage(false);
                setSuccessMessage(true);
                setOutput(true);
                setOutputText("You have successfully joined the group!");
            }
          } catch (error) {
            // Handle any errors that occur during the fetch
            console.error("Error fetching data:", error);
          }
    }
  return (
    
    <View style = {{alignItems:'center', paddingTop: 20}}>
        <Text style = {styles.headingText}>Looking to join a group?</Text>
        <Text>Enter the 10 digit code provided by your friend!</Text>
        <View style={styles.wideContainerBox}>
        <Text> Group Name:</Text>
        <TextInput
          placeholder="Enter Group Name"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(e) => {
            setRoomId(e);
          }}
          value={roomId}
          style={styles.colorSearchBar}
        ></TextInput>
      </View>
      <TouchableOpacity
        style={styles.wideGreenButton}
        onPress={() => {
            setModalVisible(true);
          joinGroupFunction();
        }}
      >
        <Text
          style={{ color: "white", fontWeight: "bold", alignItems: "center" }}
        >
          JOIN GROUP
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="fade" // You can use 'slide', 'fade', or 'none'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
            <Text>{outputText}</Text>
          <View style={styles.modalContent}>
            <Link
              onPress={()=>{setModalVisible(false)}}
              href={{
                pathname: "/Create",
                params: { username: username },
              }}
              style = {styles.greenContainerBox}
            ><Text style={{ color: "white", fontWeight: "bold", alignItems: "center" }}>CREATE GROUP</Text></Link>
              <Text style = {{margin:5}}>(or)</Text>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default JoinGroup