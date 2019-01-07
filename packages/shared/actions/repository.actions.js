import AsyncStorage from "@callstack/async-storage"
import axios from "axios"
import interpretStatusCode from "../helpers/statusCodeInterpreter"
import { GITHUB_REPOSITORY_BASEPI } from "../config"

const BASE_STORAGEKEY = "REPOSITORY"

export const searchRepos = query => async (dispatch, getState) => {
  const storageKey = `${BASE_STORAGEKEY}:${query}`
  dispatch(startLoading())
  let cachedValue = await AsyncStorage.getItem(storageKey)

  if (!cachedValue) {
    let response
    try {
      response = await axios.get(`${GITHUB_REPOSITORY_BASEPI}?q=${query}`)
    } catch (err) {
      dispatch(fireError(err.response.status))
      return
    }
    let data = response.data.items.map(
      ({ id, name, owner, stargazers_count, created_at }) => ({
        id,
        name,
        owner: owner.login,
        stars: stargazers_count,
        created_at
      })
    )
    cachedValue = JSON.stringify({ data })
    AsyncStorage.setItem(storageKey, JSON.stringify({ data }))
  }

  dispatch(setRepositories(JSON.parse(cachedValue).data))
  dispatch(setQuery(query))
  dispatch(clearError())
  dispatch(doneLoading())
  AsyncStorage.setItem(BASE_STORAGEKEY, JSON.stringify(getState().repository))
}

export const loadCache = () => async dispatch => {
  const cachedRepositoryState = await AsyncStorage.getItem(BASE_STORAGEKEY)

  if (cachedRepositoryState) {
    let cachedState = JSON.parse(cachedRepositoryState)
    dispatch(initializeCache(cachedState))
  }
}

export const startLoading = () => ({
  type: "REPOSITORY:START_LOADING"
})

export const doneLoading = () => ({
  type: "REPOSITORY:DONE_LOADING"
})

export const fireError = statusCode => ({
  type: "REPOSITORY:FIRE_ERROR",
  payload: interpretStatusCode(statusCode)
})

export const clearError = () => ({
  type: "REPOSITORY:CLEAR_ERROR"
})

export const setQuery = query => ({
  type: "REPOSITORY:SET_QUERY",
  payload: query
})

export const setRepositories = repositories => ({
  type: "REPOSITORY:SET_REPOSITORIES",
  payload: repositories
})

export const initializeCache = cachedState => ({
  type: "REPOSITORY:INITIALIZE_CACHE",
  payload: cachedState
})
