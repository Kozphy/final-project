import Vue from 'vue';
import material from 'material-design-icons';
import Toasted from 'vue-toasted';

// you can also pass options, check options reference below
Vue.use(Toasted, {
  iconPack: material,
  theme: 'toasted-primary',
  position: 'bottom-right',
  duration: 5000,
});
