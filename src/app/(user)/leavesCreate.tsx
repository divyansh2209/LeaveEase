import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker'; // Import Picker from the package
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useInsertRequest } from '@/api/requests';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'expo-router';


const LeavesCreate = () => {
    const { control, handleSubmit, reset , formState: { errors } } = useForm();

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('Select Date')
    const [selectedEndDate, setSelectedEndDate] = useState('Select Date')
    const {mutate:insertRequest} = useInsertRequest();
    const {profile} = useAuth();
    const router = useRouter();
    

    const showDatePicker = () => {
        setStartDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setStartDatePickerVisibility(false);
    };

    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };

    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    }

    const handleConfirm = (date: Date) => {
        console.warn("A date has been picked: ", date);
        const dt = new Date(date);
        const x = dt.toISOString().split("T");
        const x1 = x[0].split("-");
        setSelectedDate(x1[2] + "/" + x1[1] + '/' + x1[0])
        hideDatePicker();
    };

    const handleEndConfirm = (date: Date) => {
        console.warn("A date has been picked: ", date);
        const dt = new Date(date);
        const x = dt.toISOString().split("T");
        const x1 = x[0].split("-");
        setSelectedEndDate(x1[2] + "/" + x1[1] + '/' + x1[0])
        hideEndDatePicker();
    };

    const onSubmit = (data: Date) => {
        console.log(data);
        console.log(selectedDate)        
        console.log(selectedEndDate)
        const newRequest = {
            title: data.title,
            type: data.leaveType,
            message: data.message,
            userId: profile.id,
            start_date: selectedDate,
            end_date:  selectedEndDate
        } 
        console.log(newRequest)       

        insertRequest(newRequest , {
            onSuccess: () => {
                reset();
                router.back();
            }
        });

    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Title</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Enter title"
                        />
                    )}
                    name="title"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.example && <Text style={styles.errorText}>This field is required</Text>}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Select Leave Type:</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Picker
                            selectedValue={value}
                            onValueChange={onChange}>
                            <Picker.Item label="Select Leave Type" value="" />
                            <Picker.Item label="Sick Leave" value="sick_leave" />
                            <Picker.Item label="Vacation Leave" value="vacation_leave" />
                            <Picker.Item label="Maternity Leave" value="maternity_leave" />
                            <Picker.Item label="Emergency Leave" value="emergency_leave" />
                        </Picker>
                    )}
                    name="leaveType"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.leaveType && <Text style={styles.errorText}>Please select a leave type</Text>}
            </View>


            <View style={styles.inputContainer}>
                <Text style={styles.label}>Message:</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Write your message here"
                            multiline
                        />
                    )}
                    name="message"
                    defaultValue=""
                />
            </View>

            <View style={{ marginBottom: 20 }}>
                <Text style={styles.label}>Start Date:</Text>
                <TouchableOpacity onPress={() => showDatePicker()} style={{ width: '50%', height: 50, borderWidth: .5, borderRadius: 20, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{selectedDate}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isStartDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>

            <View style={{ marginBottom: 20 }}>
                <Text style={styles.label}>End Date:</Text>
                <TouchableOpacity onPress={() => showEndDatePicker()} style={{ width: '50%', height: 50, borderWidth: .5, borderRadius: 20, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{selectedEndDate}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isEndDatePickerVisible}
                    mode="date"
                    onConfirm={handleEndConfirm}
                    onCancel={hideEndDatePicker}
                />
            </View>

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: "blue",
        marginVertical: 10,
    },

    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    label: {
        color: 'gray',
        fontSize: 16,
    },
    inputContainer: {
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    datePicker: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
});
export default LeavesCreate;
