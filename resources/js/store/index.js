import * as brandModule from './brand/store'
import * as notificationModule from './notification/store'

export const store = {
    modules: {
        brand: brandModule.store,
        notification: notificationModule.store,
    },
    strict: process.env.NODE_ENV !== 'production',
}
