
import { Stack } from 'expo-router';


const EmployeeStack = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Leaves Requests'  }} />
            <Stack.Screen name="[id]" options={{ title: 'Leaves Requests' }} />
            {/* <Stack.Screen name="create" options={{ presentation: 'modal' }} /> */}
        </Stack>
    )
}

export default EmployeeStack

// const styles = StyleSheet.create({})