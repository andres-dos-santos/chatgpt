import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function LoginPage() {
  const { type } = useLocalSearchParams<{ type: string }>()
  const { bottom } = useSafeAreaInsets()

  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSignUpPress = async () => {
    setLoading(true)
  }

  const onSignInPress = async () => {
    setLoading(true)
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: bottom + 40 }}
      keyboardDismissMode="interactive"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={70}
        style={[styles.container, { paddingBottom: bottom }]}
      >
        {loading && (
          <View style={defaultStyles.loadingOverlay}>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        )}
        <Image
          style={styles.logo}
          source={require('../assets/images/logo-dark.png')}
          alt=""
        />
        <Text style={styles.title}>
          {type === 'login' ? 'Welcome back' : 'Create your account'}
        </Text>

        <Text style={styles.description}>
          Faça login em OpenAI ou prossiga para OpenAI ChatGPT Android.
        </Text>

        <View style={{ marginBottom: 30 }}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            placeholder="Email"
            style={styles.inputField}
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            placeholder="Password"
            secureTextEntry
            style={styles.inputField}
          />
        </View>
        {type === 'login' ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[defaultStyles.btn, styles.btnPrimary]}
            onPress={onSignInPress}
          >
            <Text style={styles.btnPrimaryText}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onSignUpPress}
            style={[defaultStyles.btn, styles.btnPrimary]}
          >
            <Text style={styles.btnPrimaryText}>Create account</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginVertical: 80,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    alignSelf: 'center',
    fontFamily: 'urbanist-extrabold',
    color: '#27272a',
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    alignSelf: 'center',
    fontFamily: 'inter-regular',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#fff',
    fontFamily: 'inter-medium',
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'inter-medium',
  },
})
