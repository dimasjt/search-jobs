import React from "react"
import { View, Share, Linking } from "react-native"
import { Text } from "react-native-elements"
import { Ionicons, Entypo } from "@expo/vector-icons"
import PropTypes from "prop-types"
import MapView from "react-native-maps"

// NOTE: search location when location is null

import { auth, db } from "../firebase"
import currency from "../util/currency"
import * as colors from "../styles/colors"

const navigationOptions = ({ navigation }) => {
  const shareAction = () => {
    Share.share({ title: "Job Recommended", url: "http://dimasjt.com", message: "You should apply this job" })
  }
  const saveJob = () => {
    db.child(`bookmarks/${auth.currentUser.uid}`).update({
      [navigation.state.params.job.key]: 1,
    })
  }

  return {
    headerRight: (
      <View style={{ flexDirection: "row" }}>
        <Ionicons
          name="ios-heart-outline"
          onPress={saveJob}
          size={32}
          style={{ marginRight: 12 }}
        />
        <Ionicons
          name="ios-share-alt"
          onPress={shareAction}
          size={32}
          style={{ marginRight: 10 }}
        />
      </View>
    ),
  }
}

class DetailJobScreen extends React.Component {
  static navigationOptions = navigationOptions

  state = { job: {} }

  componentWillMount() {
    this.setState({ job: this.props.navigation.state.params.job })
  }

  openInMaps = async () => {
    const { location: { latitude, longitude }, city } = this.state.job
    let openURL = "https://maps.google.com/maps?q="

    if (latitude) {
      openURL = openURL + `${latitude},${longitude}`
    } else {
      openURL = openURL + city
    }
    try {
      await Linking.canOpenURL(openURL)
      await Linking.openURL(openURL)
    } catch (error) { console.log(error) }
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
            onPress={this.openInMaps}
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