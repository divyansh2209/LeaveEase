import { useAuth } from '@/providers/AuthProvider';
import { Redirect, Stack } from 'expo-router';

import {
    SafeAreaProvider
} from 'react-native-safe-area-context'

export default function AuthLayout() {
    const { session } = useAuth();

    if (session) {
        return <Redirect href={'/'} />;
    }

    return <RootLayoutNav />;
}


function RootLayoutNav() {

    return (

        <SafeAreaProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="sign-in" options={{ headerShown: false }} />
                <Stack.Screen name="sign-up" options={{ headerShown: false }} />
            </Stack>
        </SafeAreaProvider>
    );
}

