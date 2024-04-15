import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { useRequestListByReqId, useStatusChange } from '@/api/requests';
import { ActivityIndicator } from 'react-native-paper';
import Button from '@/components/Button';

const sizes = ['APPROVE', 'REJECT'];

const requestDetails = () => {
    const { id: idString } = useLocalSearchParams();
    console.log("ID : " + idString);
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
    const { data: request, error, isLoading } = useRequestListByReqId(id);

    const [selectedDecision, setSelectedDecision] = useState('');
    const [value, onChangeText] = React.useState('Feedback');
    const {mutate:updateRequest} = useStatusChange();


    console.log("REQUEST:  " , request);




    if (isLoading) {
        return <ActivityIndicator />
    }
    console.log("REQUEST", request);
    console.log("ERROR: ", error?.message)

    const handlePress = () => {

        if(selectedDecision == ""){
            return  alert("Please select a decision");
        }

        const updatedRequest = {
            ...request , feedback: value , status: selectedDecision
        }

        updateRequest(updatedRequest , {
            onSuccess: () => {
                router.back();
            }
        })


    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{request.title}</Text>
            <Text style={styles.price}>Leave type: {request.type}</Text>
            <Text style={styles.title}>Message: {request.message}</Text>
            <Text style={styles.title}> user Id: {request.userId}</Text>
            <Text style={styles.title}>Date: <Text style={styles.dates}> {request.start_date}</Text>  to  <Text style={styles.dates}>{request.end_date} </Text>  </Text>



            <Text style={styles.label}>Feedback: </Text>
            <View
                style={{
                    backgroundColor: value,
                    borderColor: '#000000',
                    borderWidth: 1,
                    marginBottom:15
                }}>
                <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                    style={{ padding: 1, fontSize: 20 }}
                />
            </View>

            <View style={styles.sizes}>
                <Text style={styles.label}>Approve or reject: </Text>
                <Pressable
                    onPress={() => setSelectedDecision("approved")}
                    key={"approved"}
                    style={[
                        styles.approve,
                        {
                            borderColor: "approved" === selectedDecision ? 'black' : 'white',
                        },

                    ]}
                >
                    <Text
                        style={[
                            styles.sizeText,
                        ]}
                    >
                        Approve
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => setSelectedDecision("rejected")}
                    key={"rejected"}
                    style={[
                        styles.reject,
                        {
                            borderColor: "rejected" === selectedDecision ? 'black' : 'white',
                        },

                    ]}
                >
                    <Text
                        style={[
                            styles.sizeText,

                        ]}
                    >
                        Reject
                    </Text>
                </Pressable>

            </View>

            <Button onPress={() => handlePress()} text='Submit' />

        </View >
    );
}

export default requestDetails

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
    },

    sizes: {
        height: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: "flex-start"
    },
    label: {
        color: 'gray',
        fontSize: 16,
    },
    sizeText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
    },
    reject: {
        paddingHorizontal: 4,
        paddingVertical: 2,
        width: 100,
        borderWidth: 4,
        // aspectRatio: 1,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "red"
    },
    approve: {
        paddingHorizontal: 4,
        paddingVertical: 2,
        width: 100,
        borderWidth: 4,
        // aspectRatio: 1,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "green"
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
});