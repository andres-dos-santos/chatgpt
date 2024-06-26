import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'

export function BottomLoginSheet() {
  const { bottom } = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Platform.OS === 'ios' ? bottom : bottom + 20 },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={[defaultStyles.btn, styles.btnLight]}
      >
        <Ionicons name="logo-apple" size={16} style={styles.btnIcon} />
        <Text style={styles.btnLightText}>Continue with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[defaultStyles.btn, styles.btnDark]}
      >
        <Ionicons
          name="logo-google"
          size={16}
          style={styles.btnIcon}
          color="#fff"
        />
        <Text style={styles.btnDarkText}>Continue with Google</Text>
      </TouchableOpacity>

      <Link
        href={{
          pathname: '/login',
          params: { type: 'register' },
        }}
        asChild
        style={[defaultStyles.btn, styles.btnOutline]}
      >
        <TouchableOpacity activeOpacity={0.8}>
          <Ionicons name="mail" size={20} style={styles.btnIcon} color="#fff" />
          <Text style={styles.btnDarkText}>Sign in with email</Text>
        </TouchableOpacity>
      </Link>

      <Link
        href={{
          pathname: '/login',
          params: { type: 'login' },
        }}
        asChild
        style={[defaultStyles.btn, styles.btnOutline]}
      >
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.btnDarkText}>Login</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#000',
    padding: 26,
    gap: 14,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  btnLight: {
    backgroundColor: '#fff',
  },
  btnIcon: {
    paddingRight: 7,
  },
  btnLightText: {
    fontSize: 16,
    fontFamily: 'inter-medium',
    letterSpacing: -0.1,
  },
  btnDark: {
    backgroundColor: Colors.grey,
  },
  btnDarkText: {
    fontSize: 16,
    fontFamily: 'inter-regular',
    letterSpacing: -0.1,
    color: '#fff',
  },
  btnOutline: {
    borderColor: Colors.grey,
    borderWidth: 2,
  },
})
