import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  useFonts as useCustomFonts,
} from '@expo-google-fonts/inter'

export function useFonts() {
  const [fonts] = useCustomFonts({
    'inter-bold': Inter_700Bold,
    'inter-medium': Inter_500Medium,
    'inter-regular': Inter_400Regular,
    'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'urbanist-extrabold': require('../assets/fonts/Urbanist-ExtraBold.ttf'),
  })

  return fonts
}
