import AsyncStorage from "@callstack/async-storage"
import axios from "axios"
import { BASE_API } from "../config"

const LOGIN_ENDPOINT = `${BASE_API}/login`
const BASE_STORAGE_KEY = "USER"

export const fetchUser = code => async dispatch => {
  try {
    dispatch(startLoading())
    const response = await axios.post(`${LOGIN_ENDPOINT}/codetouser`, { code })
    const user = response.data
    if (user) {
      let filteredData = filterUserProperties(user)
      dispatch(setUser(filteredData))
      AsyncStorage.setItem(
        `${BASE_STORAGE_KEY}:TOKEN`,
        JSON.stringify({ access_token: user.access_token })
      )
    }
  } catch (err) {
    dispatch(fireError())
  }
  dispatch(doneLoading())
}

export const loadCache = () => async dispatch => {
  try {
    dispatch(startLoading())
    const cache = await AsyncStorage.getItem(`${BASE_STORAGE_KEY}:TOKEN`)
    const data = JSON.parse(cache)

    if (data) {
      let response = await axios.post(`${LOGIN_ENDPOINT}/tokentouser`, {
        token: data.access_token
      })
      const user = response.data
      if (user) {
        const filteredData = filterUserProperties(user)
        dispatch(setUser(filteredData))
      }
    }
  } catch (err) {
    dispatch(fireError())
  }
  dispatch(doneLoading())
}

export const setUser = user => ({
  type: "USER:SET_USER",
  payload: user
})

export const startLoading = () => ({
  type: "USER:START_LOADING"
})

export const doneLoading = () => ({
  type: "USER:DONE_LOADING"
})

export const fireError = err => ({
  type: "USER:FIRE_ERROR",
  payload: err ? err : true
})

export const clearError = () => ({
  type: "USER:CLEAR_ERROR"
})

function filterUserProperties({ avatar_url, html_url, login, access_token }) {
  return {
    photo_url: avatar_url,
    url: html_url,
    name: login,
    access_token
  }
}
