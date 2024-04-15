import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Employee } from '@/types';
import { FontAwesome } from '@expo/vector-icons';

type EmployeeListItemProps = {
    employee: Employee;
};

const EmployeeListItem = ({ employee }: EmployeeListItemProps) => {
    return (
        <Link href="/" asChild>
            <Pressable style={styles.container}>
                <Text style={styles.price}>{employee.id}</Text>
                <Text style={styles.title}>{employee.name}</Text>
                <Text style={styles.price}>{employee.position}</Text>
            </Pressable>
        </Link>
    )
}

export default EmployeeListItem

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
});