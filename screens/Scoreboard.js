import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { DataTable } from 'react-native-paper'

import { STORAGE_KEY } from "../constants"

import styles from '../styles/style'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'

const Scoreboard = ({ navigation }) => {
  const [scores, setScores] = useState([])


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getScores()
    })
    return unsubscribe
  }, [navigation])


  const getScores = async () => {
    try {
      const topScores = await AsyncStorage.getItem(STORAGE_KEY)
      if (topScores !== null) {

        const parsedTopScores = JSON.parse(topScores)
        scoresInDescendingOrder = parsedTopScores.sort((a, b) => b.score - a.score)
        
        if (scoresInDescendingOrder.length > 5) {
          scoresInDescendingOrder = scoresInDescendingOrder.slice(0, 5)
        }
        setScores(scoresInDescendingOrder)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const clearScores = async () => {

    try {
      await AsyncStorage.clear()
      setScores([])
    } catch (e) {
      console.log(e)
      return
    }
    console.log('Done.')
  }

  return (
    <View style={[styles.container, { marginTop: Constants.statusBarHeight - 15 }]}>
      <Header />
      <View style={{ alignItems: "center" }}>
        <MaterialCommunityIcons
          name='view-list'
          size={150}
          color="#967D04"
        />
        <Text style={styles.scoreboardHeader}>Top five scores</Text>
        {scores.length === 0 &&
          <View style={{ width: "auto", alignItems: "center" }}>
            <Text style={styles.noScoresText}>No scores yet!</Text>
          </View>
        }
      </View>
      <DataTable>
        {scores.length > 0 &&
          scores.map((item, index) => (
            <DataTable.Row key={`${item.key}-${index}`}>
              <DataTable.Cell textStyle={{color: "#E2D9C9"}}>{index + 1}. {item.player}</DataTable.Cell>
              <DataTable.Cell textStyle={{color: "#E2D9C9"}} numeric>{item.date}</DataTable.Cell>
              <DataTable.Cell textStyle={{color: "#E2D9C9"}} numeric>{item.score}</DataTable.Cell>
            </DataTable.Row>
          ))
        }
      </DataTable>
      {scores.length > 0 &&
        <View style={{ position: "absolute", bottom: 50 }}>
          <Button
            text={"Clear scoreboard"}
            color="red"
            callback={clearScores}
          />
        </View>
      }
      <Footer />
    </View>
  )
}

export default Scoreboard