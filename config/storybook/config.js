import { configure } from '@storybook/vue';
import { setDefaults } from 'storybook-addon-vue-info';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

setDefaults({
  header: false
});

const req = require.context('../../src/stories', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
