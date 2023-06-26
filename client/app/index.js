import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Stack, useRouter } from 'expo-router';

const Home = () => {
    const router = useRouter()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen
                options={{ headerShadowVisible: false }}
            />
        </SafeAreaView>
    )
}

export default Home;