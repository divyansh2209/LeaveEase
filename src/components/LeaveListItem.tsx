import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LeaveRequest } from '@/types';
import Chip from './Chip';


type LeaveListItemProps = {
    request: LeaveRequest;
};

const LeaveListItem = ({ request }: LeaveListItemProps) => {

    const [bgColor, setBgColor] = useState("")

    const handleFeedback = () => {
        alert(request.feedback);
    }

    const chipColor = () => {
        if (request.status == "pending") {
            setBgColor("#ffc300")
        }
        if (request.status == "rejected" || request.status == "Rejected") {
            setBgColor("#e5383b")
        }
        if (request.status == "approved") {
            setBgColor("#70e000")
        }
    }

    useEffect(() => {
        chipColor();
    }, [request.status]);

    return (
        <View style={styles.container}>

            <Chip text={request.status} backgroundColor={bgColor} />
            {/* <Text style={styles.price}>{request.id}</Text> */}
            <Text style={styles.title}>{request.title}</Text>
            <Text style={styles.price}>Leave type: {request.type}</Text>
            <Text style={styles.title}>Message: {request.message}</Text>
            <Text style={styles.title}>Date: <Text style={styles.dates}> {request.start_date}</Text>  to  <Text style={styles.dates}>{request.end_date} </Text>  </Text>

            {request.feedback &&
                <Pressable onPress={() => handleFeedback()}>
                    <Chip text='View Feedback' backgroundColor='#0077b6'  />
                </Pressable>
            }
        </View>
    )
}

export default LeaveListItem

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