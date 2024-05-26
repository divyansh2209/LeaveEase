import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LeaveListItem from '@/components/LeaveListItem';
import { useRequestListArchive } from '@/api/requests';

const RequestListScreen = () => {
    const { data: requests, error, isLoading } = useRequestListArchive();

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

    return (
        <View style={styles.container}>
            <FlatList
                data={requests}
                renderItem={({ item }) => <LeaveListItem request={item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

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

export default RequestListScreen;
