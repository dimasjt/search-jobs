import React from "react"
import { View, Text, FlatList } from "react-native"

import JobList from "../components/JobList"

class DashboardScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "SearchJobs",
  }

  state = {
    jobs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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

export default DashboardScreen