import { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'

import Colors from '@/constants/Colors'

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

interface Props {
  onShouldSendMessage(message: string): void
}

export function MessageInput(props: Props) {
  const { bottom } = useSafeAreaInsets()

  const expanded = useSharedValue(0)

  const [message, setMessage] = useState('')

  function expandItems() {
    expanded.value = withTiming(1, { duration: 400 })
  }

  function collapseItems() {
    expanded.value = withTiming(0, { duration: 400 })
  }

  function onChangeText(text: string) {
    collapseItems()

    setMessage(text)
  }

  function onSend() {
    props.onShouldSendMessage(message)

    setMessage('')
  }

  const expandedButtonStyle = useAnimatedStyle(() => {
    const opacityInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [1, 0],
      Extrapolation.CLAMP,
    )

    const widthInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [30, 0],
      Extrapolation.CLAMP,
    )

    return { opacity: opacityInterpolation, width: widthInterpolation }
  })

  const buttonViewStyle = useAnimatedStyle(() => {
    const widthInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [0, 100],
      Extrapolation.CLAMP,
    )

    return { opacity: expanded.value, width: widthInterpolation }
  })

  return (
    <BlurView
      tint="extraLight"
      intensity={80}
      style={{ paddingBottom: bottom + 10, paddingTop: 10 }}
    >
      <View style={styles.row}>
        <AnimatedTouchableOpacity
          onPress={expandItems}
          style={[styles.roundButton, expandedButtonStyle]}
        >
          <Ionicons name="add" size={24} color={Colors.grey} />
        </AnimatedTouchableOpacity>

        <Animated.View style={[styles.buttonView, buttonViewStyle]}>
          <TouchableOpacity onPress={() => ImagePicker.launchCameraAsync()}>
            <Ionicons name="camera-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => ImagePicker.launchImageLibraryAsync()}
          >
            <Ionicons name="image-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => DocumentPicker.getDocumentAsync()}>
            <Ionicons name="folder-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>
        </Animated.View>

        <TextInput
          placeholder="Message"
          multiline
          value={message}
          onChangeText={onChangeText}
          onFocus={collapseItems}
          style={styles.messageInput}
        />

        {message.length > 0 ? (
          <TouchableOpacity onPress={onSend}>
            <Ionicons
              name="arrow-up-circle-outline"
              size={24}
              color={Colors.grey}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <FontAwesome5 name="headphones" size={24} color={Colors.grey} />
          </TouchableOpacity>
        )}
      </View>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  roundButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: Colors.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageInput: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    height: 35,
    paddingHorizontal: 10,
    fontFamily: 'inter-medium',
    fontSize: 14,
    borderColor: Colors.greyLight,
    backgroundColor: Colors.light,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
})
