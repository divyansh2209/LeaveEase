import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useSegments } from 'expo-router'
import { LeaveRequest } from '@/types';
import Button from './Button';
import Chip from './Chip';

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

            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                Time Left: {hours} hours {minutes} minutes {seconds} seconds
            </Text>


            <Chip backgroundColor='#ffc300' text={request.status} />
            <Text style={styles.price}>{request.id}</Text>
            <Text style={styles.title}>{request.title}</Text>
            <Text style={styles.price}>Leave type: {request.type}</Text>
            <Text style={styles.title}>Message: {request.message}</Text>
            <Text style={styles.title}> user Id: {request.userId}</Text>
            <Text style={styles.title}>Date: <Text style={styles.dates}> {request.start_date}</Text>  to  <Text style={styles.dates}>{request.end_date} </Text>  </Text>

            <Link href={`/(admin)/leaves/${request.id}`} >
                Details
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
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10,
    },
    price: {

        fontWeight: 'bold',
    },
    dates: {
        color: "blue"
    }
});