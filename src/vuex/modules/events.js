/*
 * Copyright (c) 2016. Codetector (Yaotian Feng)
 */

import * as types from '../mutation-types'
import api from '../../api/webportalAPI'

const state = {
    events: [],
    active: false
}

const mutations = {
    [types.EVENT_LIST_CHANGE] (state, {newList}) {
        state.events = JSON.parse(JSON.stringify(newList))
    },
    [types.EVENT_ACTIVATE] (state, {event}) {
        if (!state.active && event !== '' && state.active !== event) {
            state.active = event
        }
    },
    [types.EVENT_DEACTIVATE] (state) {
        state.active = false
    }
}

const actions = {
    updateEventList: ({commit, dispatch}) => {
        api.event.updateEventList().then((events) => {
            commit(types.EVENT_LIST_CHANGE, {newList: events})
        }, (fail) => {
            console.error(fail)
        })
    },
    selectEvent: ({commit}, {event}) => {

    }
}

export default {
    state,
    mutations,
    actions
}
