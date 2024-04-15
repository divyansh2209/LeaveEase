import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LeaveListItem from '@/components/LeaveListItem'
import { useRequestListActive } from '@/api/requests'
import AdminLeaveRequestItem from '@/components/AdminLeaveRequestItem'

const index = () => {
    const { data:requests , error, isLoading } = useRequestListActive();

    if (isLoading) {
        return <ActivityIndicator />
    }
    if (error) {
        return <Text>Failed to fetch products</Text>
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

export default index