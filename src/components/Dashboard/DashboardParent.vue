<template>
    <div class="container">
        <div class="col-sm-4 col-md-3 col-lg-2 hidden-xs side-nav-container">
            <nav class="menu" data-toggle="menu">
                <ul class="nav nav-primary">
                    <li><router-link :to="{name: 'dashboard_home'}">Home</router-link></li>
                    <li><router-link :to="{name: 'dashboard_events'}"><i class="fa fa-calendar"></i>Events</router-link></li>
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
        computed: {
            currentRoute () {
                return this.$route.name
            }
        },
        created () {
            if (this.currentRoute === 'dashboard') {
                this.$router.replace({name: 'dashboard_home'})
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
