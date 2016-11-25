/*
 * Copyright (c) 2016. Codetector (Yaotian Feng)
 */

import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import Vuex from "vuex";
import App from "./App";
import "../node_modules/zui/dist/css/zui.css";
import "../node_modules/font-awesome/css/font-awesome.css";
import routes from "./routes";
import storeParams from "./vuex/store";

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueResource)

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
