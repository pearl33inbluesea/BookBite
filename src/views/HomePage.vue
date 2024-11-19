<template>
    <div class="homepage">
        <!-- 첫 번째 메인 화면 -->
        <section class="hero-section">
            <div class="text-container left-aligned">
                <h1 class="headline">
                    책 한 권의 지혜를<br>
                    한 입 크기로<br>
                    <span class="bitebook">BiteBook</span>
                </h1>
                <p class="subtext">
                    바쁜 일상 속에서 책 읽을 시간이 없을 때,<br>
                    BiteBook으로 빠르게 핵심 내용을 파악하세요.
                </p>
            </div>
            <div class="main-container">
                <img src="@/assets/main.png" alt="BiteBook Logo" class="main-image" />
            </div>
        </section>

        <!-- 두 번째 메인 화면 -->
        <section class="second-section observer-section">
            <div class="centered hidden">
                <h2 class="headline secondary-headline">
                    한 입 크기로 잘라낸 간식을 즐기듯,<br>
                    책의 중요한 개념과 메시지를 간편하게
                </h2>
            </div>
            <div class="image-container hidden">
                <img src="@/assets/bookshelfimage.png" alt="Bookshelf Image" class="bookshelf-image" />
            </div>
        </section>
    </div>

    <!-- 세 번째 섹션 -->
    <section class="third-section">
        <div class="center-text">
            BiteBook과 함께<br>
            쉽게 지식을 탐험하고,<br>
            새로운 영감을 얻으세요!
        </div>
        <div class="card-container">
            <div class="info-card" v-for="(item, index) in infoCards" :key="index">
                <h3 class="card-title">{{ item.title }}</h3>
                <p class="card-description" v-html="item.description"></p>
            </div>
        </div>
    </section>


    <!--베스트 도서 영상-->
    <div class="carousel-wrapper">
        <h4 class="carousel-title">이번 달 베스트 도서 3</h4>
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <video class="d-block w-100" controls>
                        <source src="@/assets/video/인연.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>인연</h5>
                        <p>피천득 한국 수필</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <video class="d-block w-100" controls>
                        <source src="@/assets/video/달러구트 꿈 백화점.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>달러구트 꿈 백화점</h5>
                        <p>이미예 판타지 소설</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <video class="d-block w-100" controls>
                        <source src="@/assets/video/걸리버 여행기.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>걸리버 여행기</h5>
                        <p>조나단 스위프트 영미 소설</p>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>



</template>


<script>
import { onMounted } from 'vue';

export default {
    name: 'HomePage',
    setup() {
        onMounted(() => {
            const observerOptions = {
                threshold: 0.1,
            };

            const callback = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            };

            const observer = new IntersectionObserver(callback, observerOptions);

            document.querySelectorAll('.observer-section .hidden').forEach(el => {
                observer.observe(el);
            });
        });
    },
    data() {
        return {
            infoCards: [
                { title: "빠른 이해", description: "책의 핵심 내용을 간결하게 제공" },
                { title: "맞춤 추천", description: "AI 기반의 개인화된 책 추천 기능" },
                { title: "다양한 장르", description: "소설, 에세이, 자기계발 등<br>여러 장르를 아우르는 폭넓은 책" },
                { title: "간편한 접근성", description: "요약 영상과 짧은 글로 어디서나 <br>간편히 책을 즐길 수 있는 플랫폼" },
            ],
        };
    },
};


</script>

<style scoped>
.carousel-wrapper {
    text-align: center;
    margin-bottom: 7rem;
}

.carousel-title {
    font-size: 2rem;
    font-weight: bold;
    color: white;
    margin: 5rem 0 2rem;
}

.homepage {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-x: hidden;
}

/* 첫 번째 섹션 스타일 */
.hero-section {
    display: flex;
    align-items: center;
    height: 100vh;
    padding: 15vw 10vw;
    background-color: #f5f5f5;
}

.text-container {
    width: 48%;
    padding-left: 10vw;
    text-align: left;
}

.headline {
    font-size: 3rem;
    font-weight: 900;
    line-height: 1.2;
    color: #333;
}

.bitebook {
    color: #004080;
    font-size: 5rem;
    font-weight: 900;
}

.subtext {
    font-size: 1.2rem;
    font-weight: 200;
    margin-top: 1rem;
    color: #333;
}

.main-container {
    width: 48%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.main-image {
    max-width: 70%;
    height: auto;
}

@keyframes fade-slide-in {
    from {
        opacity: 0;
        transform: translateY(-40px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hero-section .text-container,
.hero-section .main-container {
    animation: fade-slide-in 2s ease-out;
    animation-delay: 0.4s;
}

/* 두 번째 섹션 스타일 */
.second-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 20vh 10vw;
    text-align: center;
    height: 150vh;
}

.secondary-headline {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    line-height: 1.4;
    margin: 0 auto;
    animation: slide-in-blur 1s ease-out;
    margin-bottom: 4rem;
}

.image-container {
    width: 100vw;
    overflow: hidden;
}

.bookshelf-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    animation: fade-in-scale 1.2s ease-out;
}

/* 모션 숨기기 및 활성화 */
.hidden {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.visible {
    opacity: 1;
    transform: translateY(0);
}

/* 세 번째 섹션 스타일 */
.third-section {
    padding: 5vh 5vw;
    background-color: #f0f4f8;
    text-align: center;
}

.center-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 50vh;
    font-size: 2rem;
    font-weight: bold;
    color: #333;
}

.card-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    max-width: 800px;
    margin: 0 auto;
    padding-bottom: 20vh;
}

.info-card {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.info-card:hover {
    transform: translateY(-10px);
}

.card-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #004080;
    margin-bottom: 0.5rem;
}

.card-description {
    font-size: 1rem;
    color: #666;
}

/* Carousel Video 스타일 */
.carousel-inner {
    max-width: 70%;
    margin: 0 auto;
}

.carousel-item video {
    max-height: 500px;
    width: auto;
}

/* 애니메이션 */
@keyframes slide-in-blur {
    0% {
        transform: translateY(30px);
        opacity: 0;
        filter: blur(10px);
    }

    50% {
        opacity: 0.5;
        filter: blur(5px);
    }

    100% {
        transform: translateY(0);
        opacity: 1;
        filter: blur(0);
    }
}

@keyframes fade-in-scale {
    0% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>