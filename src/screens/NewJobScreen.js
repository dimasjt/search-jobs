import React from "react"
import { View, Text, ScrollView } from "react-native"
import { Switch } from "react-native"
import { FormLabel, FormInput, Button } from "react-native-elements"

class NewJobScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Post a New Job",
  }

  state = {
    showSalary: false,
    job: {}
  }

  handleChange = (value, field) => {
    this.setState({
      job: {
        ...this.state.job,
        [field]: value,
      }
    })
  }

  render() {
    return (
      <ScrollView>
        <FormLabel>Job name</FormLabel>
        <FormInput onChangeText={val => this.handleChange(val, "name")} />

        <FormLabel>Company name</FormLabel>
        <FormInput onChangeText={val => this.handleChange(val, "company")} />

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

        <FormLabel>Location</FormLabel>
        <FormInput onChangeText={val => this.handleChange(val, "location")} />

        <FormLabel>Job description</FormLabel>
        <FormInput
          multiline
          numberOfLines={3}
          onChangeText={val => this.handleChange(val, "description")}
        />

        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Button
            title="Save"
            onPress={() => { }}
          />
        </View>
      </ScrollView>
    )
  }
}

export default NewJobScreen