// const chart = require('./chart.js');
import Vue  from 'vue/dist/vue.common'
import chart from './chart'
import Menu from './menu'
import filter from './filter'
import file from './file'
import './polyfill'

let vm = new Vue({
    el : '#app',
    data: {

    },
    methods: {
        
    },
    created(){
        
    }
})

new Menu();
new filter();
new chart();
new file();

