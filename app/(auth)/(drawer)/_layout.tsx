import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import { DrawerActions } from '@react-navigation/native'
import { Link, useNavigation } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'

import Colors from '@/constants/Colors'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomDrawerContent = (props: any) => {
  const { top, bottom } = useSafeAreaInsets()

  return (
    <View style={{ flex: 1, marginTop: top }}>
      <View style={{ backgroundColor: '#FFF', paddingBottom: 16 }}>
        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color={Colors.greyLight}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            underlineColorAndroid="transparent"
          />
        </View>
      </View>

      <DrawerContentScrollView
        contentContainerStyle={{ paddingTop: 0 }}
        {...props}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={{ padding: 16, paddingBottom: bottom }}>
        <Link href="/(auth)/(modal)/settings" asChild>
          <TouchableOpacity style={styles.footer}>
            <Image
              source={{ uri: 'https://galaxies.dev/img/meerkat_2.jpg' }}
              style={styles.avatar}
              alt=""
            />

            <Text style={styles.userName}>Mika Meerkat</Text>

            <Ionicons
              name="ellipsis-horizontal"
              size={24}
              color={Colors.greyLight}
            />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

export default function DrawerLayout() {
  const navigation = useNavigation()
  const { width } = useWindowDimensions()

  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerTitleStyle: { fontFamily: 'inter-medium', fontSize: 15 },
        headerLeft: () => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ marginLeft: 16 }}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
          >
            <FontAwesome6 name="grip-lines" size={18} color={Colors.grey} />
          </TouchableOpacity>
        ),
        headerStyle: { backgroundColor: Colors.light },
        headerShadowVisible: false,
        drawerActiveBackgroundColor: Colors.selected,
        drawerInactiveTintColor: '#000',
        drawerActiveTintColor: '#000',
        overlayColor: 'rgba(0,0,0,0.2)',
        drawerItemStyle: { borderRadius: 12 },
        drawerLabelStyle: { marginLeft: -20, fontFamily: 'inter-medium' },
        drawerStyle: { width: width * 0.86 },
      }}
    >
      <Drawer.Screen
        name="(chat)/new"
        getId={() => Math.random().toString()}
        options={{
          title: 'ChatGPT',
          drawerIcon: () => (
            <View style={[styles.item, { backgroundColor: '#000' }]}>
              <Image
                source={require('@/assets/images/logo-white.png')}
                style={styles.chatGptImage}
                alt=""
              />
            </View>
          ),
          headerRight: () => (
            <Link href="/(auth)/(drawer)/(chat)/new" push asChild>
              <TouchableOpacity activeOpacity={0.8}>
                <Ionicons
                  name="create-outline"
                  size={24}
                  color={Colors.grey}
                  style={{ marginRight: 16 }}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />

      <Drawer.Screen
        name="dalle"
        getId={() => Math.random().toString()}
        options={{
          title: 'Dall•E',
          drawerIcon: () => (
            <View style={[styles.item, { backgroundColor: '#000' }]}>
              <Image
                source={require('@/assets/images/dalle.png')}
                style={styles.dallEImage}
                alt=""
              />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="explore"
        getId={() => Math.random().toString()}
        options={{
          title: `Explore GPT's`,
          drawerIcon: () => (
            <View style={[styles.itemExplore]}>
              <Ionicons name="apps-outline" size={18} color="#000" />
            </View>
          ),
        }}
      />
    </Drawer>
  )
}

const styles = StyleSheet.create({
  itemExplore: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  chatGptImage: {
    height: 16,
    margin: 6,
    width: 16,
    borderRadius: 9999,
  },
  dallEImage: {
    width: 28,
    height: 28,
    resizeMode: 'cover',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.input,
    borderRadius: 10,
    marginHorizontal: 16,
    height: 34,
  },
  searchIcon: {
    padding: 6,
  },
  input: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    alignItems: 'center',
    color: '#424242',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  userName: {
    fontSize: 15,
    flex: 1,
    fontFamily: 'inter-medium',
  },
})
