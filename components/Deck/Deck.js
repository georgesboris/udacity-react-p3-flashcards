// react
import React, { Component } from "react"
import { View } from "react-native"
import { H1, Text, Card, CardItem, Body } from "native-base"

const Deck = ({ title, cards, rightComponent }) => {
  const cardsCount = Object.keys(cards).length
  return (
    <Card style={{ padding: 10 }}>
      <CardItem>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Body style={{ flexGrow: 1 }}>
            <H1>{title}</H1>
            <Text style={{ color: "#999" }}>
              {!cardsCount
                ? "No cards"
                : cardsCount > 1 ? `${cardsCount} cards` : `${cardsCount} card`}
            </Text>
          </Body>
          {rightComponent}
        </View>
      </CardItem>
    </Card>
  )
}

export default Deck
