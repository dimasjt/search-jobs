import React from "react"
import { View } from "react-native"
import { Text, Divider } from "react-native-elements"
import { Ionicons } from "@expo/vector-icons"
import PropTypes from "prop-types"
import MapView from "react-native-maps"

// NOTE: search location when location is null

import currency from "../util/currency"
import * as colors from "../styles/colors"

class DetailJobScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.job.name,
    headerRight: (
      <Ionicons
        name="ios-bookmark-outline"
        onPress={() => { }}
        size={32}
        style={{ marginRight: 10 }}
      />
    ),
  })

  state = { job: {} }

  componentWillMount() {
    this.setState({ job: this.props.navigation.state.params.job })
  }

  render() {
    const { job } = this.state

    return (
      <View style={{ backgroundColor: colors.white, flex: 1 }}>
        <View style={{ padding: 10 }}>
          <Text h3>{job.name}</Text>
          <Text h4>{job.company}</Text>
          <Text>Salary: {currency(job.salary_from)} - {currency(job.salary_to)}</Text>
        </View>

        <Divider style={{ height: 1, backgroundColor: "#cccccc" }} />

        <View style={{ padding: 10 }}>
          <Text>{job.description}</Text>
        </View>
        <View>
          <MapView
            style={{ width: "100%", height: 200 }}
            cacheEnabled
            initialRegion={{
              latitude: job.location.latitude,
              longitude: job.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <MapView.Marker
              coordinate={job.location}
            />
          </MapView>
        </View>
      </View>
    )
  }
}

DetailJobScreen.propTypes = {
  navigation: PropTypes.object,
}

export default DetailJobScreen