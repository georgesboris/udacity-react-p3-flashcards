// react
import React from 'react'
import { View, Text, Button } from 'react-native'
// constants
import * as routeNames from '../../constants/routeNames'

const DeckOverview = ({ navigation }) => {
  const { deck } = navigation.state.params
  return (
    <View>
      <Text>{deck.title}</Text>
      <Text>{deck.cards.length} cards</Text>
      <Button
        title="start quiz"
        onPress={() =>
          navigation.navigate(routeNames.ROUTE_DECK_QUIZ, { deck })
        }
      />
      <Button
        title="edit deck"
        onPress={() =>
          navigation.navigate(routeNames.ROUTE_DECK_DASHBOARD, { deck })
        }
      />
    </View>
  )
}

export default DeckOverview
