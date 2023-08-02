import React from 'react'
import {useState, useEffect} from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from '../styles/styles';
const Card = ({roomId,roomName,roomUsers}) => {
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

  return (
    <TouchableOpacity style={styles.containerBox}>
              <Text style={styles.headingText}>{roomName}</Text>
              <Text style={styles.paragraphText}>
                {userList}
              </Text>
    </TouchableOpacity>
  )
}

export default Card