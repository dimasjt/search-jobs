import React from "react"
import { View, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"

class DetailJobScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "DetailJob",
    headerRight: (
      <Ionicons
        name="ios-bookmark-outline"
        onPress={() => { }}
        size={32}
        style={{ marginRight: 10 }}
      />
    )
  })
  render() {
    return (
      <View>
        <Text>DetailJobScreen</Text>
      </View>
    )
  }
}

export default DetailJobScreen