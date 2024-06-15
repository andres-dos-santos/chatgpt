import { Stack } from 'expo-router'
import { Text, View } from 'react-native'
import { useState } from 'react'

import { defaultStyles } from '@/constants/Styles'
import { HeaderDropdown } from '@/components/header-dropdown'

export default function NewChat() {
  const [GPTVersion, setGPTVersion] = useState('3.5')

  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderDropdown
              title="ChatGPT"
              items={[
                { key: '3.5', title: 'GPT-3.5', icon: 'new' },
                { key: '4', title: 'GPT-4', icon: 'sparkles' },
              ]}
              selected={GPTVersion}
              onSelect={setGPTVersion}
            />
          ),
        }}
      />
      <Text>New Chat</Text>
    </View>
  )
}
