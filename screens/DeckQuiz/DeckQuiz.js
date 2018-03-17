// react
import React, { Component } from "react"
import { View, Text } from "react-native"
import DeckQuizCard from "./DeckQuizCard"
import DeckQuizFinish from "./DeckQuizFinish"
// etc
import {
  setLocalNotifications,
  clearLocalNotifications
} from "../../services/notifications"

const initialState = {
  index: 0,
  score: 0,
  isShowingAnswer: false
}

class DeckQuiz extends Component {
  state = initialState

  onToggleAnswer = () => {
    this.setState(state => ({ isShowingAnswer: !state.isShowingAnswer }))
  }

  onCardResult = score => {
    this.setState(state => ({
      index: state.index + 1,
      score: state.score + score,
      isShowingAnswer: false
    }))
  }

  onFinishQuiz = () => {
    clearLocalNotifications().then(setLocalNotifications)
  }

  onRestartQuiz = () => {
    this.onFinishQuiz()
    this.setState(initialState)
  }

  onBackToDeck = () => {
    this.onFinishQuiz()
    this.props.navigation.goBack()
  }

  render() {
    const { navigation, screenProps } = this.props
    const { index, score, isShowingAnswer } = this.state

    const { decks } = screenProps
    const { deckId } = navigation.state.params

    const deck = decks[deckId]
    const cards = Object.entries(deck.cards).sort((a, b) => a.order - b.order)

    const count = cards.length

    return index < cards.length ? (
      <DeckQuizCard
        card={cards[index][1]}
        isShowingAnswer={isShowingAnswer}
        onToggleAnswer={this.onToggleAnswer}
        onCardResult={this.onCardResult}
      />
    ) : (
      <DeckQuizFinish
        score={score}
        maxScore={count}
        onRestartQuiz={this.onRestartQuiz}
        onBackToDeck={this.onBackToDeck}
      />
    )
  }
}

export default DeckQuiz
