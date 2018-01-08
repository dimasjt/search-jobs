import {
  BOOKMARKS_SET,
} from "../action_types"

export const setBookmars = (jobs) => dispatch => {
  dispatch({
    type: BOOKMARKS_SET,
    payload: jobs,
  })
}