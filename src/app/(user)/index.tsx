import { StyleSheet, Text, View, Dimensions, useWindowDimensions, Image } from 'react-native';
import * as React from 'react';
import { Link } from 'expo-router';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useAuth } from '@/providers/AuthProvider';
import Carousel from 'react-native-reanimated-carousel';
import Slider from '@/components/Slider';
import { useCompanyLeaves } from '@/api/requests';

export default function TabOneScreen() {
  const { profile } = useAuth();
  const id = profile.id;

  const { data: requests, error, isLoading } = useCompanyLeaves();

  console.log("REQUESTS: ", requests);


  const renderSliderOrPlaceholder = () => {
    if (isLoading) {
      // If data is still loading, render a loading indicator or placeholder
      return <ActivityIndicator />;
    } else if (error) {
      // If there's an error, render an error message
      return <Text>Error: {error.message}</Text>;
    } else {
      // If data is loaded successfully, render the Slider component
      return <Slider data={requests} />;
    }
  };


  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>

      <View>


        <View style={styles.flexContainer}>
          <Link href={`/(user)/leaves/${id}`}>
            <Button mode="contained">
              My Leave Requests
            </Button>
          </Link>
        </View>



        <View style={styles.summaryContainer}>
          <View style={styles.textContainer} >
            <Text style={{ fontWeight: "bold", fontSize: 17 }}>Monthly Leaves Summary </Text>
          </View>

          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
            <View style={styles.leavesContainer}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>Summary:</Text>
              <Text style={{ color: "#f48c06", fontWeight: "bold" }} >Leaves Requested: 7</Text>
              <Text style={{ color: "green", fontWeight: "bold" }}>Leaves Approved: 2</Text>
              <Text style={{ color: "#d62828", fontWeight: "bold" }}>Leaves Rejected: 5  </Text>
            </View>

            <View style={styles.leavesContainer}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }} >Leaves Left:</Text>
              <Text>Casual leaves: 2</Text>
              <Text>Sick leaves:  5</Text>
              <Text>Vacation leaves: 4 </Text>
            </View>
          </View>

        </View>


      </View>


      <View style={styles.companyHolidayContainer}>
        <Text style={styles.holidayText} > Company Policy Holidays</Text>
        {renderSliderOrPlaceholder()}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: "10%",
    alignItems: 'center',
    marginVertical: "4%"
  },
  companyHolidayContainer: {
    paddingTop: 20,
    backgroundColor: '#dee2e6',
  },
  holidayText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: 'bold'
  },
  summaryContainer: {
    backgroundColor: '#dee2e6',
    margin: 10,
    border: 'solid',
    borderRadius: 10,
    paddingVertical: 10
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  leavesContainer: {
    padding: 10
  }
})
