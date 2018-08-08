import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import VueInfoAddon from 'storybook-addon-vue-info'

import Button from '../components/Button.vue'

storiesOf('UI/Button', module)
  .addDecorator(VueInfoAddon)
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
    template: '<Button @click="action" :rounded="rounded" :size="size">{{ label }}</Button>',
    methods: { action: linkTo('Button', 'with some emoji') }
  }))
  .add('with JSX', () => ({
    render(h) {
      return <Button>With JSX</Button>
    }
  }))
  .add('with some emoji', () => ({
    components: { Button },
    template: '<Button @click="action">😀 😎 👍 💯</Button>',
    methods: { action: action('clicked') }
  }))
;