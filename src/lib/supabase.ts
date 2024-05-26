import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

import {EXPO_PUBLIC_SUPABASE_URL , EXPO_PUBLIC_SUPABASE_ANON} from "@env"

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
        return SecureStore.getItemAsync(key);
    },
    setItem: (key: string, value: string) => {
        SecureStore.setItemAsync(key, value);
    },
    removeItem: (key: string) => {
        SecureStore.deleteItemAsync(key);
    },
};

console.log("URL:" , EXPO_PUBLIC_SUPABASE_URL)

const supabaseUrl = EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey = EXPO_PUBLIC_SUPABASE_ANON

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: ExpoSecureStoreAdapter as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});