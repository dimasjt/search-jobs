import React from "react"
import { View, Text } from "react-native"

import * as colors from "../styles/colors"

class SavedJobsScreen extends React.Component {
  render() {
    return (
      <View style={{ backgroundColor: colors.white, flex: 1 }}>
        <Text>SavedJobsScreen</Text>
      </View>
    )
  }
}

export default SavedJobsScreen