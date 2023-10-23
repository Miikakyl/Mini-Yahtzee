import { View, Text } from 'react-native'
import React from 'react'

import styles from "../styles/style"

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.author}>
        Author: Miika Kylmänen
      </Text>
    </View>
  )
}

export default Footer