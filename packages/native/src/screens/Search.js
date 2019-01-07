// @flow

import React, { Component } from "react"
import { connect } from "react-redux"
import { Text, StyleSheet, View, AsyncStorage } from "react-native"
import { loadCache as loadRepoCache } from "shared/actions/repository.actions"

class Search extends Component {
  componentDidMount() {
    this.props.loadRepoCache()
  }

  render() {
    return (
      <View>
        <Text>ello</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  repository: state.repository
})

const mapDispatchToProps = dispatch => ({
  loadRepoCache: () => dispatch(loadRepoCache())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
