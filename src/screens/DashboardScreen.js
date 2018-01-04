import React from "react"
import { View, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Button } from "react-native-elements"
import { Location, Permissions } from "expo"

import JobList from "../components/JobList"
import ActivityIndicator from "../components/ActivityIndicator"

import * as colors from "../styles/colors"
import { auth, db } from "../firebase"

class DashboardScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "SearchJobs",
    headerRight: (
      <Ionicons
        name="ios-log-out"
        size={32}
        style={{ marginRight: 10 }}
        onPress={() => auth.signOut().then(() => navigation.navigate("Auth"))}
      />
    ),
  })

  jobsRef = db.child("jobs")

  state = {
    jobs: [],
    city: "All Location",
    getLocation: false,
    loading: true,
  }

  componentWillMount() {
    this.getLocation()
  }

  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)

    if (status !== "granted") {
      this.setState({ city: "All Location", getLocation: false })
    } else {
      const { coords } = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = coords
      const location = await Location.reverseGeocodeAsync({ latitude, longitude })
      this.setState({ city: location[0].city, getLocation: true })
    }

    this.getJobs()
  }

  getJobs = () => {
    this.setState({ loading: true })

    let searchRef
    if (this.state.getLocation) {
      searchRef = this.jobsRef
        .orderByChild("city")
        .equalTo(this.state.city)
    } else {
      searchRef = this.jobsRef
    }

    const searchResult = (snapshot) => {
      let items = []
      snapshot.forEach((child) => {
        let item = child.val()
        item["key"] = child.key
        items.push(item)
      })

      this.setState({ jobs: items, loading: false })
    }

    searchRef.on("value", searchResult)
  }

  renderItem = ({ item }) => (
    <JobList
      {...this.props}
      job={item}
      screen="dashboard"
    />
  )

  render() {
    return (
      <View style={{ backgroundColor: colors.white }}>
        <View style={{ margin: 4, justifyContent: "center", alignItems: "center" }}>
          <Button
            raised
            title={this.state.city}
            icon={{ name: "location-pin", type: "entypo" }}
          />
        </View>
        <ActivityIndicator active={this.state.loading} />
        <FlatList
          data={this.state.jobs}
          renderItem={this.renderItem}
          style={{ height: "100%" }}
          refreshing={this.state.loading}
          onRefresh={this.getJobs}
        />
      </View>
    )
  }
}

export default DashboardScreen