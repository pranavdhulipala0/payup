import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import styles from "../styles/styles";
import { useNavigation } from "expo-router";
const CreateGroup = ({ img,username }) => {
  const navigation = useNavigation();
  function createGroup() {
    navigation.navigate("Create", {
      data: { username: username },
    });
  }
  return (
    <TouchableOpacity>
      <Link
        href={{
          pathname: "/Create",
          params: { username: username },
        }}
      >
        {/* <Image source={img} resizeMode="cover" style={styles}*/}
        <Text>New Group</Text>
      </Link>
    </TouchableOpacity>
  );
};

export default CreateGroup;
