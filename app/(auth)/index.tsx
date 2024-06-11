import { useAuth } from '@clerk/clerk-expo'
import { Button, Text, View } from 'react-native'

export default function AuthPage() {
  const { signOut } = useAuth()

  return (
    <View>
      <Text>Layout here</Text>

      <Button title="Sign out" onPress={() => signOut()} />
    </View>
  )
}
