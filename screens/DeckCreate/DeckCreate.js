// react
import React, { Component } from "react"
import { View } from "react-native"
import { Container, Form, Item, Label, Input, Button, Text } from "native-base"
// etc
import { ROUTE_DECK_OVERVIEW } from "../../constants/routeNames"

class DeckCreate extends Component {
  state = {
    title: ""
  }

  onChange = title => {
    this.setState({ title })
  }

  onSubmit = () => {
    const { title } = this.state
    const { navigation, screenProps } = this.props
    const { onCreateNewDeck } = screenProps
    onCreateNewDeck(this.state.title).then(deck =>
      navigation.replace(ROUTE_DECK_OVERVIEW, { deckId: deck.id })
    )
  }

  render() {
    const { navigation } = this.props
    return (
      <Container>
        <Form style={{ flexGrow: 1 }}>
          <Item floatingLabel last>
            <Label>Deck title</Label>
            <Input value={this.state.title} onChangeText={this.onChange} />
          </Item>
        </Form>
        <View style={{ padding: 15, marginBottom: 20 }}>
          <Button
            full
            primary
            disabled={this.state.title.length === 0}
            onPress={this.onSubmit}
          >
            <Text>Confirm</Text>
          </Button>
        </View>
      </Container>
    )
  }
}

export default DeckCreate
