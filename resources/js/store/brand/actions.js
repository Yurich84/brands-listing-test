import * as fromBrandTypes from './types'
import * as fromNotificationTypes from '../notification/types'
import {BrandApi} from '../../services/BrandApi'
import {RAISE_ERROR} from "../notification/types";

const brandApi = new BrandApi()

export const actions = {
    async [fromBrandTypes.BRAND_STORE]({commit}, {brand, successMessage}) {
        commit(fromBrandTypes.REQUEST_TO_STORE_BRAND_API)
        try {
            const response = await brandApi.addBrand(brand)
            commit(fromBrandTypes.BRAND_ADD_TO_AVAILABLE, response.data.data)
            commit(fromNotificationTypes.NOTIFY, {
                message: successMessage,
                type: fromNotificationTypes.SUCCESS_MESSAGE
            })

            return response.data.data

        } catch (e) {
            commit(fromNotificationTypes.RAISE_ERROR, e.message)
        }
    },
    async [fromBrandTypes.BRAND_GET]({commit}, brandId) {
        try {
            let response = await brandApi.fetchBrandById(brandId);

            if (!response.data) {
                throw Error('Response data is invalid');
            }

            commit(fromBrandTypes.BRAND_SET, response.data.data);
        } catch (e) {
            commit(fromNotificationTypes.RAISE_ERROR, e.message)
        }
    },
    async [fromBrandTypes.BRAND_DELETE]({ commit }, brand) {
        try {
            await brandApi.delete(brand.id)
        } catch (e) {
            commit(RAISE_ERROR, `${e.message}`)
        }
    },
    async [fromBrandTypes.BRAND_FETCH_AVAILABLE]({commit}, data = null) {
        try {
            const response = await brandApi.fetchAvailable(data)
            commit(fromBrandTypes.BRAND_OBTAIN_ALL, response.data.data)
            commit(fromBrandTypes.BRAND_META, response.data.meta)
        } catch (e) {
            commit(fromNotificationTypes.RAISE_ERROR, e.message)
        }
    },
    async [fromBrandTypes.BRAND_UPDATE]({commit}, {brand, brandId}) {
        try {
            commit(fromBrandTypes.BRAND_SET_BRAND_SAVING, true)
            const response = await brandApi.update(brand, brandId)
            commit(fromBrandTypes.BRAND_UPDATE_LOCAL, response.data.data)
        } catch (e) {
            commit(fromNotificationTypes.RAISE_ERROR, e.message)
        } finally {
            commit(fromBrandTypes.BRAND_SET_BRAND_SAVING, false)
        }

    },
    async [fromBrandTypes.BRAND_AUTOCOMPLETE]({commit}, search) {
        try {
            const response = await brandApi.getBrandsAutocomplete(search)
            commit(fromBrandTypes.BRANDS_SET_FOUND, response.data.data)
        } catch (e) {
            commit(fromNotificationTypes.RAISE_ERROR, e.message)
        }
    },
}
