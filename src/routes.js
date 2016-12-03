/*
 * Copyright (c) 2016. Codetector (Yaotian Feng)
 */

export default [
    {
        path: '/',
        name: 'index',
        component: require('components/Loading')
    },
    {
        path: '/signin',
        name: 'sign-in',
        component: require('components/SignIn')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: require('components/Dashboard/DashboardParent'),
        children: [
            {
                path: 'home',
                name: 'dashboard_home',
                component: require('components/Dashboard/Home')
            },
            {
                path: 'events',
                name: 'dashboard_events',
                component: require('components/Dashboard/Home')
            }
        ]
    }
]
