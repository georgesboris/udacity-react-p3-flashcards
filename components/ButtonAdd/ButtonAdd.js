// react
import React from "react"
import { Button, Icon } from "native-base"

const ButtonAdd = ({ onPress }) => {
  return (
    <Button transparent dark onPress={onPress}>
      <Icon ios="ios-add" android="md-add" style={{ fontSize: 40 }} />
    </Button>
  )
}

export default ButtonAdd
