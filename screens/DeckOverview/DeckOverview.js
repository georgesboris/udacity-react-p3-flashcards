// react
import React, { Component } from "react"
import { View } from "react-native"
import { Content, List, ListItem, Text, Button } from "native-base"
import Deck from "../../components/Deck/Deck"
import ButtonAdd from "../../components/ButtonAdd/ButtonAdd"
// constants
import {
  ROUTE_DECK_DASHBOARD,
  ROUTE_DECK_QUIZ
} from "../../constants/routeNames"

class DeckOverview extends Component {
  render() {
    const { navigation, screenProps } = this.props
    const { decks } = screenProps
    const { deckId } = navigation.state.params
    const deck = decks[deckId]
    const cards = Object.entries(deck.cards)
    return (
      <Content>
        <View style={{ padding: 15 }}>
          <Deck {...deck} />

          <View
            style={{
              paddingLeft: 2,
              paddingRight: 2,
              paddingTop: 15,
              paddingBottom: 35
            }}
          >
            <Button
              full
              dark
              onPress={() =>
                navigation.navigate(ROUTE_DECK_DASHBOARD, { deckId })
              }
            >
              <Text>Manage cards</Text>
            </Button>

            <View style={{ height: 15 }} />

            <Button
              full
              primary
              disabled={cards.length === 0}
              onPress={() => navigation.navigate(ROUTE_DECK_QUIZ, { deckId })}
            >
              <Text>Start quiz</Text>
            </Button>
          </View>
        </View>
      </Content>
    )
  }
}

export default DeckOverview
