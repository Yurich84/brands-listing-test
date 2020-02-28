<template>
    <div class="app">
        <!--        App component-->
        <Notificator></Notificator>
        <router-view></router-view>
    </div>
</template>

<script>
    import Notificator from './Notificator'

    export default {
        name: 'App',
        components: {
            Notificator
        },
        methods:{

        },
    }
</script>
