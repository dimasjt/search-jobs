import React from "react"
import { View, TouchableOpacity } from "react-native"
import { Text } from "react-native-elements"

class JobList extends React.Component {
  handlePress = () => {
    this.props.navigation.navigate("DetailJob")
  }

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#999" }}>
          <Text h3>JobList {this.props.job}</Text>
          <Text h4>Facebook Inc</Text>
          <Text>IDR 10.000.000 - 15.000.000</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default JobList
