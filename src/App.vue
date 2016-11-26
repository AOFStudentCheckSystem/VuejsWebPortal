<template>
    <div>
        <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".portal-navbar">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="/">Avon Old Farms Portal</a>
                </div>
                <div class="collapse navbar-collapse portal-navbar">
                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown">{{usernameText}} <b class="caret"
                                                                                                  v-if="authenticated"></b></a>
                            <ul class="dropdown-menu" role="menu" v-if="authenticated">
                                <li class="divider"></li>
                                <li><a href="" v-on:click="signOut()">Sign Out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div><!-- END .navbar-collapse -->
            </div>
        </nav>
        <transition :name="transitionName" mode="out-in">
            <router-view class="child-transition main-view"></router-view>
        </transition>
    </div>
</template>

<script>
    import * as types from './vuex/mutation-types'
    export default {
        data () {
            return {
                transitionName: 'slide-left',
                backEnabled: false
            }
        },
        methods: {
            signOut () {
                if (this.$store.state.authentication.authenticated) {
                    this.$store.dispatch('signOut')
                    this.$router.replace('/signin')
                }
            },
            back () {
                this.$router.go(-1)
            }
        },
        computed: {
            usernameText () {
                return this.$store.state.authentication.authenticated ? this.$store.state.authentication.username : 'Please Login'
            },
            authenticated () {
                return this.$store.state.authentication.authenticated
            }
        },
        created () {
            if (!this.authenticated) {
                this.$router.replace('/signin')
            }
            let self = this
            this.$router.beforeEach((to, from, next) => {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                if (from.path === '/signin') {
                    self.transitionName = 'slide-right'
                } else {
                    self.transitionName = toDepth < fromDepth ? 'slide-right' : to.path.length < 2 ? 'slide-right' : 'slide-left'
                }
                self.backEnabled = !(to.path.length < 2 || to.path === '/signin')
                next()
            })
            this.$store.subscribe((mutation, state) => {
                console.log(mutation.type)
                switch (mutation.type) {
                    case types.AUTHENTICATION_FAILURE:
                        self.$router.replace('/signin')
                        break
                }
            })
        }
    }
</script>


<style>
    * {
        /*margin: 0;*/
        padding: 0;
    }

    *:focus {
        outline: none !important;
    }

    *::-webkit-scrollbar {
        display: none;
    }

    body {
        background-color: rgba(226, 226, 226, 0.85);
        font-family: Helvetica, sans-serif;
    }

    .navbar-center {
        display: inline-block;
        float: none;
        vertical-align: top;
        text-align: center;
    }

    .navbar {
        -webkit-app-region: drag;
    }

    .navbar-header {
        -webkit-app-region: no-drag;
    }

    .navbar-nav {
        -webkit-app-region: no-drag;
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(100px, 0);
        transform: translate(100px, 0);
        transition: opacity .2s ease;
    }

    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-100px, 0);
        transform: translate(-100px, 0);
        transition: opacity .2s ease;
    }

    .child-transition {
        transition: all .4s ease; /* cubic-bezier(.55, 0, .1, 1) */
    }

    .main-view {
        padding-top: 70px;
    }
</style>
