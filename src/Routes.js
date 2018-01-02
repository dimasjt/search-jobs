import { TabNavigator, StackNavigator } from "react-navigation"

import AuthScreen from "./screens/AuthScreen"
import DashboardScreen from "./screens/DashboardScreen"
import MyJobsScreen from "./screens/MyJobsScreen"
import SavedJobsScreen from "./screens/SavedJobsScreen"

const Routes = TabNavigator({
  Auth: {
    screen: StackNavigator({
      Auth: {
        screen: AuthScreen
      }
    }),
    navigationOptions: {
      tabBarVisible: false,
    },
  },
  Dashboard: {
    screen: TabNavigator({
      Dashboard: {
        screen: DashboardScreen,
      },
      MyJobs: {
        screen: MyJobsScreen,
      },
      SavedJobs: {
        screen: SavedJobsScreen,
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