import React from 'react'
import {View,Text} from 'react-native';
import styles from '../styles/styles';
const Group = (props) => {

  return (
    <View>
        <Text style = {styles.textWithMargin}>This is the Group page, need to get roomId from Card to this so we can fetch the data of that room Id and display it here</Text>
    </View>
  )
}

export default Group