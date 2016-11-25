<template>
    <div>
        <nav class="navbar navbar-default navbar-fixed-top">
            <a class="navbar-center navbar-brand">AOF Portal</a>
            <div class="container-fluid">
                <div class="navbar-header">
                    <div class="navbar-brand" v-show="backEnabled" v-on:click="back()">
                        <i class="fa fa-arrow-left" aria-hidden="true"></i>
                        Back
                    </div>
                </div>
                <ul class="nav navbar-nav navbar-right collapse navbar-collapse">
                    <li><a href="" class="navbar-brand" v-on:click="signOut()">{{signInStatus}}</a></li>
                </ul>
            </div>
        </nav>
        <transition :name="transitionName" mode="out-in">
            <router-view class="child-transition main-view"></router-view>
        </transition>
    </div>
</template>

<script>
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
            signInStatus () {
                return this.$store.state.authentication.authenticated ? 'Sign Out' : 'No User'
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
                self.transitionName = toDepth < fromDepth ? 'slide-right' : to.path.length < 2 ? 'slide-right' : 'slide-left'
                self.backEnabled = !(to.path.length < 2 || to.path === '/signin')
                next()
            })
        }
    }
</script>


<style>
    @import url(https://fonts.googleapis.com/css?family=Lato:300);

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

    html,
    body {
        height: 100%;
    }

    body {
        overflow: hidden;
        background: radial-gradient(
            ellipse at center,
            rgba(255, 255, 255, 1) 20%,
            rgba(226, 226, 226, 0.85) 100%
        ), center;
        display: flex;
        font-family: Lato, Helvetica, sans-serif;
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
        padding-top: 100px;
    }
</style>
