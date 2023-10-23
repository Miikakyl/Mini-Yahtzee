import { View, Text } from 'react-native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

import styles from "../styles/style"
import { useCallback } from 'react'

const Header = () => {
  const [fontsLoaded] = useFonts({
    'lobster-regular': require('../assets/fonts/Lobster-Regular.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.header} onLayout={onLayoutRootView}>
      <Text style={[styles.title, {fontFamily: "lobster-regular"}]}>
        Mini-Yahtzee
      </Text>
    </View>
  )
}

export default Header