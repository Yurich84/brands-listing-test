import Vue from 'vue'
import * as bootstrap from './bootstrap'
import '../sass/app.scss';
import AppComponent from './components/App'

bootstrap.setupPlugins(Vue);

window.Vue = new Vue({
    ...bootstrap.createInstanceOptions(Vue),
    render: h => h(AppComponent)
}).$mount('#app')
