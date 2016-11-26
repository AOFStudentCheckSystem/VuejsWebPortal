/*
 * Copyright (c) 2016. Codetector (Yaotian Feng)
 */

/**
 * Created by dummy on 11/14/16.
 */
import * as types from './mutation-types'
import Vue from 'vue'

export const localStoragePlugin = store => {
    const deserialize = JSON.parse
    const serialize = JSON.stringify

    const savedToken = localStorage.getItem('authentication')
    if (savedToken !== null) {
        const payload = deserialize(savedToken)
        Vue.http.headers.common['Authorization'] = payload.token
        store.commit(types.AUTHENTICATION, payload)
    }

    window.setTimeout(() => {
        if (store.state.authentication.authenticated) {
            store.dispatch('verifyToken')
        }
    }, 0)

    // persist sign-in
    store.subscribe(({type, payload}, state) => {
        window.setTimeout(() => {
            switch (type) {
                case types.AUTHENTICATION:
                    localStorage.setItem('authentication', serialize(payload))
                    break
                case types.AUTHENTICATION_FAILURE:
                    localStorage.removeItem('authentication')
                    break
            }
        }, 1)
    })
}
