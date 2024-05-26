import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LeaveListItem from '@/components/LeaveListItem'
import { useRequestListActive } from '@/api/requests'
import AdminLeaveRequestItem from '@/components/AdminLeaveRequestItem'

const index = () => {
    const { data: requests, error, isLoading } = useRequestListActive();

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Failed to fetch requests</Text>
            </View>
        );
    }

    // console.log(data)

    return (
        <View>
            <FlatList
                data={requests}
                renderItem={({ item }) => <AdminLeaveRequestItem request={item}></AdminLeaveRequestItem>}
                contentContainerStyle={{ gap: 10, padding: 10 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    listContainer: {
        gap: 10,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
    },
});

export default index