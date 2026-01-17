import React from 'react'
import { Tabs } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

function _layout() {
    const navigation = useNavigation();
    useEffect(()=>{
      navigation.setOptions({headerShown:false});
    });
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#166534" }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="explore" size={24} color={color} />,
        }}
      />
    </Tabs>
  )
}

export default _layout