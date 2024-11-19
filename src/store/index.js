// src/store/index.js
import { createStore } from 'vuex';
import books from '@/assets/books'
export default createStore({
    state: {
        books: books,
    },
    mutations: {
        toggleLike(state, bookId) {
            const book = state.books.find((b) => b.id === bookId);
            if (book) {
                book.liked = !book.liked;
            }
        },
    },
    getters: {
        likedBooks(state) {
            return state.books.filter((book) => book.liked);
        },
        allBooks(state) {
            return state.books;
        },
        booksByGenre: (state) => (genre) => {
            return state.books.filter((book) => book.genre === genre);
        },
    },
});
