import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  padding: 4px;
`;

const Deck = styled.View.attrs({
  elevation: "2dp"
})`
  margin: 4px;
  padding: 20px;
  border-radius: 4px;
  background-color: #fff;
  shadow-opacity: 0.2;
  shadow-color: #000;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

const DeckTitle = styled.Text`
  font-weight: bold;
  font-size: 36px;
`;

const DashboardDecksList = ({ decks, onPress }) => (
  <Container>
    {Object.keys(decks).map(deckId => (
      <Deck key={deckId}>
        <TouchableOpacity onPress={() => onPress && onPress(decks[deckId])}>
          <DeckTitle>{decks[deckId].title}</DeckTitle>
          <Text>{Object.keys(decks[deckId].cards).length} cards</Text>
        </TouchableOpacity>
      </Deck>
    ))}
  </Container>
);

export default DashboardDecksList;
