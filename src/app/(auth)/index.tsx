import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { Link, Stack } from 'expo-router';
import { Button } from "react-native-paper";
import { Image } from "react-native-elements";
const { height } = Dimensions.get("window");


const AuthHome = () => {
    return (
        <SafeAreaView>
            <Stack.Screen options={{ title: '' }} />
            <View>
                <ImageBackground
                    style={{
                        height: height / 2.5,
                    }}
                    resizeMode="contain"
                    source={require("../../../assets/images/welcome-img.png")}
                />

                <View
                    style={{
                        paddingHorizontal: Spacing * 4,
                        paddingTop: Spacing * 4,
                    }}
                >

                    

                    <Button
                        icon={() => (
                            <Image
                                source={require('../../../assets/images/pin.png')}
                                style={[
                                    
                                    {
                                        width: 40,
                                        height: 50,
                                        tintColor: Colors.primary
                                    }
                                ]}
                            />
                        )}
                    >
                    </Button>

                    <Text
                        style={{
                            fontSize: FontSize.xxLarge,
                            color: Colors.primary,
                            fontFamily: Font["poppins-bold"],
                            textAlign: "center",
                        }}
                    >
                        LeaveEase 
                    </Text>

                    <Text
                        style={{
                            fontSize: FontSize.medium,
                            color: Colors.text,
                            fontFamily: Font["poppins-regular"],
                            textAlign: "center",
                            marginTop: Spacing ,
                        }}
                    >
                        Simplifying Your Time Off
                    </Text>
                </View>
                <View
                    style={{
                        paddingHorizontal: Spacing * 2,
                        paddingTop: Spacing * 6,
                        flexDirection: "row",
                    }}
                >
                    <Link
                        href="/sign-in" asChild
                        style={{
                            backgroundColor: Colors.primary,
                            paddingVertical: Spacing * 1.5,
                            paddingHorizontal: Spacing * 2,
                            width: "48%",
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
                                fontFamily: Font["poppins-bold"],
                                color: Colors.onPrimary,
                                fontSize: FontSize.large,
                                textAlign: "center",
                            }}
                        >
                            Login
                        </Text>
                    </Link>

                    <Link
                        href="/sign-up" asChild
                        style={{
                            paddingVertical: Spacing * 1.5,
                            paddingHorizontal: Spacing * 2,
                            width: "48%",
                            borderRadius: Spacing,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: Font["poppins-bold"],
                                color: Colors.text,
                                fontSize: FontSize.large,
                                textAlign: "center",
                            }}
                        >
                            Register
                        </Text>
                    </Link>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default AuthHome

const styles = StyleSheet.create({
});