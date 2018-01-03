import React from "react"
import { View, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import JobList from "../components/JobList"

import { auth, db } from "../firebase"

class DashboardScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "SearchJobs",
    headerRight: (
      <Ionicons
        name="ios-log-out"
        size={32}
        style={{ marginRight: 10 }}
        onPress={() => auth.signOut().then(() => navigation.navigate("Auth"))}
      />
    ),
  })

  jobsRef = db.child("jobs")

  state = {
    jobs: [],
  }

  componentWillMount() {
    this.getJobs()
  }

  getJobs = () => {
    this.jobsRef.orderByKey().on("value", (snapshot) => {
      let items = []
      snapshot.forEach((child) => {
        let item = child.val()
        item["key"] = child.key
        items.push(item)
      })

      this.setState({ jobs: items })
    })
  }

  renderItem = ({ item }) => {
    return (
      <JobList
        {...this.props}
        job={item}
        screen="dashboard"
      />
    )
  }

  render() {
    return (
      <View style={{ backgroundColor: "#fefefe" }}>
        <FlatList
          data={this.state.jobs}
          renderItem={this.renderItem}
          style={{ height: "100%" }}
        />
      </View>
    )
  }
}

export default DashboardScreen