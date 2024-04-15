import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { Button } from 'react-native-paper';


export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Link href={'/(admin)/employee'}>
        <Button icon="" mode="contained">
          Employee List
        </Button>

      </Link>

      <Link href={'/(admin)/leaves/list'}>
        <Button icon="" mode="contained">
          Leave Requests
        </Button>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flexDirection: "row",
      justifyContent: "space-around",
      height:"20%",
      alignItems: 'center'
  }
})