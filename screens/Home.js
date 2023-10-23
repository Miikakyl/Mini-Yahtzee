import { View, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import React, { useState } from 'react'
import Constants from "expo-constants"

import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'

import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from "../constants"
import styles from "../styles/style"
import { Ionicons } from '@expo/vector-icons';

const Home = ({ navigation }) => {
  const [name, setName] = useState("")
  const [hasPlayerName, setHasPlayerName] = useState(false)

  const handlePlayerName = () => {
    console.log(name)
    if (name.trim().length > 0) {
      setHasPlayerName(true)
      Keyboard.dismiss()
    }
  }

  return (
    <View style={[styles.container, {marginTop: Constants.statusBarHeight - 15}]}>
      <Header />
      <View style={{ alignItems: "center" }}>
        <Ionicons name="ios-information-circle-sharp" size={100} color="#937A04" />
        {!hasPlayerName ?
          <>
            <Text style={styles.text}>For scoreboard enter your name...</Text>
            <TextInput
              color="#E2D9C9"
              style={styles.input}
              autoFocus={true}
              onChangeText={setName}
            />
          </>
          : <>
            <Text style={[styles.text, { fontWeight: "bold" }]}>Rules of the game</Text>
            <View style={{ width: 280, paddingBottom: 10, alignItems: "center" }}>
            <Text style={{ lineHeight: 20, color: "#E2D9C9"}}>
                THE GAME: Upper section of the classic Yahtzee dice game. You have {NBR_OF_DICES} dices and for the every dice you have {NBR_OF_THROWS} throws. After each throw you can keep dices in order to get same dice spot counts as many as possible. In the end of the turn you must select your points from {MIN_SPOT} to {MAX_SPOT}. Game ends when all points have been selected. The order for selecting those is free.
              </Text>
            </View>
            <View style={{ width: 280, paddingBottom: 10, alignItems: "center" }}>
              <Text style={{ lineHeight: 20, color: "#E2D9C9"}}>
                POINTS: After each turn game calculates the sum for the dices you selected. Only the dices having the same spot count are calculated. Inside the game you can not select same points from {MIN_SPOT} to {MAX_SPOT} again.
              </Text>
            </View>
            <View style={{ width: 280, paddingBottom: 10, alignItems: "center" }}>
              <Text style={{ lineHeight: 20, color: "#E2D9C9"}}>
                GOAL: To get points as much as possible. {BONUS_POINTS_LIMIT} points is the limit of getting bonus which gives you {BONUS_POINTS} points more.
              </Text>
            </View>
            <Text style={styles.text}>Good luck, {name}!</Text>
          </>
        }
        <Button
          callback={hasPlayerName ? () => navigation.navigate("Gameboard", {player: name}) : handlePlayerName}
          text={hasPlayerName ? "Play" : "OK"}
          width={80}
        />
      </View>
      <Footer />
    </View>
  )
}

export default Home