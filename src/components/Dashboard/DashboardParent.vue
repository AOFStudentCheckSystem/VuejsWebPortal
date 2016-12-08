<template>
    <div class="container">
        <div class="col-sm-4 col-md-3 col-lg-2 hidden-xs side-nav-container">
            <nav class="menu" data-toggle="menu">
                <ul class="nav nav-primary">
                    <li :class="{active : isCurrentPage('home')}">
                        <router-link :to="{name: 'dashboard_home'}"><i class="fa fa-home"></i> Home</router-link>
                    </li>
                    <li :class="{active : isCurrentPage('events')}">
                        <router-link :to="{name: 'dashboard_events'}"><i class="fa fa-calendar"></i> Events
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
            <router-view>
            </router-view>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Dashboard',
        computed: {
            currentRoute () {
                return this.$route.name
            }
        },
        created () {
            if (this.currentRoute === 'dashboard') {
                this.$router.replace({name: 'dashboard_home'})
            }
        },
        methods: {
            isCurrentPage (name) {
                return this.$route.name.match(new RegExp('^dashboard_' + name + '.*'))
            }
        }
    }
</script>
<style scoped>
    .side-nav-container {
        background-color: #f6f6f6;
        border-radius: 10px;
        min-height: 85vh;
        padding: 10px;
    }

    i {
        margin-right: 1em;
    }
</style>
