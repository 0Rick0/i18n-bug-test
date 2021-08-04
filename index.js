import process from 'process';
import hypernova from 'hypernova/lib/server.js';
import {renderVue} from 'hypernova-vue/server.js';
import TestComponent from "./TestComponent.js";

console.log(`PID is: ${process.pid}`);
console.log(`run kill -USR2 ${process.pid} to create heap dump`);

hypernova({
    devMode: true,
    getComponent(name) {
        switch (name) {
            case 'TestComponent':
                return renderVue(name, TestComponent);
            default:
                return null;
        }
    },
})
