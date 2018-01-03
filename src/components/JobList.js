import React from "react"
import { View, TouchableHighlight, TouchableOpacity, Alert } from "react-native"
import { Text } from "react-native-elements"
import PropTypes from "prop-types"
import Swipeable from "react-native-swipeable"
import { Ionicons } from "@expo/vector-icons"

import css from "../styles"

import currency from "../util/currency"
import { db, auth } from "../firebase"

class JobList extends React.Component {
  handlePress = () => {
    this.props.navigation.navigate("DetailJob", { job: this.props.job })
  }

  handleDelete = () => {
    const actions = [
      { text: "Cancel", onPress: () => { } },
      { text: "OK", onPress: this.deleteJob },
    ]
    Alert.alert("Delete job", "Are you sure you want to delete the job?", actions)
  }

  handleBookmark = () => {
    db.child(`bookmarks/${auth.currentUser.uid}`).update({
      [this.props.job.key]: true,
    })
  }

  deleteJob = () => {
    db.child(`jobs/${this.props.job.key}`).remove(() => { })
  }

  render() {
    const { job, screen } = this.props

    const rightButtons = screen === "myjobs" ? [
      <TouchableOpacity key="0" style={css.rightAction} onPress={this.handleDelete}>
        <Ionicons name="ios-trash-outline" size={36} />
      </TouchableOpacity>,
      <TouchableOpacity key="1" style={css.rightAction}>
        <Ionicons name="ios-create-outline" size={36} />
      </TouchableOpacity>,
    ] : null

    const leftButtons = screen !== "myjobs" ? [
      <TouchableOpacity key="0" style={css.leftAction} onPress={this.handleBookmark}>
        <Ionicons name="ios-bookmark-outline" size={36} />
      </TouchableOpacity >,
    ] : null

    return (
      <Swipeable rightButtons={rightButtons} leftButtons={leftButtons} rightButtonWidth={75}>
        <TouchableHighlight onPress={this.handlePress}>
          <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
            <Text h3>{job.name}</Text>
            <Text h4>{job.company}</Text>
            <Text>Salary: {currency(job.salary_from)} - {currency(job.salary_to)}</Text>
          </View>
        </TouchableHighlight>
      </Swipeable>
    )
  }
}

JobList.propTypes = {
  job: PropTypes.object.isRequired,
  navigation: PropTypes.object,
  screen: PropTypes.string.isRequired,
}

export default JobList
