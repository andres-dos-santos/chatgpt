import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import * as ContextMenu from 'zeego/context-menu'

import { Message, Role } from '@/utils/interfaces'
import Colors from '@/constants/Colors'
import {
  copyToClipboard,
  downloadAndSaveImage,
  shareImage,
} from '@/utils/image'

export function ChatMessage({
  content,
  role,
  imageURL,
  prompt,
  loading,
}: Message & {
  loading?: boolean
}) {
  const contextItems = [
    {
      title: 'Copy',
      systemIcon: 'doc.on.doc',
      action: () => copyToClipboard(imageURL!),
    },
    {
      title: 'Save to Photos',
      systemIcon: 'arrow.down.to.line',
      action: () => downloadAndSaveImage(imageURL!),
    },
    {
      title: 'Share',
      systemIcon: 'square.and.arrow.up',
      action: () => shareImage(imageURL!),
    },
  ]

  return (
    <View style={styles.row}>
      {role === Role.Bot ? (
        <View style={[styles.item]}>
          <Image
            source={require('@/assets/images/logo-white.png')}
            alt=""
            style={styles.chatImage}
          />
        </View>
      ) : (
        <Image
          source={{ uri: 'https://galaxies.dev/img/meerkat_2.jpg' }}
          alt=""
          style={styles.avatar}
        />
      )}

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : (
        <>
          {content === '' && imageURL ? (
            <ContextMenu.Root>
              <ContextMenu.Trigger>
                <Pressable>
                  <Image
                    source={{ uri: imageURL }}
                    style={styles.previewImage}
                    alt=""
                  />
                </Pressable>
              </ContextMenu.Trigger>

              <ContextMenu.Content>
                {contextItems.map((item) => (
                  <ContextMenu.Item key={item.title} onSelect={item.action}>
                    <ContextMenu.ItemTitle>{item.title}</ContextMenu.ItemTitle>
                    <ContextMenu.ItemIcon
                      ios={{
                        name: item.systemIcon,
                        pointSize: 18,
                      }}
                    />
                  </ContextMenu.Item>
                ))}
              </ContextMenu.Content>
            </ContextMenu.Root>
          ) : (
            <Text style={styles.text}>{content}</Text>
          )}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 14,
    gap: 14,
    marginVertical: 12,
  },
  item: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 30,
    height: 30,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: '#000',
  },
  chatImage: {
    margin: 6,
    width: 16,
    height: 16,
    borderRadius: 15,
  },
  text: {
    padding: 4,
    fontFamily: 'inter-medium',
    fontSize: 14,
    flexWrap: 'wrap',
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    height: 26,
    marginLeft: 14,
  },
  previewImage: {
    width: 240,
    height: 240,
    borderRadius: 10,
  },
})
