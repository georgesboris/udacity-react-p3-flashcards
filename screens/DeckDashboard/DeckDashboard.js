// react
import React, { Component } from "react"
import { View, Text, TouchableOpacity, Button } from "react-native"
import ButtonAdd from "../../components/ButtonAdd/ButtonAdd"
// constants
import {
  ROUTE_DECK_CARD_EDIT,
  ROUTE_DECK_CARD_CREATE
} from "../../constants/routeNames"

class DeckDashboard extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <ButtonAdd
        onPress={() =>
          navigation.navigate(ROUTE_DECK_CARD_CREATE, {
            deckId: navigation.state.params.deckId
          })
        }
      />
    )
  })

  componentDidMount() {
    const { navigation, screenProps } = this.props
    const { decks } = screenProps
    const { deckId } = navigation.state.params
    const cards = decks[deckId].cards
    if (!Object.entries(cards).length) {
      navigation.navigate(ROUTE_DECK_CARD_CREATE, {
        deckId: navigation.state.params.deckId
      })
    }
  }

  render() {
    const { navigation, screenProps } = this.props
    const { decks } = screenProps
    const { deckId } = navigation.state.params
    const deck = decks[deckId]
    return (
      <View>
        {Object.entries(deck.cards).map(([cardId, card]) => (
          <View key={card.id}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ROUTE_DECK_CARD_EDIT, {
                  deckId,
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
      </View>
    )
  }
}

export default DeckDashboard
