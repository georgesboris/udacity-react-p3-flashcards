// react
import React, { Component } from "react"
import { View } from "react-native"
import {
  Content,
  Grid,
  Text,
  Card,
  CardItem,
  Body,
  Icon,
  List,
  ListItem
} from "native-base"
import Deck from "../../components/Deck/Deck"
import ButtonAdd from "../../components/ButtonAdd/ButtonAdd"
// utils
import {
  ROUTE_DECK_CREATE,
  ROUTE_DECK_OVERVIEW
} from "../../constants/routeNames"

class Dashboard extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <ButtonAdd onPress={() => navigation.navigate(ROUTE_DECK_CREATE)} />
    )
  })

  render() {
    const { navigation, screenProps } = this.props
    const { decks } = screenProps
    return (
      <Content>
        {Object.keys(decks).length > 0 ? (
          <Grid>
            <List
              dataArray={Object.entries(decks)}
              renderRow={([deckId, deck]) => (
                <ListItem
                  button
                  onPress={() =>
                    navigation.navigate(ROUTE_DECK_OVERVIEW, { deckId })
                  }
                >
                  <Deck
                    {...deck}
                    rightComponent={
                      <Icon
                        ios="ios-arrow-forward"
                        android="md-arrow-forward"
                        style={{ color: "#DDD", width: "auto" }}
                      />
                    }
                  />
                </ListItem>
              )}
            />
          </Grid>
        ) : (
          <View style={{ padding: 16 }}>
            <Card style={{ padding: 20 }}>
              <CardItem header style={{ justifyContent: "center" }}>
                <Text style={{ color: "#333" }}>
                  You have exactly zero decks…
                </Text>
              </CardItem>
              <CardItem>
                <Body style={{ alignItems: "center" }}>
                  <Text style={{ color: "#888" }}>
                    Go create one! Look at the top right!
                  </Text>
                  <Text style={{ color: "#888" }}>
                    See that "+"? That's it!
                  </Text>
                </Body>
              </CardItem>
            </Card>
          </View>
        )}
      </Content>
    )
  }
}

export default Dashboard
