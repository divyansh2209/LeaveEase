import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, interpolate } from "react-native-reanimated";
import RemoteImage from "./RemoteImages";

interface SliderProps {
    data: { image: any }[];
}

interface SliderItem {
    image: string; // Assuming image is a string representing the image URL
    title: string;
    start_date: string; // You might want to use a Date object instead of string
    end_date: string; // You might want to use a Date object instead of string
}

export const defaultPizzaImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';


const Slider: React.FC<SliderProps> = ({ data }) => {
    const defaultImage = require("../../assets/temp_assets/image-product-1-landscape.jpg")
    const [newData] = useState([
        { key: "spacer-left" },
        ...data,
        { key: "spacer-right" },
    ]);
    const { width } = useWindowDimensions();
    const SIZE = width * 0.7;
    const SPACER = (width - SIZE) / 2;
    const x = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        }
    })

    console.log("DATA:  ", data);
    return (
        <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            scrollEventThrottle={26}
            snapToInterval={SIZE}
            decelerationRate="fast"
            onScroll={onScroll}
        >
            {/* <Image source={data[0].image}></Image> */}
            {newData.map((item:SliderItem , index) => {
                console.log('ITEM: ', index, item);
                const style = useAnimatedStyle(() => {
                    const scale = interpolate(
                        x.value,
                        [(index - 1) * SIZE, (index - 1) * SIZE, index * SIZE],
                        [0.8, 1, 0.8]
                    )
                    return {
                        transform: [{ scale }]
                    }
                })
                if (!item.image) {
                    return <View style={{ width: SPACER }} key={index} />
                }
                return (
                    <View style={{ width: SIZE }} key={index}>
                        <Animated.View style={[styles.imageContainer, style]}>
                            {/* <Image source={item.image} style={styles.image} /> */}
                            <RemoteImage  path={item.image} fallback={defaultPizzaImage} style={styles.image} />
                            <View style={{ display: 'flex', alignItems: 'center' }}>
                                <Text>{item.title}</Text>
                                <Text>From {item.start_date} to {item.end_date}</Text>

                            </View>
                        </Animated.View>
                    </View>
                );
            })}
        </Animated.ScrollView>
    );
};

export default Slider;

const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 34,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: undefined,
        aspectRatio: 1,
    },
});
