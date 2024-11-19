<template>
    <div class="bookshelf-container">
        <div class="container">
            <div class="row mb-3">
                <!-- Genre button group -->
                <div class="col-8 d-flex justify-content-start">
                    <div class="btn-group" role="group" aria-label="Genre Group">
                        <!-- Dropdown for 소설 and its sub-genres -->
                        <div class="dropdown me-2">
                            <button type="button" class="btn dropdown-toggle"
                                :class="{ 'btn-primary': selectedGenre === '소설', 'btn-outline-primary': selectedGenre !== '소설' }"
                                data-bs-toggle="dropdown" aria-expanded="false" @click="setGenre('소설')">
                                소설
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" @click="setGenre('일반소설')">일반소설</a></li>
                                <li><a class="dropdown-item" @click="setGenre('추리')">추리</a></li>
                                <li><a class="dropdown-item" @click="setGenre('판타지')">판타지</a></li>
                                <li><a class="dropdown-item" @click="setGenre('과학')">과학</a></li>
                                <li><a class="dropdown-item" @click="setGenre('SF')">SF</a></li>
                            </ul>
                        </div>
                        <!-- Other genre buttons with dynamic classes for active state -->
                        <button type="button" class="btn me-2"
                            :class="{ 'btn-primary': selectedGenre === '수필', 'btn-outline-primary': selectedGenre !== '수필' }"
                            @ㅊclick="setGenre('수필')">
                            수필
                        </button>
                        <button type="button" class="btn me-2"
                            :class="{ 'btn-primary': selectedGenre === '자기계발서', 'btn-outline-primary': selectedGenre !== '자기계발서' }"
                            @click="setGenre('자기계발서')">
                            자기계발서
                        </button>
                        <button type="button" class="btn me-2"
                            :class="{ 'btn-primary': selectedGenre === '시', 'btn-outline-primary': selectedGenre !== '시' }"
                            @click="setGenre('시')">
                            시
                        </button>
                        <button type="button" class="btn"
                            :class="{ 'btn-primary': selectedGenre === '예술/종교', 'btn-outline-primary': selectedGenre !== '예술/종교' }"
                            @click="setGenre('예술/종교')">
                            예술/종교
                        </button>
                    </div>
                </div>


                <!-- Search bar -->
                <div class="col-4 d-flex justify-content-end">
                    <input type="text" v-model="searchQuery" placeholder="제목 또는 저자를 입력하세요..." class="form-control"
                        style="width: 300px;" />
                </div>
            </div>

            <div class="row row-cols-1 row-cols-md-5 g-4">
                <div class="col" v-for="(book, index) in filteredBooks" :key="index">
                    <div class="card h-100 book-card" @click="openModal(book)">
                        <img :src="require(`@/assets/bookcover/${book.image}`)" class="card-img-top" :alt="book.title">
                        <div class="card-body d-flex flex-column justify-content-between align-items-start">
                            <p class="card-text mb-1"><strong>{{ book.title }}</strong></p>
                            <p class="card-text mb-2">{{ book.author }}</p>
                            <i :class="book.liked ? 'bi bi-star-fill' : 'bi bi-star'" @click.stop="toggleLike(book.id)"
                                class="like-icon mt-auto" role="button" style="font-size: 1.5rem; cursor: pointer;"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="bookModal" tabindex="-1" aria-labelledby="bookModalLabel" aria-hidden="true"
            ref="modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content custom-modal-bg">
                    <div class="modal-header border-0">
                        <h5 class="modal-title" id="bookModalLabel">{{ selectedBook.title }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="ratio ratio-16x9">
                            <iframe :src="`https://www.youtube.com/embed/${selectedBook.video}?si=IreaIkF5O8Izsf9e`"
                                title="YouTube video player" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                            </iframe>
                        </div>

                        <p class="mt-3" v-html="selectedBook.description"></p>

                        <div class="modal-footer border-0 d-flex flex-column align-items-start">
                            <!-- 구매처 링크 추가 -->
                            <div class="mt-3" v-if="selectedBook.purchaseLinks">
                                <h6>구매처:</h6>
                                <ul class="list-unstyled d-flex gap-3">
                                    <li v-if="selectedBook.purchaseLinks.kyobo">
                                        <a :href="selectedBook.purchaseLinks.kyobo" target="_blank">
                                            <img src="@/assets/buy/교보문고.png" alt="교보문고" width="40" height="40">
                                        </a>
                                    </li>
                                    <li v-if="selectedBook.purchaseLinks.yes24">
                                        <a :href="selectedBook.purchaseLinks.yes24" target="_blank">
                                            <img src="@/assets/buy/예스24.png" alt="YES24" width="40" height="40">
                                        </a>
                                    </li>
                                    <li v-if="selectedBook.purchaseLinks.aladin">
                                        <a :href="selectedBook.purchaseLinks.aladin" target="_blank">
                                            <img src="@/assets/buy/알라딘.png" alt="알라딘" width="40" height="40">
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <hr class="my-3" />


                        <!-- Display comments below input field -->
                        <div class="mt-3">
                            <h6>Comments</h6>
                            <ul class="list-unstyled">
                                <li v-for="(comment, index) in selectedBook.comments" :key="index">
                                    <strong>{{ comment.user }}:</strong> {{ comment.text }}
                                </li>
                            </ul>
                        </div>

                        <div class="input-group mt-3">
                            <input type="text" v-model="newComment" class="form-control" placeholder="후기를 알려주세요!"
                                @keyup.enter="addComment" />
                            <button class="btn btn-primary" @click="addComment">남기기</button>
                        </div>


                        <div class="text-end mt-3">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref, nextTick } from 'vue';
