import {View,Text, Image,TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import { useNavigation } from 'expo-router';
const CreateGroup = ({img}) => {
  const navigation = useNavigation();
  function createGroup(){
    navigation.navigate('Create',{
      data:{name:"Pranav"}
    })
  }
  return (
    <TouchableOpacity onPress = {createGroup}>
        <Image source = {img} resizeMode = "cover" style = {styles.logoStyle}/>
    </TouchableOpacity>
  )
}

export default CreateGroup;