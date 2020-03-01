import * as brandTypes from './types'
import {actions} from './actions'

export const store = {
    state: {
        availableBrands: [],
        brandsMeta: [],
        brandSort: {
            field: 'id',
            direction: 'asc'
        },
        brandFilter: {
            group: '',
            select: ''
        },
        isBrandEditing: false,
        isBrandSubmit: false,
        isBrandSaving: false,
    },
    mutations: {
        [brandTypes.BRAND_OBTAIN_ALL](state, brands) {
            state.availableBrands = state.availableBrands.concat(brands)
        },
        [brandTypes.BRAND_CLEAR](state) {
            state.availableBrands = []
        },
        [brandTypes.BRAND_META](state, meta) {
            state.brandsMeta = meta
        },
        [brandTypes.BRAND_SORT](state, sort) {
            state.brandSort = sort
        },
        [brandTypes.BRAND_FILTER](state, filter) {
            state.brandFilter = filter
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
        [brandTypes.BRAND_SET_BRAND_SAVING](state, isBrandSaving) {
            state.isBrandSaving = isBrandSaving
        },
    },
    getters: {
        availableBrands: state => state.availableBrands,
        brandsMeta: state => state.brandsMeta,
        isBrandEditing: state => state.isBrandEditing,
        isBrandSubmit: state => state.isBrandSubmit,
        isBrandSaving: state => state.isBrandSaving,
        brandSort: state => state.brandSort,
        brandFilter: state => state.brandFilter,
    },
    actions
}
