// Import necessary modules
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect } from 'expo-router';
import { Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useAuth } from '@/providers/AuthProvider';

import TabOneScreen from './index';
import RequestList from './leaves/[id]';
import LeavesCreate from './leavesCreate';
import CalendarIndex from './calendar';

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={'/'} />;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}>

      <Tab.Screen
        name="index"
        component={TabOneScreen}
        options={{
          title: 'User Home',
        }}
      />

      <Tab.Screen
        name="leaves"
        component={RequestList}
        options={{
          title: 'Leave Request',
          tabBarButton: (props) => null, //like this
          tabBarStyle: { display: 'none' }
        }}
      />

<Tab.Screen
        name="calendar"
        component={CalendarIndex}
        options={{
          title: 'Calendar'
        }}
      />


      <Tab.Screen
        name="createRequest"
        component={LeavesCreate}
        options={{
          title: 'create',
          headerShown: false
        }}
      />

    </Tab.Navigator>
  );
}
