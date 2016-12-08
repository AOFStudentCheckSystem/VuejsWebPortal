/*
 * Copyright (c) 2016. Codetector (Yaotian Feng)
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import date from 'vue-date-filter'
import App from './App'
import '../static/zui/css/zui.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import routes from './routes'
import storeParams from './vuex/store'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(date)

const router = new VueRouter({
    routes
})

export const store = new Vuex.Store(storeParams)

Vue.http.options.root = 'http://hn2.guardiantech.com.cn:10492/web'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: {App},
    render: function (createElement) {
        return createElement('App')
    },
    router,
    store
})
