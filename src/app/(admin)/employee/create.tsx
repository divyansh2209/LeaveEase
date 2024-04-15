import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useCart } from '@/providers/EmployeeProviders';
import { Stack, useLocalSearchParams } from 'expo-router';

const createEmployee = () => {
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [empId, setEmpId] = useState("");
    const [errors, setErrors] = useState('');


    const { addEmployeeItem } = useCart();

    const { id } = useLocalSearchParams();
    const isUpdating = !!id;

    // console.log(`Create MODE: ${id}`)

    const addEmployee = () => {
        if (!empId || !name || !position) {
            Alert.alert("Error", "Please fill in all the fields.");
            return;
        }

        const newEmployee = {
            id: 1, // TODO: Make this dynamic
            name: name,
            position: position
        }

        addEmployeeItem(newEmployee);
    };

    const onSubmit = () => {
        if (isUpdating) {
            // update
            onUpdateCreate();
        } else {
            addEmployee();
        }
    };



    const resetFields = () => {
        setName('');
        setPosition('');
        setEmpId('');
    };

    const onUpdateCreate = () => {
        if (!validateInput()) {
            return;
        }

        console.warn('Updating product: ');

        // Save in the database

        resetFields();
    };

    const validateInput = () => {
        setErrors('');
        if (!name) {
            setErrors('Name is required');
            return false;
        }
        if (!position) {
            setErrors('Price is required');
            return false;
        }
        if (isNaN(parseFloat(empId))) {
            setErrors('Price is not a number');
            return false;
        }
        return true;
    };

    const onDelete = () => {
        console.warn('DELETE!!!!!!!');
    };

    const confirmDelete = () => {
        Alert.alert('Confirm', 'Are you sure you want to delete this product', [
            {
                text: 'Cancel',
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete,
            },
        ]);
    };


    return (
        <View style={styles.container}>

            <Stack.Screen
                options={{ title: isUpdating ? 'Update Product' : 'Create Product' }}
            />

            <TextInput
                placeholder="Enter Employee ID"
                value={empId}
                onChangeText={(text) => setEmpId(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Enter Name"
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Enter Position"
                value={position}
                onChangeText={(text) => setPosition(text)}
                style={styles.input}
            />

            <Text style={{ color: 'red' }}>{errors}</Text>

            <Button title="Add Employee" onPress={onSubmit} />
            {isUpdating && (
                <Text onPress={confirmDelete} style={styles.textButton}>
                    Delete
                </Text>
            )}
        </View>
    )
}

export default createEmployee

const styles = StyleSheet.create({
    container: {

    },
    input: {

    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        marginVertical: 10,
    }
})