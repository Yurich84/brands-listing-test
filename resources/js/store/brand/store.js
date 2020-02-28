import * as brandTypes from './types'
import {actions} from './actions'

export const store = {
    state: {
        brand: {
            name: ''
        },
        isStoreRequesting: false,
        availableBrands: [],
        foundBrands: [],
        brandsMeta: [],
        isBrandEditing: false,
        isBrandSubmit: false,
        activeBrandTab: 'form',
        isBrandSaving: false,
    },
    mutations: {
        [brandTypes.BRAND_SET](state, brand) {
            state.brand = brand;
        },
        [brandTypes.BRANDS_SET_FOUND](state, brands) {
            state.foundBrands = brands;
        },
        [brandTypes.BRAND_OBTAIN_ALL](state, brands) {
            state.availableBrands = state.availableBrands.concat(brands)
        },
        [brandTypes.BRAND_CLEAR](state) {
            state.availableBrands = []
        },
        [brandTypes.BRAND_META](state, meta) {
            state.brandsMeta = meta
        },
        [brandTypes.REQUEST_TO_STORE_BRAND_API](state) {
            state.isStoreRequesting = true
        },
        [brandTypes.RESPONSE_FROM_STORE_BRAND_API](state) {
            state.isStoreRequesting = false
        },
        [brandTypes.BRAND_ADD_TO_AVAILABLE](state, brand) {
            if (state.availableBrands) {
                state.availableBrands.unshift(brand)
            } else {
                state.availableBrands = [brand]
            }
        },
        [brandTypes.BRAND_UPDATE_LOCAL](state, brand) {
            if (state.availableBrands) {
                let findIndex = -1
                state.availableBrands.find((c, index) => {
                    const isThisBrand = c.id === brand.id
                    if (isThisBrand) {
                        findIndex = index
                    }
                    return isThisBrand
                })

                if (findIndex !== -1) {
                    state.availableBrands.splice(findIndex, 1, brand)
                }
            }
        },
        [brandTypes.BRAND_SET_EDITING](state, isBrandEditing) {
            state.isBrandEditing = isBrandEditing
        },
        [brandTypes.BRAND_SET_SUBMIT](state, isBrandSubmit) {
            state.isBrandSubmit = isBrandSubmit
        },
        [brandTypes.BRAND_SET_ACTIVE_TAB](state, activeBrandTab) {
            state.activeBrandTab = activeBrandTab
        },
        [brandTypes.BRAND_SET_BRAND_SAVING](state, isBrandSaving) {
            state.isBrandSaving = isBrandSaving
        },
    },
    getters: {
        availableBrands: state => state.availableBrands,
        brandsMeta: state => state.brandsMeta,
        isBrandEditing: state => state.isBrandEditing,
        isBrandSubmit: state => state.isBrandSubmit,
        activeBrandTab: state => state.activeBrandTab,
        isBrandSaving: state => state.isBrandSaving,
        brand: state => state.brand,
        foundBrands: state => state.foundBrands
    },
    actions
}
