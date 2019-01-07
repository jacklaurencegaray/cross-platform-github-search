export default function(state = {}, action) {
  switch (action.type) {
    case "REPOSITORY:INITIALIZE_CACHE":
      return {
        ...state,
        ...action.payload
      }
    case "REPOSITORY:SET_REPOSITORIES":
      return {
        ...state,
        results: action.payload
      }
    case "REPOSITORY:START_LOADING":
      return {
        ...state,
        loading: true
      }
    case "REPOSITORY:SET_QUERY":
      return {
        ...state,
        query: action.payload
      }
    case "REPOSITORY:DONE_LOADING":
      return {
        ...state,
        loading: false
      }
    case "REPOSITORY:FIRE_ERROR":
      return {
        ...state,
        error: action.payload || true
      }
    case "REPOSITORY:CLEAR_ERROR":
      return {
        ...state,
        error: false
      }
    default:
      return state
  }
}
