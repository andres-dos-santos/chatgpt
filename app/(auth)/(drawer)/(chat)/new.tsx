import { Redirect, Stack } from 'expo-router'
import {
  Image,
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  View,
} from 'react-native'
import { useEffect, useMemo, useState } from 'react'
import { FlashList } from '@shopify/flash-list'
import { useMMKVString } from 'react-native-mmkv'
import OpenAI from 'react-native-openai'

import { defaultStyles } from '@/constants/Styles'
import { HeaderDropdown } from '@/components/header-dropdown'
import { MessageInput } from '@/components/message-input'
import { MessageIdeas } from '@/components/message-ideas'
import { ChatMessage } from '@/components/chat-message'

import { Message, Role } from '@/utils/interfaces'

import { Storage } from '@/utils/storage'

// const DUMMY_MESSAGES: Message[] = [
//   {
//     content: 'Hello, how can I help you today?',
//     role: Role.Bot,
//   },
//   {
//     content: 'I need help with my React Native app',
//     role: Role.User,
//   },
// ]

export default function NewChat() {
  const [messages, setMessages] = useState<Message[]>([])

  const [height, setHeight] = useState(0)

  const [GPTVersion, setGPTVersion] = useMMKVString('GPTVersion', Storage)
  const [key] = useMMKVString('apiKey', Storage)
  const [organization] = useMMKVString('org', Storage)

  const openAI = useMemo(
    () =>
      new OpenAI({
        apiKey: key ?? '',
        organization: organization ?? '',
      }),
    [key, organization],
  )

  const getCompletion = (message: string) => {
    if (messages.length === 0) {
      // create chat later, store to DB
    }

    setMessages([
      ...messages,
      { content: message, role: Role.User },
      { role: Role.Bot, content: '' },
    ])

    openAI.chat.stream({
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      model: GPTVersion === '4' ? 'gpt-4' : 'gpt-3.5-turbo',
    })
  }

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout

    setHeight(height)
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleMessage(payload: any) {
      setMessages((messages) => {
        const newMessage = payload.choices[0].delta.content

        if (newMessage) {
          messages[messages.length - 1].content += newMessage

          return [...messages]
        }

        if (payload.choices[0]?.finishReason) {
          // save the message to the DB
        }

        return [...messages, newMessage]
      })
    }

    openAI.chat.addListener('onChatMessageReceived', handleMessage)

    return () => {
      openAI.chat.removeListener('onChatMessageReceived')
    }
  }, [openAI])

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
        {/** <Button title="Remove api key" onPress={() => setKey(undefined)} /> */}

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
        {messages.length === 0 && <MessageIdeas onSelectCard={getCompletion} />}

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
