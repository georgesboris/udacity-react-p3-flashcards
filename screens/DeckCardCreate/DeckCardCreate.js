// react
import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

const DeckCardCreate = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text>DeckCardCreate</Text>
    </TouchableOpacity>
  )
}

export default DeckCardCreate
