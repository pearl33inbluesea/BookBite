<template>
    <div class="page-container">
        <!-- 왼쪽 섹션 - 이미지 및 신청 버튼 (40%) -->
        <div class="left-section">
            <div class="image-container">
                <div class="title-container">
                    <h1 class="main-title">도서 신청</h1>
                    <p class="subtitle">읽고 싶은 책이나 좋아하는 책을 신청해보세요.
                        <br>책의 감동을 더 많은 사람과 나눌 수 있어요.
                    </p>
                </div>
                <div class="image-wrapper">
                    <img src="@/assets/bookimage.png" alt="Book Background" class="background-image" />
                </div>
                <button class="request-button" @click="showForm = true">
                    신청하기
                </button>
            </div>

            <!-- 신청 모달 -->
            <div class="modal-overlay" v-if="showForm" @click.self="showForm = false">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5>도서 신청</h5>
                        <button class="close-button" @click="showForm = false">&times;</button>
                    </div>
                    <form @submit.prevent="addBook">
                        <div class="form-group">
                            <label for="bookTitle">책 제목</label>
                            <input type="text" id="bookTitle" v-model="newBook.title" required />
                        </div>
                        <div class="form-group">
                            <label for="bookAuthor">작가 이름</label>
                            <input type="text" id="bookAuthor" v-model="newBook.author" required />
                        </div>
                        <div class="form-group">
                            <label for="bookPublisher">추천 이유</label>
                            <input type="text" id="bookPublisher" v-model="newBook.publisher" required />
                        </div>
                        <button type="submit" class="submit-button">신청하기</button>
                    </form>
                </div>
            </div>
        </div>


        <!-- 오른쪽 섹션 - 포스트잇 보드 (60%) -->
        <div class="right-section">
            <div class="cork-board">
                <div class="post-it-grid">
                    <div v-for="(book, index) in books" :key="index" class="post-it" :style="{
                        '--rotation': getRandomRotation(),
                        '--post-it-color': book.color
                    }" @click="togglePopover($event, index)">
                        <div class="pushpin">
                            <div class="pin-top"></div>
                            <div class="pin-shadow"></div>
                        </div>
                        <div class="post-it-content">
                            <h5>{{ book.title }}</h5>
                            <p class="author">{{ book.author }}</p>
                            <p class="publisher">{{ book.publisher }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { Popover } from 'bootstrap'

export default {
    name: 'BookApplicationPage',
    setup() {
        const showForm = ref(false)
        const newBook = ref({
            title: '',
            author: '',
            publisher: ''
        })
        const books = ref([])
        const popovers = reactive({})

        const getRandomColor = () => {
            // 포스트잇 색상 배열 수정
            const colors = [
                '#fff740', // 진한 노랑
                '#fff799', // 중간 노랑
                '#ffed4a', // 밝은 노랑
                '#ffffd1', // 매우 연한 노랑
                '#fff4b3'  // 파스텔 노랑
            ]
            return colors[Math.floor(Math.random() * colors.length)]
        }

        const getRandomRotation = () => {
            // -3도에서 3도 사이의 랜덤한 각도 (더 자연스러운 기울기를 위해 범위 수정)
            return `${Math.random() * 6 - 3}deg`
        }

        const addBook = () => {
            if (newBook.value.title && newBook.value.author && newBook.value.publisher) {
                books.value.push({
                    ...newBook.value,
                    color: getRandomColor()
                })
                newBook.value = { title: '', author: '', publisher: '' }
                showForm.value = false
            }
        }

        const togglePopover = (event, index) => {
            if (popovers[index]) {
                popovers[index]._isShown ? popovers[index].hide() : popovers[index].show()
            } else {
                const popover = new Popover(event.currentTarget, {
                    content: '제작 중',
                    html: true,
                    trigger: 'manual',
                    title: '<i class="bi bi-hourglass-split"></i>'
                })
                popovers[index] = popover
                popover.show()
            }
        }

        return {
            showForm,
            newBook,
            books,
            addBook,
            togglePopover,
            getRandomRotation
        }
    }
}
</script>


<style scoped>
.page-container {
    display: flex;
    min-height: 100vh;
    background-color: #f5f5f5;
}

.left-section {
    flex: 1;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.right-section {
    flex: 1;
    padding: 2rem;
    background-color: #fff;
    box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
}

.image-container {
    width: 100%;
    max-width: 500px;
}


/* 모달 스타일 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 15px;
    width: 90%;
    max-width: 500px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.form-group input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.submit-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s ease;
}

.submit-button:hover {
    background-color: #45a049;
}

/* 포스트잇 그리드 스타일 */
.post-it-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2rem;
    padding: 1rem;
}

/* 실제 포스트잇 스타일 */
.post-it {
    position: relative;
    width: 100%;
    height: 200px;
    background: var(--post-it-color);
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    transform: rotate(-2deg);
}

/* 포스트잇 접힌 모서리 효과 */
.post-it::before {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 20px 20px;
    border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
}

/* 포스트잇 그림자 효과 */
.post-it::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%);
    pointer-events: none;
}

