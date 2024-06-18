import { Redirect, Stack } from 'expo-router'
import {
  Image,
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useMemo, useState } from 'react'
import { FlashList } from '@shopify/flash-list'
import { useMMKVString } from 'react-native-mmkv'
import OpenAI from 'react-native-openai'

import { defaultStyles } from '@/constants/Styles'
import { HeaderDropdown } from '@/components/header-dropdown'
import { MessageInput } from '@/components/message-input'
import { ChatMessage } from '@/components/chat-message'

import { Message, Role } from '@/utils/interfaces'

import { Storage } from '@/utils/storage'
import Colors from '@/constants/Colors'

const DUMMY_MESSAGES = [
  {
    role: Role.Bot,
    content: '',
    imageUrl: 'https://galaxies.dev/img/meerkat_2.jpg',
    prompt:
      'A meerkat astronaut in a futuristic spacesuit, standing upright on a rocky, alien landscape resembling the surface of Mars. The spacesuit is highly detailed with reflective visor and intricate life-support systems. The background shows a distant starry sky and a small Earth visible in the far horizon. The meerkat looks curious and brave, embodying the spirit of exploration.',
  },
  {
    role: Role.Bot,
    content: '',
    imageUrl: 'https://galaxies.dev/img/meerkat_2.jpg',
    prompt:
      'A meerkat astronaut in a futuristic spacesuit, standing upright on a rocky, alien landscape resembling the surface of Mars. The spacesuit is highly detailed with reflective visor and intricate life-support systems. The background shows a distant starry sky and a small Earth visible in the far horizon. The meerkat looks curious and brave, embodying the spirit of exploration.',
  },
]

export default function Dalle() {
  const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES)

  const [height, setHeight] = useState(0)

  const [GPTVersion, setGPTVersion] = useMMKVString('GPTVersion', Storage)
  const [key] = useMMKVString('apiKey', Storage)
  const [organization] = useMMKVString('org', Storage)

  const [working, setWorking] = useState(false)

  const openAI = useMemo(
    () =>
      new OpenAI({
        apiKey: key ?? '',
        organization: organization ?? '',
      }),
    [key, organization],
  )

  const getCompletion = async (message: string) => {
    setWorking(true)

    setMessages([...messages, { content: message, role: Role.User }])

    const result = await openAI.image.create({
      prompt: message,
    })

    if (result.data && result.data.length > 0) {
      const imageURL = result.data[0].url

      setMessages((prev) => [
        ...prev,
        { role: Role.Bot, content: '', imageUrl: imageURL, prompt: message },
      ])

      setWorking(false)
    }
  }

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout

    setHeight(height)
  }

  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   function handleMessage(payload: any) {
  //     setMessages((messages) => {
  //       const newMessage = payload.choices[0].delta.content

  //       if (newMessage) {
  //         messages[messages.length - 1].content += newMessage

  //         return [...messages]
  //       }

  //       if (payload.choices[0]?.finishReason) {
  //         // save the message to the DB
  //       }

  //       return [...messages, newMessage]
  //     })
  //   }

  //   openAI.chat.addListener('onChatMessageReceived', handleMessage)

  //   return () => {
  //     openAI.chat.removeListener('onChatMessageReceived')
  //   }
  // }, [openAI])

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
          <View
            style={{
              marginTop: height / 2 - 100,
              gap: 16,
              alignItems: 'center',
            }}
          >
            <View style={[styles.logoContainer]}>
              <Image
                alt=""
                source={require('@/assets/images/dalle.png')}
                style={styles.image}
              />

              <Text style={styles.label}>
                Let me turn your imagination into imagery.
              </Text>
            </View>
          </View>
        )}

        <FlashList
          data={messages}
          renderItem={({ item }) => <ChatMessage {...item} />}
          estimatedItemSize={400}
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 30 }}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          ListFooterComponent={
            <>
              {working ? (
                <ChatMessage
                  {...{ role: Role.Bot, content: '', loading: true }}
                />
              ) : null}
            </>
          }
        />
      </View>

      <KeyboardAvoidingView
        keyboardVerticalOffset={70}
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
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
    overflow: 'hidden',
    borderColor: Colors.greyLight,
    borderWidth: 1,
  },
  image: {
    resizeMode: 'contain',
  },
  label: {
    color: Colors.grey,
    fontSize: 16,
    fontFamily: 'inter-medium',
  },
})
