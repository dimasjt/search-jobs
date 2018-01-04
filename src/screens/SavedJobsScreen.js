import React from "react"
import { View, FlatList, Text } from "react-native"

import JobList from "../components/JobList"

import * as colors from "../styles/colors"
import { db, auth } from "../firebase"

class SavedJobsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Saved Jobs",
  }

  state = { jobs: [], loading: true }

  componentDidMount() {
    auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        this.getSavedJobs()
      }
    })
  }

  getSavedJobs = () => {
    this.setState({ loading: true })

    db.child(`bookmarks/${auth.currentUser.uid}`).on("value", (snapshot) => {
      let items = []
      snapshot.forEach((child) => {
        db.child(`jobs/${child.key}`).once("value", (snapshot) => {
          items.push({
            key: snapshot.key,
            ...snapshot.val(),
          })
        })
      })

      this.setState({ jobs: items, loading: false })
    })
  }

  renderItem = ({ item }) => (
    <JobList
      {...this.props}
      job={item}
      screen="savedjobs"
    />
  )

  render() {
    return (
      <View style={{ backgroundColor: colors.white, flex: 1 }}>
        <FlatList
          data={this.state.jobs}
          renderItem={this.renderItem}
          style={{ height: "100%" }}
          refreshing={this.state.loading}
          onRefresh={this.getSavedJobs}
        />
      </View>
    )
  }
}

export default SavedJobsScreen