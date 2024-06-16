/* eslint-disable @typescript-eslint/no-unused-vars */
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { Storage } from '@/utils/storage'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useMMKVString } from 'react-native-mmkv'

export default function Settings() {
  const [key, setKey] = useMMKVString('apiKey', Storage)
  const [_, setOrganization] = useMMKVString('org', Storage)

  const [keyText, setKeyText] = useState('')
  const [organizationText, setOrganizationText] = useState('')

  const router = useRouter()

  // const { signOut } = useAuth()

  function onSaveAPIKey() {
    setKey(keyText)

    setOrganization(organizationText)

    router.push('/(auth)/(drawer)')
  }

  function onRemoveAPIKey() {
    setKey('')

    setOrganization('')
  }

  return (
    <View style={styles.container}>
      {key && key !== '' && (
        <>
          <Text style={styles.label}>You are all set!</Text>

          <TouchableOpacity
            style={[defaultStyles.btn, { backgroundColor: Colors.primary }]}
            onPress={onRemoveAPIKey}
          >
            <Text style={styles.buttonText}>Remove API Key</Text>
          </TouchableOpacity>
        </>
      )}

      {!key || key === '' ? (
        <>
          <Text style={styles.label}>API Key & Organization:</Text>

          <TextInput
            style={styles.input}
            value={keyText}
            onChangeText={setKeyText}
            placeholder="Enter your API key"
            autoCorrect={false}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            value={organizationText}
            onChangeText={setOrganizationText}
            placeholder="Your organization"
            autoCorrect={false}
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={[defaultStyles.btn, { backgroundColor: Colors.primary }]}
            onPress={onSaveAPIKey}
          >
            <Text style={styles.buttonText}>Save API Key</Text>
          </TouchableOpacity>

          {/** <Button title="Sign out" onPress={() => signOut()} /> */}
        </>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'inter-medium',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: '#FFF',
    fontFamily: 'inter-medium',
    fontSize: 13,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'inter-regular',
  },
})