.post-it:hover {
    transform: scale(1.05) rotate(0deg);
    box-shadow:
        0 10px 20px rgba(0, 0, 0, 0.1),
        0 6px 6px rgba(0, 0, 0, 0.1);
    z-index: 1;
}

.post-it-content {
    position: relative;
    z-index: 1;
}

.post-it h5 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    font-weight: 600;
    font-family: 'Permanent Marker', cursive;
}

.post-it .author {
    margin: 0.25rem 0;
    font-size: 0.9rem;
    font-family: 'Architects Daughter', cursive;
}

.post-it .publisher {
    margin: 0;
    font-size: 0.8rem;
    opacity: 0.8;
    font-family: 'Architects Daughter', cursive;
}

/* 포스트잇 텍스처 효과 */
.post-it {
    background-image:
        repeating-linear-gradient(-45deg,
            transparent,
            transparent 1px,
            rgba(0, 0, 0, 0.03) 1px,
            rgba(0, 0, 0, 0.03) 2px);
}

.page-container {
    display: flex;
    height: 100vh;
    background-color: #f5f5f5;
    overflow: hidden;
}

.left-section {
    flex: 1;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.right-section {
    flex: 1;
    position: relative;
    overflow: hidden;
}

/* 코르크 보드 스타일 */
.cork-board {
    height: 100%;
    background:
        linear-gradient(45deg, rgba(0, 0, 0, .05) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, .05) 75%),
        linear-gradient(45deg, rgba(0, 0, 0, .05) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, .05) 75%),
        #b8844f;
    background-size: 100px 100px;
    background-position: 0 0, 50px 50px;
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.3);
    padding: 2rem;
    overflow-y: auto;
}

/* 포스트잇 그리드 */
.post-it-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
}

/* 포스트잇 스타일 */
.post-it {
    position: relative;
    min-height: 180px;
    background: var(--post-it-color);
    padding: 1.5rem;
    transform: rotate(var(--rotation));
    transition: all 0.3s ease;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

/* 포스트잇 핀 스타일 */
.pin {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background: radial-gradient(circle at 30% 30%, #f00, #900);
    border-radius: 50%;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 2;
}

/* 포스트잇 접힌 모서리 효과 */
.post-it::before {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 20px 20px;
    border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
}

/* 포스트잇 그림자 효과 */
.post-it::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%);
    pointer-events: none;
}

.post-it:hover {
    transform: scale(1.05) rotate(0deg);
    box-shadow:
        5px 5px 15px rgba(0, 0, 0, 0.2),
        -5px 5px 15px rgba(0, 0, 0, 0.2);
    z-index: 2;
}

.post-it-content {
    position: relative;
    z-index: 1;
    padding-top: 15px;
}

.post-it h5 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    font-weight: 600;
}

.post-it .author {
    margin: 0.25rem 0;
    font-size: 0.9rem;
}

.post-it .publisher {
    margin: 0;
    font-size: 0.8rem;
    opacity: 0.8;
}

