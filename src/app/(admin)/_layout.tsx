import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useAuth } from '@/providers/AuthProvider';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabOneScreen from '.';
import createEmployee from './employee/create';
import EmployeeList from './employee';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;

}


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAdmin } = useAuth()

  if (!isAdmin) {
    return <Redirect href={'/'} />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="employee"
        options={{
          title: 'Employes',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="male" color={color} />,
        }}
      />
      <Tabs.Screen
        name="leaves"
        options={{
          title: 'Leave Requests',
          tabBarButton: (props) => null, //like this
          
        }}
      />
    </Tabs>
  );
}
