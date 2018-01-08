import React from "react"
import { connect } from "react-redux"
import { Share, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import { db, auth } from "../../firebase"

const navigationOptions = ({ navigation }) => {
  const HeaderRight = connect(state => state)(({ bookmarks }) => {
    const liked = bookmarks.all.find(b => navigation.state.params.job.key === b.key)
    const shareAction = () => {
      Share.share({ title: "Job Recommended", url: "http://dimasjt.com", message: "You should apply this job" })
    }
    const saveJob = () => {
      const ref = db.child(`bookmarks/${auth.currentUser.uid}`)

      if (liked) {
        ref.child(navigation.state.params.job.key).remove()
      } else {
        ref.update({
          [navigation.state.params.job.key]: 1,
        })
      }
    }
    const heartIcon = liked ? "ios-heart" : "ios-heart-outline"

    return (
      <View style={{ flexDirection: "row" }}>
        <Ionicons
          name={heartIcon}
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
    )
  })

  return {
    headerRight: <HeaderRight />,
  }
}

export default navigationOptions