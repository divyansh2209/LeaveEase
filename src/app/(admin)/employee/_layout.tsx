import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';

const EmployeeStack = () => {
    return (
        <Stack
            screenOptions={{
                headerRight: () => (
                    <Link href="/(admin)/employee/create" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="plus"
                                    size={25}
                                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                />
                            )}
                        </Pressable>
                    </Link>
                ),
            }}
        >
            <Stack.Screen name="index" options={{ title: 'Emoployee List'  }} />
        </Stack>
    )
}

export default EmployeeStack

// const styles = StyleSheet.create({})