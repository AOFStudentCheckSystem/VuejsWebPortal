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

    sendEmail (event, recipients) {
        const formData = new FormData()
        formData.append('recipients', JSON.stringify({recipients: recipients}))
        return new Promise((resolve, reject) => {
            Vue.http.post('event/' + event.eventId + '/send', formData).then((response) => {
                resolve(response)
            }, (response) => {
                reject(response)
            })
        })
    }
}
