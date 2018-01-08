import React from "react"
import { View, FlatList } from "react-native"
import { Button } from "react-native-elements"
import { Location, Permissions, Notifications } from "expo"

import JobList from "../components/JobList"

import * as colors from "../styles/colors"
import { auth, db } from "../firebase"

class DashboardScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "SearchJobs",
  }

  jobsRef = db.child("jobs")

  state = {
    jobs: [],
    city: "All Location",
    getLocation: false,
    loading: true,
  }

  componentWillMount() {
    auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        this.getNotification()
        this.getLocation()
      }
    })
  }

  getNotification = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    let finalStatus = existingStatus

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }

    if (finalStatus !== "granted") { return }

    try {
      const token = await Notifications.getExponentPushTokenAsync()
      db.child(`users/${auth.currentUser.uid}`).set({
        token,
      })
    } catch (error) { console.log(error) }
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
      <View style={{ backgroundColor: colors.white, flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <Button
            raised
            title={this.state.city}
            icon={{ name: "location-pin", type: "entypo" }}
          />
        </View>
        <View style={{ flex: 7 }}>
          <FlatList
            data={this.state.jobs}
            renderItem={this.renderItem}
            refreshing={this.state.loading}
            onRefresh={this.getJobs}
          />
        </View>
      </View>
    )
  }
}

export default DashboardScreen