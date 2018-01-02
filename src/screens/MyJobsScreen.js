import React from "react"
import { View, FlatList } from "react-native"
import { Button } from "react-native-elements"
import { Ionicons } from "@expo/vector-icons"

import JobList from "../components/JobList"

class MyJobsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "My Jobs",
    headerRight: (
      <Ionicons
        name="ios-add"
        onPress={() => navigation.navigate("NewJob")}
        size={32}
      />
    )
  })

  state = {
    jobs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }

  renderItem = ({ item }) => {
    return (
      <JobList
        key={item}
        {...this.props}
        job={item}
      />
    )
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.jobs}
          keyExtractor={(item) => item}
          renderItem={this.renderItem}
          style={{ height: "100%" }}
        />
      </View>
    )
  }
}

export default MyJobsScreen