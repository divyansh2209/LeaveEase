import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Button } from 'react-native-paper';
import { useAuth } from '@/providers/AuthProvider';

export default function TabOneScreen() {
  const {profile} = useAuth();
  const id = profile.id;

  return (
    <View>
      <View style={styles.flexContainer}>

        <Link href={`/(user)/leaves/${id}`}>
          <Button mode="contained">
            My Leave Requests
          </Button>

        </Link>

        <Link href={'/(user)/leavesCreate'}>
          <Button mode="contained">
            Create Request
          </Button>
        </Link>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: "20%",
    alignItems: 'center'
  }
})
