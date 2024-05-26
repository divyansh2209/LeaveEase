import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Button from '../../components/Button';
import { Link, Stack } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';


import Colors from '../../constants/Colors';
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Font from "../../constants/Font";
import { Ionicons } from "@expo/vector-icons";





const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function signUpWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });

        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ title: 'Sign up' }} />


            <View
                style={{
                    alignItems: "center",
                    marginBottom: Spacing * 4
                }}
            >
                <Text
                    style={{
                        fontSize: FontSize.xLarge,
                        color: Colors.primary,
                        marginTop: Spacing * 2,
                        marginBottom: Spacing
                    }}
                >
                    Create account
                </Text>
                <Text
                    style={{
                        fontSize: FontSize.medium,
                        maxWidth: "80%",
                        textAlign: "center",
                        // fontWeight: "bold"
                    }}
                >
                    Create an account to easily manage and track your leaves
                </Text>
            </View>


            <Text style={styles.label}>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="jon@gmail.com"
                style={styles.input}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder=""
                style={styles.input}
                secureTextEntry
            />


            <TouchableOpacity
                onPress={signUpWithEmail}
                disabled={loading}
                style={{
                    padding: Spacing * 2,
                    backgroundColor: Colors.primary,
                    marginVertical: Spacing * 3,
                    borderRadius: Spacing,
                    shadowColor: Colors.primary,
                    shadowOffset: {
                        width: 0,
                        height: Spacing,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: Spacing,
                }}
            >
                <Text
                    style={{
                        color: Colors.onPrimary,
                        textAlign: "center",
                        fontSize: FontSize.large,
                    }}
                >
                    {loading ? 'Creating account...' : 'Create account'}
                </Text>
            </TouchableOpacity>




            {/* <Button
                onPress={signUpWithEmail}
                disabled={loading}
                text={loading ? 'Creating account...' : 'Create account'}
            /> */}
            {/* <Link href="/sign-in" style={styles.textButton}>
                Sign in
            </Link> */}



            <Link
                href="/sign-in"
                style={{
                    padding: .1,
                    textAlign: "center"
                }}
            >
                <Text
                    style={{
                        color: Colors.text,
                        textAlign: "center",
                        fontSize: FontSize.small,
                    }}
                >
                    Already have an account?
                </Text>
            </Link>


            <View
                style={{
                    marginVertical: Spacing * 3,
                }}
            >
                <Text
                    style={{
                        color: Colors.primary,
                        textAlign: "center",
                        fontSize: FontSize.small,
                    }}
                >
                    Or continue with
                </Text>

                <View
                    style={{
                        marginTop: Spacing,
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            padding: Spacing,
                            backgroundColor: Colors.gray,
                            borderRadius: Spacing / 2,
                            marginHorizontal: Spacing,
                        }}
                    >
                        <Ionicons
                            name="logo-google"
                            color={Colors.text}
                            size={Spacing * 2}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            padding: Spacing,
                            backgroundColor: Colors.gray,
                            borderRadius: Spacing / 2,
                            marginHorizontal: Spacing,
                        }}
                    >
                        <Ionicons
                            name="logo-facebook"
                            color={Colors.text}
                            size={Spacing * 2}
                        />
                    </TouchableOpacity>
                </View>
            </View>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        // justifyContent: 'center',
    },
    label: {
        color: 'gray',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        // padding: 10,
        marginTop: 5,
        marginBottom: 20,
        // backgroundColor: 'white',
        // borderRadius: 5,


        fontSize: FontSize.small,
        padding: Spacing,
        backgroundColor: Colors.lightPrimary,
        borderRadius: Spacing,
        marginVertical: Spacing,
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
});

export default SignUpScreen;
