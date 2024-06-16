import Colors from '@/constants/Colors'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const PREDEFINED_MESSAGES = [
  { title: 'Explain React Native', text: `Like I'm five years old` },
  {
    title: 'Suggest fun activities',
    text: `For a family visting San Francisco`,
  },
  { title: 'Recommend a dish', text: `To impress a date who's a picky eater` },
]

interface Props {
  onSelectCard(message: string): void
}

export function MessageIdeas(props: Props) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 16,
          paddingVertical: 10,
        }}
      >
        {PREDEFINED_MESSAGES.map((message, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.card}
            onPress={() =>
              props.onSelectCard(`${message.title}${message.text}`)
            }
          >
            <Text style={{ fontFamily: 'inter-medium', fontSize: 16 }}>
              {message.title}
            </Text>

            <Text
              style={{
                fontFamily: 'inter-regular',
                fontSize: 14,
                color: Colors.grey,
              }}
            >
              {message.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.input,
    padding: 14,
    borderRadius: 10,
  },
})
