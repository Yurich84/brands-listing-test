<template>
    <div class="container">
        <table class="table" id="contact-table">
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
            <tr v-if="!loading" v-for="contact in contacts" :key="contact.id">
                <th v-for="field in fields" :key="field">{{ contact[field] }}</th>
            </tr>
        </table>
        <button @click="readMore" v-if="showBtn" class="btn btn-outline-primary w-100">Read More</button>
    </div>
</template>

<script>

    import axios from 'axios'

    export default {
        data() {
            return {
                fields: [
                    'age',
                    'eyeColor',
                    'name',
                    'gender',
                    'company',
                    'email',
                    'phone',
                    'address'
                ],
                loading: false,
                showBtn: true,
                contacts: [],
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
        methods: {
            fetchContacts() {
                this.loading = true;
                axios.get('/api/contacts', {
                    params: {
                        page: this.page,
                        sort_field: this.sort.field,
                        sort_direction: this.sort.direction
                    }
                }).then(response => {
                    if(response.data.length > 0) {
                        this.contacts = response.data
                    } else {
                        this.showBtn = false
                    }
                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    this.loading = false
                })
            },
            readMore() {
                this.page++;
                this.fetchContacts()
            },
            sortBy(field) {
                if(this.sort.field === field) {
                    this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc'
                } else {
                    this.sort.direction = 'asc'
                }
                this.sort.field = field
                this.fetchContacts()
            }
        },
        mounted() {
            this.fetchContacts()
        }
    }
</script>
<style lang="scss">
    #contact-table {
        thead > tr > th {
            cursor: pointer;
            min-width: 100px;
        }
    }
</style>
