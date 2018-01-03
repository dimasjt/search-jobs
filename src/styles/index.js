import { StyleSheet } from "react-native"

const actionStyle = {
  flex: 1,
  justifyContent: "center",
  padding: 25,
  backgroundColor: "#fefefe",
  borderBottomWidth: 1,
  borderBottomColor: "#ccc",
}

export default StyleSheet.create({
  rightAction: {
    ...actionStyle,
    borderLeftWidth: 1,
    borderLeftColor: "#ccc",
  },
  leftAction: {
    ...actionStyle,
    alignItems: "flex-end",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
})