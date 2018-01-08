import {
  BOOKMARKS_SET,
} from "../action_types"

const initialState = {
  all: [],
}

function bookmarks(state = initialState, action) {
  switch (action.type) {
    case BOOKMARKS_SET:
      return {
        all: action.payload,
      }
    default:
      return state
  }
}

export default bookmarks