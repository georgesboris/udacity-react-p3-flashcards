// react
import React, { Component } from "react"
import { View } from "react-native"
import {
  Content,
  Grid,
  H1,
  Text,
  Card,
  CardItem,
  Body,
  Button,
  Icon,
  List,
  ListItem
} from "native-base"
// utils
import * as routeNames from "../../constants/routeNames"

class Dashboard extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <Button
        transparent
        dark
        onPress={() => navigation.navigate(routeNames.ROUTE_DECK_CREATE)}
      >
        <Icon ios="ios-add" android="md-add" />
      </Button>
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
              dataArray={decks}
              renderRow={deck => (
                <ListItem
                  button
                  onPress={() =>
                    navigation.navigate(routeNames.ROUTE_DECK_OVERVIEW, {
                      deck
                    })
                  }
                >
                  <Card style={{ padding: 10 }}>
                    <CardItem>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Body style={{ flexGrow: 1 }}>
                          <H1>{deck.title}</H1>
                          <Text>
                            Number of cards: {Object.keys(deck.cards).length}
                          </Text>
                        </Body>
                        <Icon
                          ios="ios-arrow-forward"
                          android="md-arrow-forward"
                          style={{ color: "#DDD", width: "auto" }}
                        />
                      </View>
                    </CardItem>
                  </Card>
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
