// react
import React, { Component } from "react"
import { View } from "react-native"
import { Container, Form, Item, Label, Input, Button, Text } from "native-base"

const initialState = {
  question: "",
  answer: ""
}

class DeckCardCreate extends Component {
  state = initialState

  onChange = prop => value => {
    this.setState({ [prop]: value })
  }

  onSubmit = () => {
    const { question, answer } = this.state
    const { navigation, screenProps } = this.props
    const { deckId } = navigation.state.params
    const { onCreateNewCard } = screenProps
    onCreateNewCard(deckId, question, answer).then(() =>
      this.setState(initialState)
    )
  }

  render() {
    const { navigation } = this.props
    return (
      <Container>
        <Form style={{ flexGrow: 1 }}>
          <Item floatingLabel>
            <Label>Question</Label>
            <Input
              value={this.state.question}
              onChangeText={this.onChange("question")}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Answer</Label>
            <Input
              value={this.state.answer}
              onChangeText={this.onChange("answer")}
            />
          </Item>
        </Form>
        <View style={{ padding: 15, marginBottom: 20 }}>
          <Button
            full
            primary
            disabled={
              this.state.question.length === 0 || this.state.answer.length === 0
            }
            onPress={this.onSubmit}
          >
            <Text>Confirm</Text>
          </Button>
        </View>
      </Container>
    )
  }
}

export default DeckCardCreate
