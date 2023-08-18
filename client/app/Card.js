import React from 'react'
import {useState, useEffect} from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from '../styles/styles';
import { useNavigation } from 'expo-router';
const Card = ({roomId,roomName,roomUsers}) => {
  const navigation = useNavigation();
  const [userList,setUserList] = useState("");
  const convertToString = () =>{
    var myUsers = "";
    roomUsers.sort();
    for(var i = 0;i<roomUsers.length-1;i++){
      myUsers+=roomUsers[i]+", ";
    }
    myUsers+=roomUsers[roomUsers.length-1];
    setUserList(myUsers);
  }

  useEffect(()=>{
    convertToString();
  },[])

  function openGroup(){
    navigation.navigate("Group",{
      data:{roomId:roomId}
    })
  }

  return (
    <TouchableOpacity style={styles.containerBox} onPress = {openGroup}>
              <Text style={styles.headingText}>{roomName}</Text>
              <Text style={styles.paragraphText}>
                {userList}
              </Text>
    </TouchableOpacity>
  )
}

export default Card