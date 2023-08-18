import {View,Text, Image,TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import { useNavigation } from 'expo-router';
const Payup = ({img}) => {
  return (
    <TouchableOpacity>
        <Image source = {img} resizeMode = "cover" style = {styles.logoStyle}/>
    </TouchableOpacity>
  )
}

export default Payup