import { combineReducers } from "redux"

import repository from "./repository.reducer"
import user from "./user.reducer"

export default combineReducers({ repository, user })
