import React from "react"
import { View, Text } from "react-native"

class DashboardScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "SearchJobs",
  }

  render() {
    return (
      <View>
        <Text>DashboardScreen</Text>
      </View>
    )
  }
}

export default DashboardScreen