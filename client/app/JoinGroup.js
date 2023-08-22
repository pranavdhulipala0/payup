import React from 'react'
import { useState } from 'react';
import styles from '../styles/styles';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
const JoinGroup = () => {
    const [roomId, setRoomId] = useState("");
    function joinGroupFunction(){

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
          joinGroupFunction();
        }}
      >
        <Text
          style={{ color: "white", fontWeight: "bold", alignItems: "center" }}
        >
          JOIN GROUP
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default JoinGroup