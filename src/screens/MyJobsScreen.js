import React from "react"
import { View, FlatList } from "react-native"
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
        style={{ marginRight: 10 }}
      />
    )
  })

  state = {
    jobs: []
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