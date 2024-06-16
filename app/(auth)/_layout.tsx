import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'

export default function AuthLayout() {
  const router = useRouter()

  return (
    <Stack>
      <Stack.Screen
        name="(drawer)"
        options={{ headerShown: false, animation: 'ios' }}
      />
      <Stack.Screen
        name="(modal)/settings"
        options={{
          animation: 'ios',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.selected,
          },
          headerTitleStyle: {
            fontFamily: 'inter-medium',
          },
          headerRight: () =>
            router.canGoBack() && (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  backgroundColor: Colors.greyLight,
                  borderRadius: 20,
                  padding: 6,
                }}
              >
                <Ionicons name="close-outline" size={15} color={Colors.grey} />
              </TouchableOpacity>
            ),
          headerTitle: 'Settings',
          presentation: 'modal',
        }}
      />
    </Stack>
  )
}
