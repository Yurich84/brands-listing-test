import axios from 'axios'


export class BrandApi {

    constructor() {
        this.API_ENDPOINT = '/api/brands'
    }

    async delete(id) {
        return axios.delete(`${this.API_ENDPOINT}/${id}`)
    }

    async fetchAvailable(data) {
        return axios.get(this.API_ENDPOINT, {
            params: data
        })
    }

    async fetchBrandById(id) {
        return axios.get(`${this.API_ENDPOINT}/${id}`)
    }

    async update(brandModel, id) {
        return axios.put(`${this.API_ENDPOINT}/${id}`, brandModel)
    }
}
