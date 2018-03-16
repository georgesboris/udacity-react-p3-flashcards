import React from 'react'
import styled from 'styled-components/native'

const DeckCreate = styled.TouchableOpacity`
  margin: 4px;
  padding: 20px;
  border-radius: 4px;
  background-color: #bbb;
`

const DeckCreateTitle = styled.Text`
  font-weight: bold;
  font-size: 24px;
  color: #444;
`

const DashboardButton = ({ onPress }) => (
  <DeckCreate onPress={onPress}>
    <DeckCreateTitle>Create deck</DeckCreateTitle>
  </DeckCreate>
)

export default DashboardButton
