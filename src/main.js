// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap JS (Optional, if you need Bootstrap's JS components)
import 'bootstrap/dist/js/bootstrap.min.js';

// Bootstrap Icons 추가
import 'bootstrap-icons/font/bootstrap-icons.css';

// 전역 CSS 파일 불러오기
import './assets/styles.css';

createApp(App).use(router).use(store).mount('#app');