/* 기존 모달 및 기타 스타일은 유지 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 15px;
    width: 90%;
    max-width: 500px;
}

/* 나머지 스타일은 이전과 동일 */

/* 오른쪽 섹션 스타일 수정 */
.right-section {
    flex: 1;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #f6f9fc 0%, #f1f4f8 100%);
    box-shadow: -4px 0 10px rgba(0, 0, 0, 0.05);
}

/* 게시판 배경 스타일 수정 */
.cork-board {
    height: 100%;
    background: linear-gradient(120deg, #ffffff 0%, #f8f9fa 100%);
    box-shadow:
        0 0 40px rgba(0, 0, 0, 0.03),
        inset 0 0 60px rgba(255, 255, 255, 0.5);
    padding: 2rem;
    overflow-y: auto;
    border-radius: 20px;
    margin: 1rem;
}

/* 포스트잇 그리드 간격 조정 */
.post-it-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2rem;
    padding: 1.5rem;
}

/* 포스트잇 스타일 현대화 */
.post-it {
    position: relative;
    min-height: 180px;
    background: var(--post-it-color);
    padding: 1.5rem;
    transform: rotate(var(--rotation));
    transition: all 0.3s ease;
    border-radius: 12px;
    box-shadow:
        0 4px 15px rgba(0, 0, 0, 0.05),
        0 1px 2px rgba(0, 0, 0, 0.1);
}

/* 포스트잇 호버 효과 개선 */
.post-it:hover {
    transform: scale(1.03) rotate(0deg);
    box-shadow:
        0 10px 25px rgba(0, 0, 0, 0.08),
        0 5px 10px rgba(0, 0, 0, 0.05);
    z-index: 2;
}

/* 핀 스타일 현대화 */
.pin {
    display: none;
    /* 핀 제거하고 현대적 스타일로 변경 */
}

/* 포스트잇 헤더 스타일 */
.post-it h5 {
    margin: 0 0 0.8rem 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #2c3e50;
    font-family: 'Inter', sans-serif;
}

/* 포스트잇 텍스트 스타일 */
.post-it .author {
    margin: 0.25rem 0;
    font-size: 0.95rem;
    color: #34495e;
    font-family: 'Inter', sans-serif;
}

.post-it .publisher {
    margin: 0.25rem 0;
    font-size: 0.85rem;
    color: #7f8c8d;
    font-family: 'Inter', sans-serif;
}

.left-section {
    flex: 1;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.image-container {
    width: 100%;
    max-width: 400px;
    /* 500px에서 400px로 감소 */
    margin: 0 auto;
    /* 중앙 정렬을 위해 추가 */
    padding: 1rem;
    /* 여백 추가 */
}


/* 반응형 처리 추가 */
@media (max-width: 1200px) {
    .image-container {
        max-width: 400px;
    }
}

@media (max-width: 768px) {
    .image-container {
        max-width: 300px;
    }
}

/* 오른쪽 섹션 - 트렌디한 게시판 스타일 */
.right-section {
    flex: 1;
    position: relative;
    overflow: hidden;
}

/* 게시판 배경 스타일 수정 */
.cork-board {
    height: 100%;
    background-color: #ffffff;
    background-image:
        linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
        linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
        linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    box-shadow:
        inset 0 0 30px rgba(0, 0, 0, 0.05),
        0 0 10px rgba(0, 0, 0, 0.05);
    padding: 2rem;
    overflow-y: auto;
}

/* 포스트잇 스타일 현실감 있게 수정 */
.post-it {
    position: relative;
    min-height: 180px;
    background: var(--post-it-color);
    padding: 1.5rem;
    transform: rotate(var(--rotation));
    transition: all 0.3s ease;
    border-radius: 0;
    /* 모서리 각지게 */
    box-shadow:
        2px 2px 5px rgba(0, 0, 0, 0.1),
        0 0 0 1px rgba(0, 0, 0, 0.05);
}

/* 포스트잇 입체감 효과 */
.post-it::before {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    width: 25px;
    height: 25px;
    background: linear-gradient(135deg,
            transparent 50%,
            rgba(0, 0, 0, 0.05) 50%);
    z-index: 2;
}

/* 포스트잇 텍스처 효과 */
.post-it::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background:
        linear-gradient(45deg,
            transparent 48%,
            rgba(255, 255, 255, 0.5) 50%,
            transparent 52%);
    background-size: 6px 6px;
    pointer-events: none;
}

