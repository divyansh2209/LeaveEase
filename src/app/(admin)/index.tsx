import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { Button } from 'react-native-paper';


import Colors from '../../constants/Colors';
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Font from "../../constants/Font";
import { Ionicons } from "@expo/vector-icons";



export default function TabOneScreen() {
  return (
    <View style={styles.container}>

      <Link
        href={'/(admin)/employee'}
        style={styles.link}
      >
        <Text
          style={{
            color: Colors.onPrimary,
            textAlign: "center",
            fontSize: FontSize.large,
            fontWeight:"bold"
          }}
        >
          Employee List
        </Text>
      </Link>


      <Link
        href={'/(admin)/leaves/list'}
        style={styles.link}
      >
        <Text
          style={{
            color: Colors.onPrimary,
            textAlign: "center",
            fontSize: FontSize.large,
            fontWeight:"bold"
          }}
        >
          Leave Requests
        </Text>
      </Link>

      <Link
        href={'/(admin)/leaves/addCompantLeaves'}
        style={styles.link}
      >
        <Text
          style={{
            color: Colors.onPrimary,
            textAlign: "center",
            fontSize: FontSize.large,
            fontWeight:"bold"
          }}
        >
          Add Company Leaves
        </Text>
      </Link>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    height: "100%",
    alignItems: 'center'
  },
  buttonStyle: {
    height: '50%',
  },
  link: {
    height:"30%",
    width:"80%",
    padding: Spacing * 2,
    backgroundColor: "#0496ff",
    borderRadius: Spacing*3,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
    textAlign: "center",
    
  }
})