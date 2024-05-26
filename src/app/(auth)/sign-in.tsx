import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link, Stack } from 'expo-router';
import { supabase } from '@/lib/supabase';
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
// import Font from "../../constants/Font"; // Ensure this import is correct if used
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState<boolean>(false);


    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            Alert.alert(error.message);
        } else {
            Alert.alert("Sign in successful!");
        }
        setLoading(false);
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Stack.Screen options={{ title: 'Sign in' }} />

                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        Login here
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        Welcome back, you've been missed!
                    </Text>
                </View>

                <Text style={styles.label}>Email</Text>
                <TextInput
                    onBlur={() => setFocused(false)}
                    onFocus={() => setFocused(true)}
                    placeholderTextColor={Colors.darkText}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="jon@gmail.com"
                    style={[styles.input
                    ]}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder=""
                    style={styles.input}
                    secureTextEntry
                />
                <View>
                    <Text
                        style={{

                            fontSize: FontSize.small,
                            color: Colors.primary,
                            alignSelf: "flex-end",
                        }}
                    >
                        Forgot your password ?
                    </Text>
                </View>



                <TouchableOpacity
                    onPress={signInWithEmail}
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
                        {loading ? 'Signing in...' : 'Sign in'}
                    </Text>
                </TouchableOpacity>



                {/* <Button
                    onPress={signInWithEmail}
                    disabled={loading}
                    text={loading ? 'Signing in...' : 'Sign in'}
                /> */}
                {/* <Link href="/sign-up" style={styles.textButton}>
                    Create an account
                </Link> */}

                <Link
                    href="/sign-up"
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
                        Create new account
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




            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        padding: 20,
        justifyContent: 'center',
        flex: 1,
    },
    header: {
        alignItems: 'center',
        marginVertical: Spacing * 3,
    },
    headerTitle: {
        fontSize: FontSize.xLarge,
        color: Colors.primary,
        // fontFamily: Font['poppins-bold'], // Uncomment if Font is correctly imported and used
    },
    headerSubtitle: {
        fontSize: FontSize.large,
        maxWidth: '60%',
        textAlign: 'center',
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

export default SignInScreen;
