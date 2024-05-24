import { Ionicons } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import { StatusBar, TouchableOpacity } from 'react-native'

import { useFonts } from '@/hooks/useFonts'

export default function RootLayout() {
  const fontsLoaded = useFonts()
  const router = useRouter()

  if (!fontsLoaded) return null

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
      </Stack>
    </>
  )
}
