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
        if (state.active !== event) {
            state.active = event
        }
    },
    [types.EVENT_DEACTIVATE] (state) {
        state.active = false
    }
}

const actions = {
    updateEventList: ({commit, dispatch, state}) => {
        api.event.updateEventList().then((events) => {
            commit(types.EVENT_LIST_CHANGE, {newList: events})
            if (state.active !== false) {
                let hasItem = false
                state.events.forEach((item) => {
                    if (item.eventId === state.active.eventId) {
                        hasItem = true
                    }
                })
                if (!hasItem) {
                    dispatch(types.EVENT_DEACTIVATE)
                }
            }
        }, (fail) => {
            console.error(fail)
            commit(types.AUTHENTICATION_FAILURE)
        })
    }
}

export default {
    state,
    mutations,
    actions
}
