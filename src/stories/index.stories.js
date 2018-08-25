import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import VueInfoAddon from 'storybook-addon-vue-info'

import Button from '../components/Button.vue';
import Header from '../components/Header.vue';

storiesOf('UI/Button', module)
  //.addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('with text', () => ({
    data() {
      return {
        rounded: boolean('Rounded', false),
        size: select('size', ['xs', 'sm', 'md', 'lg'], 'md'),
        label: text('Label', 'My button')
      };
    },
    components: { Button },
    template: '<Button :onClick="action" :rounded="rounded" :size="size">{{ label }}</Button>',
    methods: { action: linkTo('Button', 'with some emoji') },
    propsDescription: {
      size: 'Must be xs, sm, md, lg (default to md)'
    }
  }))
;

storiesOf('Components/Header', module)
  .addDecorator(withKnobs)
  .add('with text', () => ({
    components: { Header },
    template: '<Header />',
  }))
;