import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import leaveReq from '@assets/data/leaveRequests'
import LeaveListItem from '@/components/LeaveListItem'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'
import { useRequestListArchive } from '@/api/requests'

const index = () => {
    const { data: requests, error, isLoading } = useRequestListArchive();
    if (isLoading) {
        return <ActivityIndicator />
    }
    if (error) {
        return <Text>Failed to fetch products</Text>
    }

    return (
        <View>
            <FlatList
                data={requests}
                renderItem={({ item }) => <LeaveListItem request={item}></LeaveListItem>}
                // numColumns={2}
                contentContainerStyle={{ gap: 10, padding: 10 }}
            // columnWrapperStyle={{ gap: 10 }}
            />
        </View>
    )
}

export default index