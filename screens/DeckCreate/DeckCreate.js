import React, { Component } from "react"
import { Text } from "react-native"

class DeckCreate extends Component {
  state = {
    title: "testando"
  }

  onChange = title => {
    this.setState({ title })
  }

  onSubmit = () => {
    const { title } = this.state
    const { navigation, screenProps } = this.props
    const { onCreateNewDeck } = screenProps
    onCreateNewDeck(this.state.title)
    navigation.goBack()
  }

  render() {
    const { navigation } = this.props
    return <Text>"deck create"</Text>
  }
}

export default DeckCreate
