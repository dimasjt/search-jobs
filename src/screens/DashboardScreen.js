import React from "react"
import { View, Text, FlatList } from "react-native"

import JobList from "../components/JobList"

import { db } from "../firebase"

class DashboardScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "SearchJobs",
  }

  jobsRef = db.child("jobs")

  state = {
    jobs: []
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
      />
    )
  }

  render() {
    return (
      <View>
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