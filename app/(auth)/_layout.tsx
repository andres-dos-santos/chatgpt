import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(drawer)"
        options={{ headerShown: false, animation: 'ios' }}
      />
    </Stack>
  )
}
