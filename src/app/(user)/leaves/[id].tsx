import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import LeaveListItem from '@/components/LeaveListItem';
import { useRequestListByUserId } from '@/api/requests';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const RequestList = () => {
    const { id } = useLocalSearchParams();
    const {data:requests , error , isLoading } = useRequestListByUserId(id as string);
    if(error){
        console.log(error)
    }
    if(isLoading){
        <ActivityIndicator></ActivityIndicator>
    }

    return (
        <SafeAreaView > 
            <FlatList
                data={requests}
                renderItem={({ item }) => <LeaveListItem request={item}></LeaveListItem>}
                contentContainerStyle={{ gap: 10, padding: 10 }}
            />
        </SafeAreaView>
    )
}

export default RequestList

const styles = StyleSheet.create({
})