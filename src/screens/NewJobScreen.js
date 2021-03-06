import React from "react"
import { View, ScrollView } from "react-native"
import { Switch } from "react-native"
import { FormLabel, FormInput, Button } from "react-native-elements"
import { Permissions, Location } from "expo"
import KeyboardSpacer from "react-native-keyboard-spacer"

import { auth, db } from "../firebase"

class NewJobScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Post a New Job",
  }

  state = {
    showSalary: false,
    job: {},
  }

  form = {}

  componentDidMount() {
    this.getLocation()
    // this.handleKeyboard()
  }

  // handleKeyboard = () => {
  //   Keyboard.addListener("keyboardDidShow", )
  // }

  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)

    if (status !== "granted") {
      console.log("permission denied")
    }

    const { coords } = await Location.getCurrentPositionAsync()
    const { latitude, longitude } = coords
    const location = await Location.reverseGeocodeAsync({ latitude, longitude })
    this.setState({
      job: {
        ...this.state.job,
        location: { ...location[0], latitude, longitude },
        city: location[0].city,
      },
    })
  }

  handleChange = (value, field) => {
    this.setState({
      job: {
        ...this.state.job,
        [field]: value,
      },
    })
  }

  handleSave = () => {
    const uid = auth.currentUser.uid
    const ref = db.child("jobs")
    ref.push({
      ...this.state.job,
      user: uid,
    }, this.clearText)
  }

  clearText = () => {
    ["name", "company", "description"].forEach(field => this.form[field].clearText())

    this.setState({ showSalary: false })
  }

  render() {
    return (
      <ScrollView>
        <FormLabel>Job name</FormLabel>
        <FormInput
          onChangeText={val => this.handleChange(val, "name")}
          ref={ref => this.form.name = ref}
        />

        <FormLabel>Company name</FormLabel>
        <FormInput
          onChangeText={val => this.handleChange(val, "company")}
          ref={ref => this.form.company = ref}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          <FormLabel>Show salary</FormLabel>
          <Switch
            onValueChange={(val) => { this.setState({ showSalary: val }) }}
            value={this.state.showSalary}
            style={{ marginRight: 15, marginTop: 15 }}
          />
        </View>

        {
          this.state.showSalary && (
            <View style={{ backfaceVisibility: "hidden", flexDirection: "row" }}>
              <View style={{ width: "50%" }}>
                <FormLabel>From</FormLabel>
                <FormInput
                  keyboardType="numeric"
                  onChangeText={val => this.handleChange(val, "salary_from")}
                />
              </View>

              <View style={{ width: "50%" }}>
                <FormLabel>To</FormLabel>
                <FormInput
                  keyboardType="numeric"
                  onChangeText={val => this.handleChange(val, "salary_to")}
                />
              </View>
            </View>
          )
        }

        <FormLabel>City</FormLabel>
        <FormInput
          onChangeText={val => this.handleChange(val, "city")}
          value={this.state.job.city}
        />

        <FormLabel>Job description</FormLabel>
        <FormInput
          multiline
          numberOfLines={3}
          onChangeText={val => this.handleChange(val, "description")}
          ref={ref => this.form.description = ref}
        />

        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Button
            title="Save"
            onPress={this.handleSave}
          />
        </View>
        <KeyboardSpacer />
      </ScrollView>
    )
  }
}

export default NewJobScreen