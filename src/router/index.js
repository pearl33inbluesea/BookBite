import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import BookshelfPage from '../views/BookshelfPage.vue';
import MyBookShelfPage from '../views/MyBookShelfPage.vue';
import MagazinePage from '../views/MagazinePage.vue';
import BookApplicationPage from '../views/BookApplicationPage.vue';
import AIChatBotPage from '../views/AIChatBotPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/bookshelf', name: 'Bookshelf', component: BookshelfPage },
  { path: '/my-bookshelf', name: 'MyBookShelf', component: MyBookShelfPage },
  { path: '/magazine', name: 'Magazine', component: MagazinePage },
  { path: '/book-application', name: 'BookApplication', component: BookApplicationPage },
  { path: '/ai-chatbot', name: 'AIChatBot', component: AIChatBotPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
