/*
 * Copyright (c) 2016. Codetector (Yaotian Feng)
 */

import {AuthAPI} from './AuthAPI'
import {EventAPI} from './EventAPI'
export default {
    auth: new AuthAPI(),
    event: new EventAPI()
}
