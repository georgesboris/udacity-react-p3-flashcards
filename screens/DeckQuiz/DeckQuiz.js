// react
import React from 'react'
import { View, Text } from 'react-native'

const DeckQuiz = ({ navigation }) => {
  const { deck } = navigation.state.params
  return (
    <View>
      <Text>DeckQuiz</Text>
    </View>
  )
}

export default DeckQuiz
