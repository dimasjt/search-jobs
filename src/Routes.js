import { TabNavigator, StackNavigator } from "react-navigation"

import AuthScreen from "./screens/AuthScreen"
import DashboardScreen from "./screens/DashboardScreen"

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
    }),
    navigationOptions: {
      tabBarVisible: false,
    },
  },
}, {
    initialRouteName: "Auth",
  })

export default Routes