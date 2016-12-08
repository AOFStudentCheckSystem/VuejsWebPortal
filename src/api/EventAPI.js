/*
 * Copyright (c) 2016. Codetector (Yaotian Feng)
 */

import Vue from 'vue'

export class EventAPI {
    updateEventList () {
        return new Promise((resolve, reject) => {
            Vue.http.get('event/list').then((response) => {
                response.json().then((json) => {
                    resolve(json.events)
                }, (failed) => {
                    reject(failed)
                })
            }, (response) => {
                reject(response)
            })
        })
    }

    eventDetail (event) {
        return new Promise((resolve, reject) => {
            Vue.http.get('event/' + event.eventId + '/detail').then((response) => {
                response.json().then((json) => {
                    resolve(json.events)
                }, (failed) => {
                    reject(failed)
                })
            }, (response) => {
                reject(response)
            })
        })
    }
}
