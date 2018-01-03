import React from "react"
import { View, TouchableHighlight, TouchableOpacity, Alert } from "react-native"
import { Text } from "react-native-elements"
import PropTypes from "prop-types"
import Swipeable from "react-native-swipeable"
import { Ionicons } from "@expo/vector-icons"

import css from "../styles"

import { db } from "../firebase"

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

  deleteJob = () => {
    db.child(`jobs/${this.props.job.key}`).remove(() => { })
  }

  render() {
    const { job } = this.props

    const rightButtons = [
      <TouchableOpacity key="0" style={[css.itemAction, { backgroundColor: "#cc0000" }]} onPress={this.handleDelete}>
        <Ionicons name="ios-trash-outline" size={36} />
      </TouchableOpacity>,
      <TouchableOpacity key="1" style={[css.itemAction, { backgroundColor: "#00ffee" }]}>
        <Ionicons name="ios-create-outline" size={36} />
      </TouchableOpacity>,
    ]

    return (
      <Swipeable rightButtons={rightButtons} rightButtonWidth={75}>
        <TouchableHighlight onPress={this.handlePress}>
          <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
            <Text h3>{job.name}</Text>
            <Text h4>{job.company}</Text>
            <Text>IDR {job.salary_from} - {job.salary_to}</Text>
          </View>
        </TouchableHighlight>
      </Swipeable>
    )
  }
}

JobList.propTypes = {
  job: PropTypes.object.isRequired,
  navigation: PropTypes.object,
}

export default JobList
