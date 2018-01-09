import { TabNavigator, StackNavigator } from "react-navigation"

import AuthScreen from "./screens/AuthScreen"
import DashboardScreen from "./screens/DashboardScreen"
import MyJobsScreen from "./screens/MyJobsScreen"
import SavedJobsScreen from "./screens/SavedJobsScreen"
import DetailJobScreen from "./screens/DetailJobScreen"
import NewJobScreen from "./screens/NewJobScreen"
import SettingScreen from "./screens/SettingScreen"

import * as TabIcons from "./components/TabIcons"

const DashboardRoutes = TabNavigator({
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
      tabBarLabel: TabIcons.dashboard,
    },
  },
  SavedJobs: {
    screen: StackNavigator({
      SavedJobs: {
        screen: SavedJobsScreen,
        navigationOptions: {
          tabBarLabel: TabIcons.savedJobs,
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
      tabBarLabel: TabIcons.myJobs,
    },
  },
  Setting: {
    screen: StackNavigator({
      SettingHome: {
        screen: SettingScreen,
      },
    }),
    navigationOptions: {
      tabBarLabel: TabIcons.settings,
    },
  },
}, {
    swipeEnabled: false,
    tabBarPosition: "bottom",
    tabBarOptions: {
      tabStyle: {
        justifyContent: "center",
      },
    },
  })

const Routes = TabNavigator({
  Auth: {
    screen: AuthScreen,
    navigationOptions: {
      tabBarVisible: false,
    },
  },
  Dashboard: {
    screen: DashboardRoutes,
    navigationOptions: {
      tabBarVisible: false,
    },
  },
}, {
    initialRouteName: "Auth",
    swipeEnabled: false,
  })

export default Routes