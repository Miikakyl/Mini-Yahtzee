import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import styles from "../styles/style"

const Button = ({ text, width, callback, color }) => {


  return (
    <TouchableOpacity
      style={[styles.button, { width: width, backgroundColor: color ? color : "#967D04"}]}
      onPress={callback}
      >
      <Text style={styles.buttonText}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export default Button