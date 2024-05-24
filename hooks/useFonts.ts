import {
  Inter_500Medium,
  useFonts as useCustomFonts,
} from '@expo-google-fonts/inter'

export function useFonts() {
  const [fonts] = useCustomFonts({
    'inter-medium': Inter_500Medium,
  })

  return fonts
}
