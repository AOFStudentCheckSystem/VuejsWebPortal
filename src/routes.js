/*
 * Copyright (c) 2016. Codetector (Yaotian Feng)
 */

export default [
    {
        path: '/',
        name: 'index',
        component: {template: '<h1>Loading... Please Wait</h1>'}
    },
    {
        path: '/signin',
        name: 'sign-in',
        component: require('components/SignIn')
    }
]
