import React from "react"
import { View } from "react-native"
import { Avatar, Text, List, ListItem } from "react-native-elements"
import { Ionicons } from "@expo/vector-icons"

import { auth } from "../firebase"

class SettingScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Settings",
  }

  state = { user: {} }

  componentDidMount() {
    auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        this.setState({ user: auth.currentUser })
      }
    })
  }

  render() {
    const { user } = this.state
    const { navigation } = this.props

    return (
      <View>
        <View style={{ justifyContent: "center", alignItems: "center", height: 130, backgroundColor: "#ccc" }}>
          <Avatar
            large
            rounded
            source={{ uri: user.photoURL }}
          />
          <Text h4 style={{ marginTop: 10 }}>{user.displayName}</Text>
        </View>

        <List>
          <ListItem
            title="Sign Out"
            hideChevron
            onPress={() => auth.signOut().then(() => navigation.navigate("Auth"))}
            leftIcon={<Ionicons name="ios-log-out" size={30} />}
          />
        </List>
      </View>
    )
  }
}

export default SettingScreen