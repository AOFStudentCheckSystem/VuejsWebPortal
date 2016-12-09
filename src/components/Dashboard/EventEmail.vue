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
                    <input v-on:keyup.enter="addEmail($event)" v-model="emailTextField" type="email"
                           class="form-control" placeholder="example@example.com">
                </div>
            </div>
            <div class="col-xs-12" style="margin-top: 0.5em; max-height: 60vh; overflow-y: scroll;">
                <div class='list-group'>
                    <a class='list-group-item' v-for='email in recentEmails' :class="{active : isSelected(email)}">
                        <div class="pull-right">
                            <button class="btn btn-danger btn-xs">Remove</button>
                        </div>
                        <a v-on:click="triggerSelection(email)"><h4 class='list-group-item-heading'
                                                                    style="color: #000000;">{{email}}</h4></a>
                    </a>
                </div>
            </div>
            <div class="col-xs-12">
                <h4>{{emailList}}</h4>
            </div>
        </div>
    </div>
</template>
<script>
    import * as mTypes from '../../vuex/mutation-types'
    const email = /\S+@\S+\.\S+/
    export default {
        name: 'EventBrowse',
        data () {
            return {
                emailTextField: '',
                emailList: []
            }
        },
        computed: {
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
                console.log(this.currentSelection)
                this.backToList()
            }
        },
        methods: {
            backToList () {
                this.$router.go(-1)
            },
            addEmail () {
                this.$store.commit(mTypes.RECENT_LIST_ADD, {email: this.emailTextField})
                this.emailTextField = ''
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
            }
        }
    }
</script>
<style scoped>
    a {
        cursor: pointer;
    }
</style>
