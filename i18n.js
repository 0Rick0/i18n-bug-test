import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const dictionary = {};
const depth = 100;
// create a sizable dictionary
for (let i = 0; i < depth; i++) {
    dictionary[`key${i}`] = {};
    for (let j = 0; j < depth; j++) {
        dictionary[`key${i}`][`key${j}`] = {};
        for (let k = 0; k < depth; k++) {
            dictionary[`key${i}`][`key${j}`][`key${k}`] = `val-${i}-${j}-${k}`;
        }
    }
}

const i18n = new VueI18n({
    messages: { 'en-US': dictionary },
});

export default i18n;
