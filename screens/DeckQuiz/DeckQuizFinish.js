// react
import React from "react"
import { View } from "react-native"
import { Content, Text, Button } from "native-base"

const DeckQuizFinish = ({ score, maxScore, onRestartQuiz, onBackToDeck }) => {
  return (
    <Content>
      <Text>
        Score: {score}/{maxScore} ({score / maxScore * 100}%)
      </Text>
      <Button full dark onPress={onRestartQuiz}>
        <Text>Restart Quiz</Text>
      </Button>
      <Button full primary onPress={onBackToDeck}>
        <Text>Back to deck</Text>
      </Button>
    </Content>
  )
}

export default DeckQuizFinish
