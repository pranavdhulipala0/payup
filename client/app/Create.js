import React from 'react'
import {View,Text} from 'react-native';
import styles from '../styles/styles';
const Create = ({route}) => {

  return (
    <View style = {{alignItems:"center"}}>
        <Text style = {styles.textWithMargin}>Create a new group!</Text>
    </View>
  )
}

export default Create;