import { useStore } from 'vuex';
import { Modal } from 'bootstrap';

export default {
    name: 'BookshelfPage',
    setup() {
        const store = useStore();
        const books = computed(() => store.getters.allBooks);
        const modal = ref(null);
        const searchQuery = ref('');
        const selectedGenre = ref('');
        const newComment = ref(''); // 새 댓글 입력 필드

        // 선택된 책 정보 및 초기 댓글 리스트 추가
        const selectedBook = ref({
            title: '',
            author: '',
            description: '',
            video: '',
            purchaseLinks: {}, // 빈 객체로 기본값 설정
            comments: [] // 댓글 배열 추가
        });

        const setGenre = (genre) => {
            selectedGenre.value = genre;
        };

        // 장르 및 검색어 필터링 기능
        const filteredBooks = computed(() => {
            let filtered = books.value;

            if (selectedGenre.value) {
                filtered = store.getters.booksByGenre(selectedGenre.value);
            }

            if (searchQuery.value) {
                const query = searchQuery.value.toLowerCase();
                filtered = filtered.filter((book) =>
                    book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
                );
            }

            return filtered;
        });

        // 모달 열기 함수, 선택된 책 정보 업데이트
        const openModal = (book) => {
            selectedBook.value = { ...book, comments: book.comments || [] };
            nextTick(() => {
                if (modal.value) {
                    const modalInstance = new Modal(modal.value);
                    modalInstance.show();
                }
            });
        };

        const toggleLike = (bookId) => {
            store.commit('toggleLike', bookId);
        };

        // 댓글 추가 함수
        const addComment = () => {
            if (newComment.value.trim() !== '') {
                selectedBook.value.comments.push({
                    user: '사용자', // 사용자 이름 설정 예시
                    text: newComment.value
                });
                newComment.value = ''; // 댓글 입력 필드 초기화
            }
        };

        return {
            books,
            filteredBooks,
            selectedBook,
            modal,
            searchQuery,
            selectedGenre,
            newComment,
            setGenre,
            openModal,
            toggleLike,
            addComment
        };
    },
};
</script>


<style scoped>
.bookshelf-container {
    min-height: 100vh;
    padding: 2rem;
    background-color: black;
    /* 배경색을 검정으로 설정 */
    color: white;
    /* 텍스트 색상을 흰색으로 설정 */
}

.book-card {
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
    overflow: hidden;
}

.book-card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-img-top {
    transition: transform 0.3s ease-in-out;
}

.book-card:hover .card-img-top {
    transform: scale(1.1);
}

.like-icon {
    color: #0d6efd;
    transition: color 0.3s;
}

.like-icon:hover {
    color: #6610f2;
}

/* 스타일 추가: 모달 배경색을 검정색으로 변경 */
.custom-modal-bg {
    background-color: black;
    color: white;
}

.modal-header.border-0 {
    border: none;
}

.modal-footer.border-0 {
    border: none;
    padding: 0;
}

.embed-responsive {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    overflow: hidden;
}

.embed-responsive .embed-responsive-item,
.embed-responsive embed,
.embed-responsive iframe,
.embed-responsive object,
.embed-responsive video {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
}
</style>
