import * as MediaLibrary from 'expo-media-library'
import * as FileSystem from 'expo-file-system'
import * as Clipboard from 'expo-clipboard'
import * as Sharing from 'expo-sharing'
import { Alert } from 'react-native'

export async function shareImage(imageURL: string) {
  Sharing.shareAsync(imageURL)
}

export async function copyToClipboard(imageURL: string) {
  const fileURI = FileSystem.documentDirectory + `${new Date().getTime()}.jpg`

  try {
    const res = await FileSystem.downloadAsync(imageURL, fileURI)

    const base64 = await FileSystem.readAsStringAsync(res.uri, {
      encoding: FileSystem.EncodingType.Base64,
    })

    await Clipboard.setImageAsync(base64)
  } catch (error) {
    console.log('FS Error: ', error)
  }
}

export async function saveFile(fileURI: string) {
  const { status } = await MediaLibrary.requestPermissionsAsync()
  if (status === 'granted') {
    try {
      const asset = await MediaLibrary.createAssetAsync(fileURI)
      const album = await MediaLibrary.getAlbumAsync('Download')
      if (album == null) {
        const result = await MediaLibrary.createAlbumAsync(
          'Download',
          asset,
          false,
        )
        if (result) {
          Alert.alert('Image saved to Photos')
        }
      } else {
        const result = await MediaLibrary.addAssetsToAlbumAsync(
          [asset],
          album,
          false,
        )
        if (result) {
          Alert.alert('Image saved to Photos')
        }
      }
    } catch (err) {
      console.log('Save err: ', err)
    }
  } else if (status === 'denied') {
    Alert.alert('please allow permissions to download')
  }
}

export async function downloadAndSaveImage(imageURL: string) {
  const fileURI = FileSystem.documentDirectory + `${new Date().getTime()}.jpg`

  try {
    const res = await FileSystem.downloadAsync(imageURL, fileURI)
    return saveFile(res.uri)
  } catch (err) {
    console.log('FS Err: ', err)
  }
}
