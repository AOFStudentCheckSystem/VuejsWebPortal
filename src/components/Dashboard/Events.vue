<template>
    <div class='container'>
        <h1>Events</h1>
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
                <a class='list-group-item' v-for='event in currentEvents' :class="{active : currentSelection===event}"
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
            <button class="btn btn-danger" :disabled="!canDelete" v-if="(current_tab < 4)">Delete</button>
            <button class="btn btn-success" :disabled="!canComplete" v-if="(current_tab !== 1) && (current_tab < 4)">
                Complete
            </button>
        </div>
    </div>
</template>
<script>
    import * as mTypes from '../../vuex/mutation-types'
    let moment = require('moment')
    export default {
        data () {
            return {
                current_tab: 0,
                currentSelection: false
            }
        },
        methods: {
            viewDetail () {
                if (this.currentSelection !== false) {
                    this.$store.commit(mTypes.EVENT_ACTIVATE, {event: this.currentSelection})
                }
            },
            setTab (newTab) {
                this.current_tab = newTab
                this.currentSelection = false
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
                this.currentSelection = e
            },
            deleteEvent () {

            },
            reloadList () {
                this.$store.dispatch('updateEventList')
            }
        },
        created () {
            this.reloadList()
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
            }
        }
    }
</script>
<style scoped>
    a {
        cursor: pointer;
    }
</style>
