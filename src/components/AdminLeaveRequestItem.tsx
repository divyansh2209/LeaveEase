import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useSegments } from 'expo-router'
import { LeaveRequest } from '@/types';
import Button from './Button';
import Chip from './Chip';


import Colors from '../constants/Colors';
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";



type LeaveListItemProps = {
    request: LeaveRequest;
};


const AdminLeaveRequestItem = ({ request }: LeaveListItemProps) => {
    const segments = useSegments();
    console.log(segments);
    console.log(request)

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    let interval: NodeJS.Timeout | null = null; // Declare interval variable

    const deadline = new Date(request.created_at);
    deadline.setHours(deadline.getHours() + 24); // Add 24 hours to the createdAt timestamp

    const getTime = () => {
        const time = deadline.getTime() - Date.now();

        if (time <= 0) {
            if (interval) clearInterval(interval); // Clear the interval when time is less than or equal to 0
            return;
        }

        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    useEffect(() => {
        interval = setInterval(() => getTime(), 1000); // Assign interval inside useEffect

        return () => {
            if (interval) clearInterval(interval); // Clear interval on component unmount
        };
    }, []);




    return (
        <View style={styles.container}>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                <Text style={styles.title}>{request.title}</Text>
                <Chip backgroundColor='#ffc300' text={request.status} />
            </View>


            <Text style={{ fontSize: FontSize.medium }}>
                <Text style={{ color: Colors.primary, fontWeight: "bold" }}>Time Left: </Text>
                {hours} hrs {minutes} min {seconds} sec
            </Text>


            {/* <Text style={styles.price}>{request.id}</Text> */}
            <View style={styles.rowContainer}>
                <Text ><Text style={{ color: Colors.primary, fontWeight: "bold" }}>Leave Type: </Text>{request.type}</Text>
            </View>

            <View style={styles.rowContainer}>
                <Text ><Text style={{ color: Colors.primary, fontWeight: "bold" }}>Employee ID: </Text>{request.userId}</Text>
            </View>

            <View style={styles.rowContainer}>
                <Text ><Text style={{ color: Colors.primary, fontWeight: "bold" }}>Time Left: </Text><Text style={styles.dates}> {request.start_date}</Text>  to  <Text style={styles.dates}>{request.end_date} </Text>  </Text>
            </View>

            <View style={styles.rowContainer}>
                <Text><Text style={{ color: Colors.primary, fontWeight: "bold" }}>Message: </Text>{request.message}</Text>
            </View>

            {/* <Link href={`/(admin)/leaves/${request.id}`} >
                Details
            </Link> */}

            <Link
                href={`/(admin)/leaves/${request.id}`}
                style={{
                    padding: Spacing,
                    backgroundColor: Colors.primary,
                    marginVertical: Spacing,
                    borderRadius: Spacing,
                    shadowColor: Colors.primary,
                    shadowOffset: {
                        width: 0,
                        height: Spacing,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: Spacing,
                    textAlign: "center",
                }}
            >
                <Text
                    style={{
                        color: Colors.onPrimary,
                        textAlign: "center",
                        fontSize: FontSize.medium,
                    }}
                >
                    Read More
                </Text>
            </Link>

        </View>
    )
}

export default AdminLeaveRequestItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        flex: 1,

    },

    image: {
        width: '100%',
        aspectRatio: 1,
    },

    title: {
        fontSize: FontSize.large,
        fontWeight: 'bold',
        marginVertical: 3,
    },
    price: {

        fontWeight: 'bold',
    },
    dates: {
        color: "red"
    },
    rowContainer:{
        marginVertical:5
    }
    
});