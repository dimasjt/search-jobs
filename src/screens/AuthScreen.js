import React from "react"
import { View, Text } from "react-native"
import { SocialIcon } from "react-native-elements"
import { Facebook } from "expo"

import firebase, { auth } from "../firebase"

class AuthScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "SearchJobs"
  }

  componentDidMount() {
    auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        this.props.navigation.navigate("Dashboard")
      }
    })
  }

  handleLogin = async () => {
    console.log("triger")
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "1211233472313600", { permissions: ["public_profile", "email"] },
      )

      if (type === "success") {
        const credential = firebase.auth.FacebookAuthProvider.credential(token)

        auth.signInWithCredential(credential)
          .catch(error => console.log(error))
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View>
        <Text>AuthScreen</Text>
        <SocialIcon
          button
          title="Login with Facebook"
          onPress={this.handleLogin}
          type="facebook"
        />
      </View>
    )
  }
}

export default AuthScreen