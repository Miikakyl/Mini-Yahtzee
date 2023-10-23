import Home from "./screens/Home"
import Gameboard from "./screens/Gameboard"
import Scoreboard from "./screens/Scoreboard"

import { View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { NavigationContainer } from "@react-navigation/native"

const Tab = createBottomTabNavigator()

function App() {

  return (
    <View style={{flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          sceneContainerStyle={{ backgroundColor: "#05593E" }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName
              if (route.name === "Home") {
                iconName = focused ? "information" : "information-outline"
              }
              else if (route.name === "Gameboard") {
                iconName = focused ? "dice-multiple" : "dice-multiple-outline"
              }
              else if (route.name === "Scoreboard") {
                iconName = focused ? "view-list" : "view-list-outline"
              }
              return <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            },
            tabBarStyle: {
              backgroundColor: "#E2D9C9", // Change this to your desired color
            },
            tabBarActiveTintColor: "#967D04",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
          })
          }
        >
          <Tab.Screen name="Home" component={Home} options={{tabBarStyle: {display: "none"}}}/>
          <Tab.Screen name="Gameboard" component={Gameboard} />
          <Tab.Screen name="Scoreboard" component={Scoreboard} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  )
}
export default App