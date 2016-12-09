<template>
    <div class='container'>
        <h1>Events
            <button class="btn btn-default" :disabled="refreshing" v-on:click="reloadList()"><i class="fa fa-refresh"
                                                                                                :class="{'fa-spin':refreshing}"></i>
            </button>
        </h1>
        <div class="row">
            <div class="progress" style="height: 5px;">
                <div class="progress-bar progress-bar-default" :aria-valuenow="timeoutPercent" aria-valuemin="0"
                     aria-valuemax="100" :style="{width : timeoutPercent + '%'}">
                </div>
            </div>
        </div>
        <div class='row'>
            <ul class='nav nav-tabs'>
                <li :class='{active : isTab(0)}'><a v-on:click='setTab(0)'>All Events <span
                    class='label label-badge label-default'>{{allEvents.length}}</span></a></li>
                <li :class='{active : isTab(1)}'><a v-on:click='setTab(1)'>Completed <span
                    class='label label-badge label-success'>{{completedEvents.length}}</span></a></li>
                <li :class='{active : isTab(2)}'><a v-on:click='setTab(2)'>Boarding <span
                    class='label label-badge label-primary'>{{boardingEvents.length}}</span></a></li>
                <li :class='{active : isTab(3)}'><a v-on:click='setTab(3)'>Scheduled <span
                    class='label label-badge label-warning'>{{scheduledEvents.length}}</span></a></li>
                <li :class='{active : isTab(4)}'><a v-on:click='setTab(4)'>Offline <span
                    class='label label-badge label-warning'>{{offlineEvents.length}}</span></a></li>
            </ul>
        </div>
        <div class='row' style='margin-top: 0.5em; max-height: 60vh; overflow-y: scroll;'>
            <div class='list-group'>
                <a class='list-group-item' v-for='event in currentEvents' :class="{active : isSelected(event)}"
                   v-on:click="selectEvent(event)">
                    <h4 class='list-group-item-heading'>{{event.eventName}}</h4>
                    <div class='pull-right'><p>{{formatEventStatus(event.eventStatus)}}</p></div>
                    <p class='list-group-item-text text-muted'>{{formatDate(event.eventTime)}}</p>
                </a>
            </div>
        </div>
        <div class="row" style="margin-top: 0.5em;">
            <div class="pull-right">
                <button class="btn btn-default" :disabled="!hasSelection" v-on:click="viewDetail()">View Detail</button>
            </div>
            <button class="btn btn-danger" :disabled="!canDelete" v-if="(current_tab < 4)" v-on:click="deleteEvent()">
                Delete
            </button>
            <button class="btn btn-success" :disabled="!canComplete" v-if="(current_tab !== 1) && (current_tab < 4)">
                Complete
            </button>
        </div>
    </div>
</template>
<script>
    import * as mTypes from '../../vuex/mutation-types'
    let moment = require('moment')
    let timeout = false
    let nowTimeout = false
    const updateInterval = 10000
    export default {
        data () {
            return {
                current_tab: 0,
                refreshing: false,
                lastUpdate: 0,
                now: 0
            }
        },
        methods: {
            viewDetail () {
                this.$router.push({name: 'dashboard_events_view'})
            },
            setTab (newTab) {
                this.current_tab = newTab
                this.deselectEvent()
            },
            isTab (tab) {
                return this.current_tab === tab
            },
            formatDate (date) {
                return moment(date * 1000).calendar() // Today at 11:53 PM
            },
            formatEventStatus (statusCode) {
                switch (statusCode) {
                    case -1:
                        return 'Offline'
                    case 0:
                        return 'Planned'
                    case 1:
                        return 'Boarding'
                    case 2:
                        return 'Complete'
                }
            },
            selectEvent (e) {
                this.$store.commit(mTypes.EVENT_ACTIVATE, {event: e})
            },
            deselectEvent () {
                this.$store.commit(mTypes.EVENT_DEACTIVATE)
            },
            isSelected (e) {
                return this.currentSelection !== false && this.currentSelection.eventId === e.eventId
            },
            deleteEvent () {
                if (confirm('Sure wanna del?')) {

                }
            },
            reloadList () {
                if (!this.refreshing) {
                    this.refreshing = true
                    this.$store.dispatch('updateEventList')
                }
            }
        },
        created () {
            let self = this
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === mTypes.EVENT_LIST_CHANGE) {
                    self.refreshing = false
                }
            })
            this.now = new Date().getTime()
            this.lastUpdate = this.now
            this.reloadList()

            nowTimeout = window.setInterval(() => {
                this.now = new Date().getTime()
            }, 10)
            timeout = window.setInterval(() => {
                this.reloadList()
                this.lastUpdate = this.now
            }, updateInterval)
        },
        beforeDestroy () {
            window.clearInterval(timeout)
            window.clearInterval(nowTimeout)
        },
        computed: {
            currentEvents () {
                switch (this.current_tab) {
                    case 0:
                        return this.allEvents
                    case 1:
                        return this.completedEvents
                    case 2:
                        return this.boardingEvents
                    case 3:
                        return this.scheduledEvents
                    case 4:
                        return this.offlineEvents
                }
            },
            allEvents () {
                return this.$store.state.events.events
            },
            completedEvents () {
                return this.allEvents.filter((item) => {
                    return item.eventStatus === 2
                })
            },
            boardingEvents () {
                return this.allEvents.filter((item) => {
                    return item.eventStatus === 1
                })
            },
            scheduledEvents () {
                return this.allEvents.filter((item) => {
                    return item.eventStatus === 0
                })
            },
            offlineEvents () {
                return this.allEvents.filter((item) => {
                    return item.eventStatus === -1
                })
            },
            hasSelection () {
                return this.currentSelection !== false
            },
            canComplete () {
                return this.hasSelection && this.currentSelection.eventStatus < 2 && this.currentSelection.eventStatus > 0
            },
            canDelete () {
                return this.hasSelection && this.currentSelection.eventStatus >= 0
            },
            timeoutPercent () {
                let value = 1 - ((this.now - this.lastUpdate) / (updateInterval - 1000))
                return Math.ceil(value * 100)
            },
            currentSelection () {
                return this.$store.state.events.active
            }
        }
    }
</script>
<style scoped>
    a {
        cursor: pointer;
    }
</style>
