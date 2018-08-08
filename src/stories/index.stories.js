import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text } from '@storybook/addon-knobs';
import VueInfoAddon from 'storybook-addon-vue-info'

import Button from '../components/Button.vue'

storiesOf('UI/Button', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('with text', () => ({
    components: { Button },
    template: '<Button @click="action">' + text('Label', 'Lolilol') + '</Button>',
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