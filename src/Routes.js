import React from "react"
import { TabNavigator, StackNavigator } from "react-navigation"

import AuthScreen from "./screens/AuthScreen"
import DashboardScreen from "./screens/DashboardScreen"
import MyJobsScreen from "./screens/MyJobsScreen"
import SavedJobsScreen from "./screens/SavedJobsScreen"
import DetailJobScreen from "./screens/DetailJobScreen"
import NewJobScreen from "./screens/NewJobScreen"
import Ionicons from "@expo/vector-icons/Ionicons";

const Routes = TabNavigator({
  Auth: {
    screen: AuthScreen,
    navigationOptions: {
      tabBarVisible: false,
    },
  },
  Dashboard: {
    screen: TabNavigator({
      Dashboard: {
        screen: StackNavigator({
          Dashboard: {
            screen: DashboardScreen,
          },
          DetailJob: {
            screen: DetailJobScreen,
          },
        }),
        navigationOptions: {
          tabBarIcon({ focused }) {
            const name = focused ? "ios-home" : "ios-home-outline"
            return <Ionicons name={name} size={32} />
          },
          tabBarLabel: "Dashboard",
        },
      },
      SavedJobs: {
        screen: StackNavigator({
          SavedJobs: {
            screen: SavedJobsScreen,
            navigationOptions: {
              tabBarIcon({ focused }) {
                const name = focused ? "ios-bookmark" : "ios-bookmark-outline"
                return <Ionicons name={name} size={32} />
              },
              tabBarLabel: "Saved Jobs",
            },
          },
        }),
      },
      MyJobs: {
        screen: StackNavigator({
          MyJobs: {
            screen: MyJobsScreen,
          },
          NewJob: {
            screen: NewJobScreen,
          },
        }),
        navigationOptions: {
          tabBarIcon({ focused }) {
            const name = focused ? "ios-list" : "ios-list-outline"
            return <Ionicons name={name} size={32} />
          },
          tabBarLabel: "My Jobs",
        },
      },
    }),
    navigationOptions: {
      tabBarVisible: false,
    },
  },
}, {
    initialRouteName: "Auth",
  })

export default Routes