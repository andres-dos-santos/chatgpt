import { View } from 'react-native'

import { AnimatedIntro } from '@/components/animated-intro'
import { BottomLoginSheet } from '@/components/bottom-login-sheet'

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <AnimatedIntro />
      <BottomLoginSheet />
    </View>
  )
}
