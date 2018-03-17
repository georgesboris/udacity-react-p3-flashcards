// react
import React, { Component } from "react"
import { ListView, View } from "react-native"
import {
  Container,
  List,
  ListItem,
  Body,
  Text,
  Button,
  Icon
} from "native-base"
import ButtonAdd from "../../components/ButtonAdd/ButtonAdd"
// constants
import { ROUTE_DECK_CARD_CREATE } from "../../constants/routeNames"

class DeckDashboard extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <ButtonAdd
        onPress={() =>
          navigation.navigate(ROUTE_DECK_CARD_CREATE, {
            deckId: navigation.state.params.deckId
          })
        }
      />
    )
  })

  dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

  componentDidMount() {
    const { navigation, screenProps } = this.props
    const { decks } = screenProps
    const { deckId } = navigation.state.params
    const cards = decks[deckId].cards
    if (!Object.entries(cards).length) {
      navigation.navigate(ROUTE_DECK_CARD_CREATE, {
        deckId: navigation.state.params.deckId
      })
    }
  }

  onRemoveCard = cardId => {
    const { navigation, screenProps } = this.props
    const { deckId } = navigation.state.params
    screenProps.onRemoveCard(deckId, cardId)
  }

  render() {
    const { navigation, screenProps } = this.props
    const { decks } = screenProps
    const { deckId } = navigation.state.params
    const deck = decks[deckId]
    const cards = Object.entries(deck.cards).sort(
      (a, b) => a[1].order - b[1].order
    )
    return (
      <Container>
        {cards.length > 0 ? (
          <List
            dataSource={this.dataSource.cloneWithRows(cards)}
            renderRow={([cardId, card]) => (
              <ListItem>
                <Body style={{ padding: 15 }}>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Q</Text>
                    {": "}
                    {card.question}
                  </Text>
                  <View
                    style={{
                      borderTopColor: "#eaeaea",
                      borderTopWidth: 1,
                      marginLeft: 12,
                      marginTop: 13,
                      paddingTop: 13
                    }}
                  />
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>A</Text>: {card.answer}
                  </Text>
                </Body>
              </ListItem>
            )}
            rightOpenValue={-45}
            renderRightHiddenRow={([cardId, _], secId, rowId, rowMap) => (
              <Button
                full
                danger
                onPress={() => {
                  rowMap[`${secId}${rowId}`].props.closeRow()
                  this.onRemoveCard(cardId)
                }}
              >
                <Icon active name="trash" />
              </Button>
            )}
          />
        ) : (
          <View />
        )}
      </Container>
    )
  }
}

export default DeckDashboard
