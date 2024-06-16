import { Redirect, Stack } from 'expo-router'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useEffect, useState } from 'react'

import { defaultStyles } from '@/constants/Styles'
import { HeaderDropdown } from '@/components/header-dropdown'
import { MessageInput } from '@/components/message-input'
import { MessageIdeas } from '@/components/message-ideas'

import { Message, Role } from '@/utils/interfaces'
import { FlashList } from '@shopify/flash-list'
import { ChatMessage } from '@/components/chat-message'
import { useMMKVString } from 'react-native-mmkv'
import { Storage } from '@/utils/storage'

const DUMMY_MESSAGES: Message[] = [
  {
    content: 'Hello, how can I help you today?',
    role: Role.Bot,
  },
  {
    content: 'I need help with my React Native app',
    role: Role.User,
  },
]

export default function NewChat() {
  const [messages] = useState<Message[]>([])

  const [height, setHeight] = useState(0)

  const [GPTVersion, setGPTVersion] = useMMKVString('GPTVersion', Storage)
  const [key] = useMMKVString('apiKey', Storage)
  const [organization] = useMMKVString('org', Storage)

  const getCompletion = (message: string) => {
    console.log(message)
  }

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout

    setHeight(height)
  }

  /** useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        onLayout({
          nativeEvent: {
            layout: { height: height - event.endCoordinates.height },
          },
        })
      },
    )

    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      (event) => {
        onLayout({
          nativeEvent: {
            layout: { height: height - event.endCoordinates.height },
          },
        })
      },
    )

    return () => {
      showSubscription.remove()

      hideSubscription.remove()
    }
  }, []) */

  if (!key || key === '' || !organization || organization === '') {
    return <Redirect href="/(auth)/(modal)/settings" />
  }

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

      <View style={{ flex: 1 }} onLayout={onLayout}>
        {messages.length === 0 && (
          <View style={[styles.logoContainer, { marginTop: height / 2 - 100 }]}>
            <Image
              alt=""
              source={require('@/assets/images/logo-white.png')}
              style={styles.image}
            />
          </View>
        )}

        <FlashList
          data={messages}
          renderItem={({ item }) => <ChatMessage {...item} />}
          estimatedItemSize={400}
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 30 }}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
        />
      </View>

      <KeyboardAvoidingView
        keyboardVerticalOffset={70}
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {messages.length === 0 && <MessageIdeas onSelectCard={console.log} />}

        <MessageInput onShouldSendMessage={getCompletion} />
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
})
