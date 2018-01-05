import React from "react"
import { View, TouchableOpacity, Alert } from "react-native"
import { Text } from "react-native-elements"
import PropTypes from "prop-types"
import Swipeable from "react-native-swipeable"
import { Ionicons, Entypo } from "@expo/vector-icons"

import css from "../styles"
import * as colors from "../styles/colors"

import currency from "../util/currency"
import { db, auth } from "../firebase"

class JobList extends React.Component {
  bookmarkRef = db.child(`bookmarks/${auth.currentUser.uid}`)

  // redirect to detail job screen
  handlePress = () => {
    this.props.navigation.navigate("DetailJob", { job: this.props.job })
  }

  // delete job action button
  handleDelete = () => {
    const actions = [
      { text: "Cancel", onPress: () => { } },
      { text: "OK", onPress: this.deleteJob },
    ]
    Alert.alert("Delete job", "Are you sure you want to delete the job?", actions)
  }

  handleBookmark = () => {
    if (this.props.screen === "savedjobs") {
      // delete bookmark
      this.bookmarkRef.child(this.props.job.key).remove(() => { })
    } else {
      // add bookmark
      this.bookmarkRef.update({
        [this.props.job.key]: 1,
      })
    }
  }

  // delete job
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
        <Ionicons name="ios-heart-outline" size={36} />
      </TouchableOpacity >,
    ] : null

    return (
      <Swipeable rightButtons={rightButtons} leftButtons={leftButtons} rightButtonWidth={75}>
        <TouchableOpacity onPress={this.handlePress}>
          <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
            <Text h4 style={{ marginBottom: 6 }}>{job.name}</Text>
            <Text style={{ color: colors.red, marginBottom: 4 }}>
              <Entypo name="briefcase" /> {job.company}
            </Text>
            <Text style={{ marginBottom: 4 }}>
              <Entypo name="location-pin" /> {job.city}
            </Text>
            {job.salary_from && job.salary_to && <Text style={{ color: colors.green }}>
              $  {currency(job.salary_from)} - {currency(job.salary_to)}
            </Text>}
          </View>
        </TouchableOpacity>
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
