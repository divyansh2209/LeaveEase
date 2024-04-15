import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import leaveReq from '@assets/data/leaveRequests'
import LeaveListItem from '@/components/LeaveListItem'

const leavesList = () => {
    
    return (
        <View>
            <FlatList
                data={leaveReq}
                renderItem={({ item }) => <LeaveListItem request={item}></LeaveListItem>}
                // numColumns={2}
                contentContainerStyle={{ gap: 10, padding: 10 }}
            // columnWrapperStyle={{ gap: 10 }}
            />
        </View>
    )
}

export default leavesList

const styles = StyleSheet.create({})