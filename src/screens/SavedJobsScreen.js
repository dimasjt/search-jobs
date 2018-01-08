import React from "react"
import { View, FlatList } from "react-native"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import JobList from "../components/JobList"

import * as colors from "../styles/colors"
import { db, auth } from "../firebase"
import { setBookmars } from "../actions/bookmark"

class SavedJobsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Saved Jobs",
  }

  state = { loading: true }

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

      this.props.dispatch(setBookmars(items))
      this.setState({ loading: false })
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
          data={this.props.bookmarks.all}
          renderItem={this.renderItem}
          style={{ height: "100%" }}
          refreshing={this.state.loading}
          onRefresh={this.getSavedJobs}
        />
      </View>
    )
  }
}

SavedJobsScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  bookmarks: PropTypes.object.isRequired,
}

export default connect(state => state)(SavedJobsScreen)