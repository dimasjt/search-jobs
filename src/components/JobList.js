import React from "react"
import { View, TouchableHighlight } from "react-native"
import { Text } from "react-native-elements"
import PropTypes from "prop-types"

class JobList extends React.Component {
  handlePress = () => {
    this.props.navigation.navigate("DetailJob", { job: this.props.job })
  }

  render() {
    const { job } = this.props

    return (
      <TouchableHighlight onPress={this.handlePress}>
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#999" }}>
          <Text h3>{job.name}</Text>
          <Text h4>{job.company}</Text>
          <Text>IDR {job.salary_from} - {job.salary_to}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

JobList.propTypes = {
  job: PropTypes.object.isRequired,
  navigation: PropTypes.object,
}

export default JobList
