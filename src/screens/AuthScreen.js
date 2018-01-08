import React from "react"
import { View } from "react-native"
import { SocialIcon, Text } from "react-native-elements"
import { Facebook, LinearGradient } from "expo"
import { Ionicons } from "@expo/vector-icons"
import PropTypes from "prop-types"

import firebase, { auth } from "../firebase"
import * as colors from "../styles/colors"

class AuthScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "SearchJobs",
  }

  componentDidMount() {
    auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        this.props.navigation.navigate("Dashboard")
      }
    })
  }

  handleLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "1211233472313600", { permissions: ["public_profile", "email"] },
      )

      if (type === "success") {
        const credential = firebase.auth.FacebookAuthProvider.credential(token)

        auth.signInWithCredential(credential)
          .catch(_ => { })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: colors.white, flex: 1, justifyContent: "center" }}>
        <LinearGradient
          colors={["#ecf0f1", "#ecf0f1"]}
          style={{ flex: 1, justifyContent: "center" }}
          start={[0.1, 1]}
        >
          <View style={{ alignItems: "center" }}>
            <Text h1 style={{ marginBottom: 20, backgroundColor: "transparent" }}>SearchJobs</Text>
            <Text style={{ marginBottom: 30, backgroundColor: "transparent" }}>Find nearby jobs for you</Text>
            <Ionicons name="ios-briefcase" size={64} style={{ backgroundColor: "transparent", marginBottom: 40 }} />
          </View>
          <SocialIcon
            button
            title="Login with Facebook"
            onPress={this.handleLogin}
            type="facebook"
          />
        </LinearGradient>
      </View>
    )
  }
}

AuthScreen.propTypes = {
  navigation: PropTypes.object,
}

export default AuthScreen