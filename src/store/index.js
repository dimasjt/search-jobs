import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

import rootReducers from "../reducers"

let store = compose(
  applyMiddleware(
    thunk,
  ),
)(createStore)(rootReducers)

export default store