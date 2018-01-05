import React from "react"
import { View } from "react-native"
import { Text } from "react-native-elements"
import { Ionicons, Entypo } from "@expo/vector-icons"
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
        name="ios-more"
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
        <View style={{ padding: 10, flex: 2, borderBottomWidth: 1, borderBottomColor: colors.grey }}>
          <Text h4 style={{ marginBottom: 6 }}>{job.name}</Text>
          <Text style={{ marginBottom: 4, color: colors.red }}>
            <Entypo name="briefcase" /> {job.company}
          </Text>
          <Text style={{ marginBottom: 4, color: colors.green }}>
            $  {currency(job.salary_from)} - {currency(job.salary_to)}
          </Text>
        </View>

        <View style={{ padding: 10, flex: 3.8 }}>
          <Text>{job.description}</Text>
        </View>

        <View style={{ flex: 3, borderTopWidth: 1, borderTopColor: colors.grey }}>
          <MapView
            style={{ width: "100%", height: "100%" }}
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