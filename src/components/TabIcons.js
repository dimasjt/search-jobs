import React from "react"
import { Ionicons } from "@expo/vector-icons"

export const dashboard = ({ focused }) => {
  const name = focused ? "ios-search" : "ios-search-outline"
  return <Ionicons name={name} size={32} />
}

export const savedJobs = ({ focused }) => {
  const name = focused ? "ios-heart" : "ios-heart-outline"
  return <Ionicons name={name} size={32} />
}

export const myJobs = ({ focused }) => {
  const name = focused ? "ios-briefcase" : "ios-briefcase-outline"
  return <Ionicons name={name} size={32} />
}

export const settings = ({ focused }) => {
  const name = focused ? "ios-settings" : "ios-settings-outline"
  return <Ionicons name={name} size={32} />
}
