import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useInsertCompantLeaves } from '@/api/requests';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'expo-router';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'
import { randomUUID } from 'expo-crypto';
import { supabase } from '@/lib/supabase';
import { decode } from 'base64-arraybuffer';




const createCompantLeaves = () => {

    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('Select Date')
    const [selectedEndDate, setSelectedEndDate] = useState('Select Date')
    const { mutate: insertLeave } = useInsertCompantLeaves();
    const { profile } = useAuth();
    const router = useRouter();

    const [image, setImage] = useState<string | null>(null);




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

    const onSubmit = async (data) => {
        console.log( "DATAAA: " , data);
        console.log(selectedDate)
        console.log(selectedEndDate)

        const imagePath = await uploadImage();
        const newRequest = {
            title: data.title,
            start_date: selectedDate,
            end_date: selectedEndDate,
            image: imagePath
        }
        console.log("NEWLEAVE:" , newRequest)

        insertLeave(newRequest, {
            onSuccess: () => {
                reset();
                setSelectedDate("Select Date");
                setSelectedEndDate("Select Date")
                router.back();
            }
        });

    };


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        if (!image?.startsWith('file://')) {
            return;
        }

        const base64 = await FileSystem.readAsStringAsync(image, {
            encoding: 'base64',
        });
        const filePath = `${randomUUID()}.png`;
        const contentType = 'image/png';
        const { data, error } = await supabase.storage
            .from('holiday-images')
            .upload(filePath, decode(base64), { contentType });

        if (data) {
            return data.path;
        }
    };

    return (
        <SafeAreaView style={styles.container}>


            {image && (
                <Image
                    source={{ uri: image }}
                    style={styles.image}
                />
            )}
            <Text onPress={pickImage} style={styles.textButton}>
                Select Image
            </Text>

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
    )
}

export default createCompantLeaves

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