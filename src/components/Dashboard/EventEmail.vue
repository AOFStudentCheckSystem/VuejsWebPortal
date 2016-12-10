<template>
    <div id="eventBrowseContainer">
        <nav class="navbar navbar-default" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a v-on:click="backToList()" class="navbar-brand"><i class="fa fa-chevron-left"></i> Back</a>
                </div>
            </div>
        </nav>
        <div class="row">
            <div class="col-xs-12">
                <div class="form-group" :class="{ 'has-error' : emailHasError , 'has-success' : emailCorrect}">
                    <div class="typeahead">
                        <input v-on:keyup.enter="addEmailToRecent($event)" v-model="emailTextField" type="email"
                               class="form-control" placeholder="example@example.com">
                        <div class='typeahead-content list-group'>
                            <a class='list-group-item'>
                                <h4 class='list-group-item-heading' style="color: #000000;">Test</h4>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12" style="max-height: 60vh; padding-right: 0; overflow-y: scroll;">
                <div class='list-group'>
                    <a class='list-group-item' v-for='email in recentEmails' :class="{active : isSelected(email)}"
                       style="cursor: default;">
                        <div class="pull-right">
                            <button class="btn btn-danger btn-xs" v-on:click="removeEmailFromRecent(email)">Remove
                            </button>
                        </div>
                        <a v-on:click="triggerSelection(email)" style="cursor: pointer;"><h3
                            class='list-group-item-heading'
                            style="color: #000000;">{{email}}</h3></a>
                    </a>
                </div>
            </div>
            <div class="col-xs-12" style="margin-top: 2em">
                <button class="btn btn-block" :class="[hasRecipient ? 'btn-success' : 'btn-default']"
                        :disabled="!hasRecipient" v-on:click="sendEmail()">Send to {{emailList.length}} recipient(s)
                </button>
            </div>
        </div>
        <Loader v-if="loading"></Loader>
    </div>
</template>
<script>
    import * as mTypes from '../../vuex/mutation-types'
    import api from '../../api/webportalAPI'
    import Loader from '../Loader'
    const email = /\S+@\S+\.\S+/
    export default {
        name: 'EventBrowse',
        components: {
            Loader
        },
        data () {
            return {
                emailTextField: '',
                emailList: [],
                loading: false
            }
        },
        computed: {
            hasRecipient () {
                return this.emailList.length > 0
            },
            currentSelection () {
                return this.$store.state.events.active
            },
            recentEmails () {
                return this.$store.state.recent.recent
            },
            isEmailFieldValid () {
                return email.test(this.emailTextField)
            },
            emailCorrect () {
                return (this.emailTextField !== '') && (this.isEmailFieldValid)
            },
            emailHasError () {
                return (this.emailTextField !== '') && (!this.isEmailFieldValid)
            }
        },
        created () {
            if (this.currentSelection === false) {
                this.backToList()
            }
        },
        methods: {
            backToList () {
                this.$router.go(-1)
            },
            addEmailToRecent () {
                this.$store.commit(mTypes.RECENT_LIST_ADD, {email: this.emailTextField})
                this.triggerSelection(this.emailTextField)
                this.emailTextField = ''
            },
            removeEmailFromRecent (email) {
                this.removeEmail(email)
                this.$store.commit(mTypes.RECENT_LIST_REMOVE, {email: email})
            },
            isSelected (email) {
                let selected = false
                for (let i = 0; i < this.emailList.length; i++) {
                    if (this.emailList[i].toLowerCase() === email.toLowerCase()) {
                        selected = true
                        break
                    }
                }
                return selected
            },
            removeEmail (email) {
                for (let i = 0; i < this.emailList.length; i++) {
                    if (this.emailList[i].toLowerCase() === email.toLowerCase()) {
                        this.emailList.splice(i, 1)
                        break
                    }
                }
            },
            triggerSelection (email) {
                if (this.isSelected(email)) {
                    this.removeEmail(email)
                } else {
                    this.emailList.push(email.toLowerCase())
                }
            },
            sendEmail () {
                if (this.hasRecipient) {
                    this.loading = true
                    api.event.sendEmail(this.currentSelection, this.emailList).then((success) => {
                        let message = new $.zui.Messager('Email Sent', {
                            type: 'success',
                            time: 3000
                        })
                        message.show()
                        this.$router.go(-1)
                    }, (fail) => {
                        this.loading = false
                        let message = new $.zui.Messager('Failed to Send Email', {
                            type: 'danger',
                            time: 3000
                        })
                        message.show()
                    })
                }
            }
        }
    }
</script>
<style scoped>
    .typeahead {
        position: relative;
        display: block;
    }

    .typeahead-content {
        display: none;
        position: absolute;
        background-color: white;
        left: 0;
        right: 0;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
        z-index: 100;
    }
    a {
        text-decoration: none;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none;
        /* Non-prefixed version, currently
                                         not supported by any browser */
    }
</style>