/* 포스트잇 호버 효과 */
.post-it:hover {
    transform: scale(1.02) rotate(0deg);
    box-shadow:
        3px 3px 8px rgba(0, 0, 0, 0.15),
        0 0 0 1px rgba(0, 0, 0, 0.05);
    z-index: 2;
}

/* 모달 스타일 수정 */
.modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 15px;
    width: 90%;
    max-width: 500px;
    color: #333;
    /* 기본 텍스트 색상 */
}

.modal-header h5 {
    color: #000;
    font-size: 1.25rem;
    font-weight: 600;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #000;
    /* 라벨 색상을 검정으로 */
}

.form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    color: #000;
    /* 입력 텍스트 색상 */
    background-color: #fff;
}



/* 포스트잇 내용 스타일 */
.post-it-content {
    position: relative;
    z-index: 1;
    padding-top: 10px;
}

.post-it h5 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
    font-family: 'Segoe UI', sans-serif;
}

.post-it .author {
    margin: 0.25rem 0;
    font-size: 0.9rem;
    color: #555;
}

.post-it .publisher {
    margin: 0;
    font-size: 0.8rem;
    color: #666;
}

/* Book Request 타이틀 스타일 */
.book-request-title {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem;
    font-weight: 700;
    color: #2c3e50;
    text-shadow:
        2px 2px 4px rgba(0, 0, 0, 0.2),
        0 0 20px rgba(255, 255, 255, 0.8);
    z-index: 2;
    letter-spacing: 2px;
}

/* 코르크 보드 스타일 수정 */
.cork-board {
    height: 100%;
    background:
        linear-gradient(45deg, rgba(139, 69, 19, 0.4) 25%, transparent 25%, transparent 75%, rgba(139, 69, 19, 0.4) 75%),
        linear-gradient(45deg, rgba(139, 69, 19, 0.4) 25%, transparent 25%, transparent 75%, rgba(139, 69, 19, 0.4) 75%),
        #b87647;
    background-size: 60px 60px;
    background-position: 0 0, 30px 30px;
    box-shadow:
        inset 0 0 50px rgba(0, 0, 0, 0.5),
        0 0 15px rgba(0, 0, 0, 0.2);
    padding: 2rem;
    border: 20px solid #8B4513;
    border-radius: 8px;
    overflow-y: auto;
}

/* 포스트잇 스타일 개선 */
.post-it {
    position: relative;
    min-height: 180px;
    background: var(--post-it-color);
    padding: 1.8rem 1.5rem 1.5rem;
    transform: rotate(var(--rotation));
    transition: all 0.3s ease;
    box-shadow:
        3px 3px 8px rgba(0, 0, 0, 0.2),
        0 0 0 1px rgba(0, 0, 0, 0.05);
    margin-top: 15px;
}

/* 압정 스타일 */
.pushpin {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
}

