<template>
    <div class="container">

        <h1 class="text-center mt-5">Brands</h1>

        <table class="table" id="brand-table">
            <thead>
                <tr>
                    <th v-for="field in fields" :key="field" @click="sortBy(field)">
                        {{ field | capitalize }}
                        <span v-if="sort.field === field">
                           <span v-if="sort.direction === 'desc'">&uarr;</span>
                            <span v-else>&darr;</span>
                        </span>
                    </th>
                </tr>
            </thead>
            <tr v-if="loading">
                <td colspan="8">
                    <div class="w-100 text-center">
                        <img src="/imgs/loader.gif">
                    </div>
                </td>
            </tr>
            <tr v-if="!loading" v-for="brand in availableBrands" :key="brand.id">
                <th v-for="field in fields" :key="field">{{ brand[field] }}</th>
            </tr>
        </table>
    </div>
</template>

<script>

    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import {BRAND_CLEAR, BRAND_FETCH_AVAILABLE, BRAND_OBTAIN_ALL} from "../../store/brand/types";

    export default {
        data() {
            return {
                fields: [
                    'id',
                    'name',
                    'description',
                    'group',
                    'select',
                ],
                loading: false,
                page: 1,
                sort: {
                    field: 'id',
                    direction: 'asc'
                }
            }
        },
        filters: {
            capitalize: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        },
        computed: {
            ...mapGetters(['availableBrands']),
        },
        methods: {
            ...mapActions([BRAND_FETCH_AVAILABLE]),
            ...mapMutations([BRAND_OBTAIN_ALL, BRAND_CLEAR]),
            sortBy(field) {
                if(this.sort.field === field) {
                    this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc'
                } else {
                    this.sort.direction = 'asc'
                }
                this.sort.field = field
                this[BRAND_FETCH_AVAILABLE]
            }
        },
        created() {
            this[BRAND_OBTAIN_ALL] = null
            this[BRAND_CLEAR]()
            this[BRAND_FETCH_AVAILABLE]({
                page: this.page
            }).finally(() => this.isLoading = false)

        },
    }
</script>
<style lang="scss">
    #brand-table {
        thead > tr > th {
            cursor: pointer;
            min-width: 100px;
        }
    }
</style>
