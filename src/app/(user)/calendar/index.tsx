import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Calendar } from 'react-native-calendars'


const CalendarIndex = () => {
    return (
        <View>
            <Calendar style={{borderRadius: 10 , margin:20}} onDayPress={date => console.log(date)} />
        </View>
    )
}

export default CalendarIndex

const styles = StyleSheet.create({})