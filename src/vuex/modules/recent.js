/*
 * Copyright (c) 2016. Codetector (Yaotian Feng)
 */

import Vue from 'vue'
import * as types from '../mutation-types'
import api from '../../api/webportalAPI'

const state = {
    recent: []
}

const mutations = {
    [types.RECENT_LIST_ADD] (state, {email}) {
        let hasItem = false
        state.recent.forEach((eml) => {
            if (eml.toLowerCase() === email.toLowerCase()) {
                hasItem = true
            }
        })
        if (!hasItem) {
            state.recent.push(email.toLowerCase())
        }
    },
    [types.RECENT_LIST_REMOVE] (state, {email}) {
        state.recent.$remove(email.toLowerCase())
    },
    [types.RECENT_LIST_CHANGE] (state, {items}) {
        state.recent = items
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
