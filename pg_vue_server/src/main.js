import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App).use(router).mount('#app')

global.gui = {
    chat: null, 
    login: null,
    hud: null,
    deathscreen: null,
    inventory: null,
}
global.app = app;