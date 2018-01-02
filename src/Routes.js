import { TabNavigator, StackNavigator } from "react-navigation"

import AuthScreen from "./screens/AuthScreen"
import DashboardScreen from "./screens/DashboardScreen"
import MyJobsScreen from "./screens/MyJobsScreen"
import SavedJobsScreen from "./screens/SavedJobsScreen"
import DetailJobScreen from "./screens/DetailJobScreen"
import NewJobScreen from "./screens/NewJobScreen"

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
        screen: StackNavigator({
          Dashboard: {
            screen: DashboardScreen
          },
          DetailJob: {
            screen: DetailJobScreen,
          },
        }),
      },
      SavedJobs: {
        screen: StackNavigator({
          SavedJobs: {
            screen: SavedJobsScreen,
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