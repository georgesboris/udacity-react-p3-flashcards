// react
import React from "react"
import { View } from "react-native"
import { Content, Text, Button } from "native-base"

const DeckQuizCard = ({
  card,
  isShowingAnswer,
  onToggleAnswer,
  onCardResult
}) => {
  return (
    <Content>
      <Text>{isShowingAnswer ? card.answer : card.question}</Text>

      <Button light onPress={onToggleAnswer}>
        <Text>{isShowingAnswer ? "show question" : "show answer"}</Text>
      </Button>

      {isShowingAnswer && (
        <View>
          <Button full danger onPress={() => onCardResult(0)}>
            <Text>Wrong</Text>
          </Button>
          <Button full primary onPress={() => onCardResult(1)}>
            <Text>Right</Text>
          </Button>
        </View>
      )}
    </Content>
  )
}

export default DeckQuizCard
