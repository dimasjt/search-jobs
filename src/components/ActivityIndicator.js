import React from "react"
import { View, ActivityIndicator } from "react-native"
import PropTypes from "prop-types"

const AI = ({ active }) => {
  return active && (
    <View style={{ padding: 10 }}>
      <ActivityIndicator size="large" color="#ccc" />
    </View>
  )
}

AI.propTypes = {
  active: PropTypes.bool,
}

AI.defaultProps = {
  active: false,
}

export default AI