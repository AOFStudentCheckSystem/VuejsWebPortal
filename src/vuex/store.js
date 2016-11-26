/*
 * Copyright (c) 2016. Codetector (Yaotian Feng)
 */

import modules from './modules'
import {localStoragePlugin} from './plugins'

export default {
    modules,
    plugins: [localStoragePlugin],
    strict: process.env.NODE_ENV !== 'production'
}
