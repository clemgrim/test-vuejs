import { configure } from '@storybook/vue'
import { setDefaults } from 'storybook-addon-vue-info'

setDefaults({
  header: false
});

const req = require.context('../../src/stories', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