.pin-top {
    width: 14px;
    height: 14px;
    background: radial-gradient(circle at 40% 40%,
            #f5f5f5 0%,
            #e0e0e0 40%,
            #bdbdbd 100%);
    border-radius: 50%;
    box-shadow:
        -1px -1px 2px rgba(255, 255, 255, 0.5),
        1px 1px 2px rgba(0, 0, 0, 0.3);
    position: relative;
    z-index: 2;
}

.pin-shadow {
    width: 10px;
    height: 3px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    position: absolute;
    top: 14px;
    left: 2px;
    filter: blur(1px);
}

/* 포스트잇 호버 효과 개선 */
.post-it:hover {
    transform: scale(1.03) rotate(0deg);
    box-shadow:
        5px 5px 15px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(0, 0, 0, 0.1);
    z-index: 2;
}

/* 포스트잇 내용 여백 조정 */
.post-it-content {
    padding-top: 15px;
}

.page-container {
    display: flex;
    min-height: 100vh;
}

.left-section {
    flex: 4;
    padding: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}

.right-section {
    flex: 6;
    position: relative;
    background: url('@/assets/notes.jpg') center center/cover;
}

.image-container {
    width: 100%;
    max-width: 400px;
    margin-left: 2rem;
}

.title-container {
    text-align: left;
    margin-bottom: 1rem;
}

.main-title {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0;
    line-height: 1.2;
    letter-spacing: -0.5px;
}

.subtitle {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 1.2rem;
    color: #666;
    margin: 0.5rem 0 1.5rem 0;
}


.request-button {
    padding: 0.8rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    background: linear-gradient(45deg, #2c3e50, #3498db);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    width: fit-content;
}

.request-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* 기존 코드의 나머지 스타일 유지 */
.cork-board {
    background: transparent;
}

.page-container {
    display: flex;
    min-height: 100vh;
}

.left-section {
    flex: 4;
    padding: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}

.right-section {
    flex: 6;
    position: relative;
    background: url('@/assets/notes.jpg') center center/cover;
}

.image-container {
    width: 100%;
    max-width: 400px;
    margin-left: 2rem;
}

.title-container {
    text-align: left;
    margin-bottom: 1rem;
}

.main-title {
    font-size: 3rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0;
    line-height: 1.2;
}

.subtitle {
    font-size: 1.2rem;
    color: #666;
    margin: 0.5rem 0 1.5rem 0;
}

.image-wrapper {
    position: relative;
}


.request-button {
    padding: 0.8rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    background: linear-gradient(45deg, #2c3e50, #3498db);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    width: fit-content;
}

.request-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* 기존 코드의 나머지 스타일 유지 */
.cork-board {
    background: transparent;
    border: none;
    /* 갈색 테두리 제거 */
    box-shadow: none;
    /* 기존 테두리 관련 그림자 효과 제거 */
}

/* 기존의 포스트잇 및 압정 관련 스타일은 모두 유지 */

.page-container {
    display: flex;
    min-height: 100vh;
}

.left-section {
    flex: 4;
    padding: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}

.right-section {
    flex: 6;
    position: relative;
    background: url('@/assets/notes.jpg') center center/cover;
    background-size: 80%;
    /* 배경 이미지 크기 축소 */
}

.image-container {
    width: 100%;
    max-width: 400px;
    margin-left: 2rem;
}

.title-container {
    text-align: left;
    margin-bottom: 1rem;
}

.main-title {
    font-size: 2.5rem;
    /* 크기 약간 축소 */
    font-weight: 700;
    color: #2c3e50;
    margin: 0;
    line-height: 1.2;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    /* 기본 시스템 폰트 적용 */
    margin-bottom: 2rem;
}

.subtitle {
    font-size: 1.1rem;
    color: #666;
    margin: 0.5rem 0 1.5rem 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    /* 기본 시스템 폰트 적용 */
}

.image-wrapper {
    position: relative;
}

.background-image {
    color: #f5f5f5;
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
    object-fit: cover;
    /* hover 효과 제거 */
}

.request-button {
    /* 패딩 축소 */
    font-size: 1rem;
    /* 폰트 크기 축소 */
    font-weight: 600;
    color: white;
    background: #333;
    /* 검정색 배경으로 변경 */
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: fit-content;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    /* 기본 시스템 폰트 적용 */
}

.request-button:hover {
    background: #000;
    /* 호버 시 더 진한 검정색 */
}

/* 코르크보드 관련 스타일 */
.cork-board {
    background: transparent;
    border: none;
    box-shadow: none;
}

/* 포스트잇 스타일 업데이트 */
.post-it h5,
.post-it .author,
.post-it .publisher {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* 모달 스타일 업데이트 */
.modal-content {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.modal-header h5 {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.form-group label {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.form-group input {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>