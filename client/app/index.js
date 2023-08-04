import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './tabs/home/Home';
import PrescriptionList from './tabs/list/PrescriptionList';
import Calendar from './tabs/calendar/Calendar';
import usePrescriptionData from './hooks/usePrescriptionData';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function App() {

    const { state } = usePrescriptionData();

    return (
        <NavigationContainer independent={true} screenOptions={{ headerTitle: "" }}>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen
                    name="Home"
                    component={Home}

                    options={{
                        headerTitle: "",
                        headerShown: false,
                        headerShadowVisible: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons
                                name={focused ? 'ios-home' : 'ios-home-outline'}
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Prescription List"
                    component={PrescriptionList}
                    initialParams={state}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons
                                name={focused ? 'list' : 'list-outline'}
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Calendar View"
                    component={Calendar}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons
                                name={focused ? 'calendar' : 'calendar-outline'}
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    );
}
export default App;