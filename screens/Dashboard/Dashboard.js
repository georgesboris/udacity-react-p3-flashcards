// react
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import DashboardDecksList from './DashboardDecksList'
import DashboardButton from './DashboardButton'
// utils
import * as routeNames from '../../constants/routeNames'

const Dashboard = ({ navigation, screenProps }) => {
  const { decks } = screenProps
  return (
    <View>
      <DashboardDecksList
        decks={decks}
        onPress={deck => {
          navigation.navigate(routeNames.ROUTE_DECK_OVERVIEW, { deck })
        }}
      />
      <DashboardButton
        onPress={() => navigation.navigate(routeNames.ROUTE_DECK_CREATE)}
      />
    </View>
  )
}

export default Dashboard
