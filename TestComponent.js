import Vue from 'vue';
import i18n from './i18n.js';

export default Vue.component('TestComponent', {
    i18n,
    template: "<h1>{{ keypath ? $t(keypath) : '' }}</h1>",
    data() {
        const i = Math.floor(Math.random() * 100);
        const j = Math.floor(Math.random() * 100);
        const k = Math.floor(Math.random() * 100);
        return {
            keypath: `key${i}.key${j}.key${k}`,
        }
    },
});
