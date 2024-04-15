import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EmployeeListItem from '@/components/EmployeeListItem'
import { useCart } from '@/providers/EmployeeProviders'

export default function EmployeeList() {
    const { employees } = useCart()
    return (
        <FlatList
            data={employees}
            renderItem={({ item }) => <EmployeeListItem employee={item} />}
            // numColumns={2}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            // columnWrapperStyle={{ gap: 10 }}
        />
    )
}


const styles = StyleSheet.create({})