export default function(state = {}, action) {
  switch (action.type) {
    case "USER:SET_USER":
      return {
        ...state,
        ...action.payload
      }
    case "USER:START_LOADING":
      return {
        ...state,
        loading: true
      }
    case "USER:DONE_LOADING":
      return {
        ...state,
        loading: false
      }
    case "USER:FIRE_ERROR":
      return {
        ...state,
        error: true
      }
    case "USER:CLEAR_ERROR":
      return {
        ...state,
        error: false
      }
    default:
      return state
  }
}
