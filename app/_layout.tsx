import { Ionicons } from '@expo/vector-icons'
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router'
import {
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as SecureStore from 'expo-secure-store'
import { useEffect } from 'react'

import { useFonts } from '@/hooks/useFonts'

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

export function InitialLayout() {
  const fontsLoaded = useFonts()
  const router = useRouter()
  const segments = useSegments()
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded])

  useEffect(() => {
    if (!isLoaded) return

    const inAuthGroup = segments[0] === '(auth)'

    if (isSignedIn && !inAuthGroup) {
      // router.replace('/(auth)/(drawer)/(chat)/new')

      router.replace('/(auth)/(drawer)/dalle')
    } else if (!isSignedIn && inAuthGroup) {
      router.replace('/')
    }
  }, [isLoaded, isSignedIn, router, segments])

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="login"
          options={{
            presentation: 'modal',
            contentStyle: { backgroundColor: '#fafafa' },
            title: '',
            headerLeft: () => (
              <TouchableOpacity activeOpacity={0.8} onPress={router.back}>
                <Ionicons name="close-outline" size={28} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </>
  )
}

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (error) {}
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (error) {}
  },
}

SplashScreen.preventAutoHideAsync()

export default function RootLayoutNavigation() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY ?? ''}
      tokenCache={tokenCache}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <InitialLayout />
      </GestureHandlerRootView>
    </ClerkProvider>
  )
}
