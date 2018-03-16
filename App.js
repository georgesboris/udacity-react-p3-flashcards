import React from "react"
import Expo from "expo"

import { StackNavigator } from "react-navigation"
import * as routeNames from "./constants/routeNames"
import Dashboard from "./screens/Dashboard/Dashboard"
import DeckCreate from "./screens/DeckCreate/DeckCreate"
import DeckOverview from "./screens/DeckOverview/DeckOverview"
import DeckQuiz from "./screens/DeckQuiz/DeckQuiz"
import DeckDashboard from "./screens/DeckDashboard/DeckDashboard"
import DeckCardCreate from "./screens/DeckCardCreate/DeckCardCreate"
import DeckCardEdit from "./screens/DeckCardEdit/DeckCardEdit"
import * as backend from "./services/backend"

import { View } from "react-native"
import { Container, Text } from "native-base"

/**
 * NavigationStack
 *   Dashboard ->
 *     DeckCreate
 *     DecksList ->
 *       DeckOverview ->
 *         DeckQuiz
 *         DeckDashboard ->
 *           DeckCardsList
 *           DeckCardCreate
 *           DeckCardEdit
 */

const Stack = StackNavigator(
  {
    [routeNames.ROUTE_DASHBOARD]: {
      screen: Dashboard,
      navigationOptions: {
        title: "Flashcards"
      }
    },
    [routeNames.ROUTE_DECK_CREATE]: {
      screen: DeckCreate,
      navigationOptions: {
        title: "Create new deck"
      }
    },
    [routeNames.ROUTE_DECK_OVERVIEW]: {
      screen: DeckOverview,
      navigationOptions: {
        title: "Deck overview"
      }
    },
    [routeNames.ROUTE_DECK_QUIZ]: {
      screen: DeckQuiz,
      navigationOptions: {
        title: "Quiz"
      }
    },
    [routeNames.ROUTE_DECK_DASHBOARD]: {
      screen: DeckDashboard,
      navigationOptions: {
        title: "Deck details"
      }
    },
    [routeNames.ROUTE_DECK_CARD_CREATE]: {
      screen: DeckCardCreate,
      navigationOptions: {
        title: "Create new card"
      }
    },
    [routeNames.ROUTE_DECK_CARD_EDIT]: {
      screen: DeckCardEdit,
      navigationOptions: {
        title: "Edit deck"
      }
    }
  },
  {
    initialRouteName: routeNames.ROUTE_DASHBOARD
  }
)

export default class App extends React.Component {
  state = { decks: {} }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    })

    const decks = await backend.initialFetchDecks()
    this.setState({ decks })
  }

  _triggerAction = action => {
    action
      .then(() => backend.fetchDecks())
      .then(decks => this.setState({ decks }))
  }

  onCreateNewDeck = title => _triggerAction(backend.createDeck(title))
  onUpdateDeck = (id, title) => _triggerAction(backend.updateDeck(id, title))
  onRemoveDeck = id => _triggerAction(backend.removeDeck(id))

  onCreateNewCard = (deckId, question, answer) =>
    _triggerAction(backend.createCard(deckId, question, answer))

  onUpdateCard = (deckId, cardId, question, answer) =>
    _triggerAction(backend.updateCard(deckId, cardId, question, answer))

  onRemoveCard = (deckId, cardId) =>
    _triggerAction(backend.removeCard(deckId, cardId))

  render() {
    return (
      <Stack
        screenProps={{
          onCreateNewDeck: this.onCreateNewDeck,
          onUpdateDeck: this.onUpdateDeck,
          onRemoveDeck: this.onRemoveDeck,
          onCreateNewCard: this.onCreateNewCard,
          onUpdateCard: this.onUpdateCard,
          onRemoveCard: this.onRemoveCard,
          ...this.state
        }}
      />
    )
  }
}
