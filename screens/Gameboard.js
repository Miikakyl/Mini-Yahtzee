import { View, Text, Pressable,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS, STORAGE_KEY } from "../constants"

import Button from '../components/Button'
import Header from '../components/Header'
import Footer from '../components/Footer'

import styles from "../styles/style"
import { MaterialCommunityIcons } from '@expo/vector-icons'


const board = [
  "dice-1",
  "dice-2",
  "dice-3",
  "dice-4",
  "dice-5",
  "dice-6"
]

const Gameboard = ({ navigation, route }) => {

  const [name, setName] = useState("")
  const [nmbrOfThrowsLeft, setNmbrOfThrowsLef] = useState(NBR_OF_THROWS)
  const [status, setStatus] = useState("Throw Dices")
  const [gameEndStatus, setGameEndStatus] = useState(false)
  // Ovatko nopat kiinitetty
  const [selectedDices, setSelectedDices] =
    useState(new Array(NBR_OF_DICES).fill(false))

  // Noppien silmäluvut
  const [diceSpots, setDiceSpots] =
    useState(new Array(NBR_OF_DICES).fill(0))

  const [selectedDicePoints, setSelectedDicePoints] =
    useState(new Array(MAX_SPOT).fill(false))
  // Kerätyt pisteet
  const [dicePointsTotal, setDicePointsTotal] =
    useState(new Array(MAX_SPOT).fill(0))
  //Pisteiden summa
  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    if (name === "" && route.params?.player) {
      setName(route.params.player)
    }
  }, [])

  useEffect(() => {
    countTotalPoints()

    hasAllPointsSelected = selectedDicePoints.every((value) => value === true)
    if (hasAllPointsSelected) {
      setGameEndStatus(true)
    }
  }, [dicePointsTotal])

  useEffect(() => {
    if (gameEndStatus) {
      setStatus("Game over. All points selected")
      storeScore()
    }
  }, [gameEndStatus])


  const dicesRow = []
  for (let dice = 0; dice < NBR_OF_DICES; dice++) {
    dicesRow.push(
      <View key={"dice" + dice}>
        <Pressable
          key={"dice" + dice}
          onPress={() => selectDice(dice)}>
          <MaterialCommunityIcons
            name={board[dice]}
            key={"dice" + dice}
            size={70}
            color={getDiceColor(dice)}
          />
        </Pressable>
      </View>
    )
  }

  const pointsRow = []
  for (let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <View key={"pointsRow" + spot}>
        <Text  
          style={{color: "#E2D9C9"}} 
          key={"pointsRow" + spot}>
          {getSpotTotal(spot)}
        </Text>
      </View>
    )
  }

  const pointsToSelectRow = []
  for (let numberButton = 0; numberButton < MAX_SPOT; numberButton++) {
    pointsToSelectRow.push(
      <View key={"buttonRow" + numberButton}>
        <Pressable
          key={"buttonRow" + numberButton}
          onPress={() => selectDicePoints(numberButton)}>
          <MaterialCommunityIcons
            name={"numeric-" + (numberButton + 1) + "-circle"}
            key={"buttonRow" + numberButton}
            size={35}
            color={getDicePointsColor(numberButton)}
          />
        </Pressable>
      </View>
    )
  }

  const storeScore = async () => {
    try {
      const scores = await AsyncStorage.getItem(STORAGE_KEY)
      const parsedScores = scores != null ? JSON.parse(scores) : [];

      const score = {
        player: name,
        date: new Date().toISOString().slice(0, 10),
        score: totalPoints,
      }

      const newScores = [...parsedScores, score];

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newScores))

    } catch (e) {
      console.log(e)
    }
  }

  const countTotalPoints = () => {
    var sum = dicePointsTotal.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0)
    if (sum >= BONUS_POINTS_LIMIT)
      sum += BONUS_POINTS

    setTotalPoints(sum)
  }

  const startNewGame = () => {
    setStatus("Throw Dices")
    setGameEndStatus(false)
    setDiceSpots(new Array(NBR_OF_DICES).fill(0))
    setDicePointsTotal(new Array(MAX_SPOT).fill(0))
    setNmbrOfThrowsLef(3)
    setTotalPoints(0)
    setSelectedDicePoints(new Array(NBR_OF_DICES).fill(false))
    setSelectedDices(new Array(NBR_OF_DICES).fill(false))
  }
  function getSpotTotal(i) {
    return dicePointsTotal[i]
  }

  const selectDice = (i) => {
    if (nmbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
      let dices = [...selectedDices]
      dices[i] = selectedDices[i] ? false : true
      setSelectedDices(dices)
    }
    else {
      setStatus("You have to throw dices first")
    }
  }
  function getDiceColor(i) {
    return selectedDices[i] ? "#967D04" : "#E2D9C9"
  }

  function getDicePointsColor(i) {
    return selectedDicePoints[i] ? "#967D04" : "#E2D9C9"
  }

  const selectDicePoints = (i) => {
    if (nmbrOfThrowsLeft === 0) {
      let selectedPoints = [...selectedDicePoints]
      let points = [...dicePointsTotal]

      if (!selectedDicePoints[i]) {
        selectedPoints[i] = true
        let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0)
        points[i] = nbrOfDices * (i + 1)

        setDicePointsTotal(points)
        setSelectedDicePoints(selectedPoints)
        setNmbrOfThrowsLef(3)
        setSelectedDices(new Array(NBR_OF_DICES).fill(false))
        return points[i]
      }
      else if (selectedDicePoints[i]) {
        setStatus("You have already selected points for " + (i + 1))
      }

    }
    else {
      setStatus("Throw " + NBR_OF_THROWS + " times before setting points")
    }
  }

  const throwDices = () => {
    if (nmbrOfThrowsLeft === 0 && !gameEndStatus) {
      setStatus("Select your points before the next throw")
      return 1
    }



    let spots = [...diceSpots]
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1)
        board[i] = "dice-" + randomNumber
        spots[i] = randomNumber
      }
    }
    setNmbrOfThrowsLef(nmbrOfThrowsLeft - 1)
    setDiceSpots(spots)
    setStatus("Select and throw dices again")
  }

  return (
    <View style={[styles.container, { marginTop: Constants.statusBarHeight - 15 }]}>
      <Header />
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1, gap: 15 }}>
        <View styles={styles.rowContainer}>
          {nmbrOfThrowsLeft === 3 && selectedDicePoints.every((value) => value === false)
            ? <MaterialCommunityIcons name="dice-multiple" size={150} color="#937B04" />
            : <View style={styles.rowContainer}>
              {dicesRow}
              </View>
          }
        </View>
        {!gameEndStatus &&
          <Text style={styles.text}>Throws left: {nmbrOfThrowsLeft}</Text>
        }
        <Text style={styles.text}>{status}</Text>
        <Button
          text={gameEndStatus ? "Start new game" : "Throw Dices"}
          callback={gameEndStatus ? startNewGame : throwDices}
        />
        <Text style={styles.totalText}>Total: {totalPoints}</Text>
        <Text style={{color: "#E2D9C9"}}>
          {BONUS_POINTS_LIMIT <= totalPoints
            ? "Congrats! Bonus points (50) added"
            : `You are ${BONUS_POINTS_LIMIT - totalPoints} points away from bonus`
          }
        </Text>
        <View>
          <View style={styles.rowContainer}>
            {pointsRow}
          </View>
          <View style={styles.rowContainer}>
            {pointsToSelectRow}
          </View>
        </View>
        <Text style={[styles.text, { fontWeight: "bold" }]}>Player: {name}</Text>
      </View>
      <Footer />
    </View>
  )
}

export default Gameboard