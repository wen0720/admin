// const chart = require('./chart.js');
import chart from './chart'
import Menu from './menu'
import filter from './filter'
import file from './file'
import './polyfill'

new Menu();
new filter();
new chart();
new file();