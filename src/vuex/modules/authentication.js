/*
 * Copyright (c) 2016. Codetector (Yaotian Feng)
 */

import Vue from 'vue'
import * as types from '../mutation-types'
import api from '../../api/webportalAPI'

const state = {
    token: '',
    username: '',
    authenticated: false,
    error: false
}

const mutations = {
    [types.AUTHENTICATION] (state, {token}) {
        state.token = token
        state.authenticated = true
    },
    [types.AUTHENTICATION_FAILURE] (state) {
        state.authenticated = false
    },
    [types.AUTHENTICATION_ERROR] (state, {error}) {
        state.error = error
    },
    [types.AUTHENTICATION_VERIFICATION] (state, {username}) {
        state.username = username
    }
}

const actions = {
    authenticate: ({commit, dispatch}, {username, password, callback}) => {
        api.auth.authenticate(username, password).then((token) => {
            Vue.http.headers.common['Authorization'] = token
            commit(types.AUTHENTICATION, {token: token})
            dispatch('verifyToken')
            callback(true)
        }, (response) => {
            commit(types.AUTHENTICATION_ERROR, {error: true})
            commit(types.AUTHENTICATION_FAILURE)
            callback(false)
        })
    },
    verifyToken: ({commit}) => {
        api.auth.verify().then((success) => {
            commit(types.AUTHENTICATION_VERIFICATION, {username: success})
        }, (response) => {
            commit(types.AUTHENTICATION_FAILURE)
        })
    },
    signOut: ({commit}) => {
        delete Vue.http.headers.common['Authorization']
        commit(types.AUTHENTICATION_FAILURE)
    },
    setError ({commit}, payload) {
        commit(types.AUTHENTICATION_ERROR, payload)
    }
}

export default {
    state,
    mutations,
    actions
}
