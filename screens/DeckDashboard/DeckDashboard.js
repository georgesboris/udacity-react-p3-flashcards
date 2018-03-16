// react
import React from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native'
// constants
import * as routeNames from '../../constants/routeNames'

const DeckDashboard = ({ navigation }) => {
  const { deck } = navigation.state.params
  return (
    <View>
      {deck.cards.map(card => (
        <View key={card.id}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routeNames.ROUTE_DECK_CARD_EDIT, {
                deck,
                card
              })
            }
          >
            <Text>{card.question}</Text>
            <Text>{card.answer}</Text>
            <Text>{card.correct}</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Button
        onPress={() => navigation.navigate(routeNames.ROUTE_DECK_CARD_CREATE)}
        title="create card"
      />
    </View>
  )
}

export default DeckDashboard
