import React from "react"
import { View, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import JobList from "../components/JobList"

import * as colors from "../styles/colors"
import { db, auth } from "../firebase"

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
    ),
  })

  jobsRef = db.child("jobs")

  state = {
    jobs: [],
  }

  componentDidMount() {
    auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        this.getJobs()
      }
    })
  }

  getJobs = () => {
    this.jobsRef.orderByChild("user").equalTo(auth.currentUser.uid).on("value", (snapshot) => {
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
        key={item}
        {...this.props}
        job={item}
        screen="myjobs"
      />
    )
  }

  render() {
    return (
      <View style={{ backgroundColor: colors.white }}>
        <FlatList
          data={this.state.jobs}
          renderItem={this.renderItem}
          style={{ height: "100%" }}
        />
      </View>
    )
  }
}

export default MyJobsScreen