<template>
    <div class="section-title">
        <span class="title-line">MAGAZINE</span>
    </div>

    <div class="magazine-page">
        <!-- Magazine Card Grid -->
        <div class="card-grid">
            <div v-for="(magazine, index) in magazines" :key="index" class="card" @click="openModal(magazine, 'image')">
                <img :src="magazine.thumbnail" :alt="magazine.title" class="card-img" />
            </div>
        </div>

        <!-- Large News Card Section -->
        <div class="large-card-grid">
            <div v-for="(news, index) in newsCards" :key="index" class="large-card" @click="openModal(news, 'text')">
                <img :src="news.thumbnail" :alt="news.title" class="large-card-img" />
                <div class="card-content">
                    <h5 class="news-title">{{ news.title }}</h5>
                    <p class="news-text">{{ news.previewText }}</p>
                </div>
            </div>
        </div>

        <!-- Modal for detailed magazine view -->
        <div :class="['modal', 'fade', { 'modal-text': modalType === 'text' }]" id="magazineModal" tabindex="-1"
            aria-hidden="true" ref="modal">
            <div class="modal-dialog modal-dialog-centered modal-md">
                <div class="modal-content">
                    <!-- Conditionally render image carousel or text based on modalType -->
                    <div v-if="modalType === 'image'">
                        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item" v-for="(image, i) in selectedMagazine.images" :key="i"
                                    :class="{ active: i === 0 }">
                                    <img :src="image" class="d-block w-100" alt="Magazine Image">
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"
                                data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"
                                data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <!-- Text content for newsCards -->
                    <div v-else>
                        <div class="modal-body">
                            <h5 class="modal-news-title">{{ selectedNews.title }}</h5>
                            <div v-for="(paragraph, index) in selectedNews.fullText" :key="index">
                                <p class="modal-news-text">{{ paragraph }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { Modal } from "bootstrap";

export default {
    name: "MagazinePage",
    setup() {
        const magazines = ref([
            {
                title: "Magazine 1", thumbnail: require('@/assets/card1/001.png'), images: [
                    require('@/assets/card1/001.png'),
                    require('@/assets/card1/002.png'),
                    require('@/assets/card1/003.png'),
                    require('@/assets/card1/004.png'),
                    require('@/assets/card1/005.png'),
                    require('@/assets/card1/006.png')
                ]
            },
            {
                title: "Magazine 2", thumbnail: require('@/assets/card2/001.png'), images: [
                    require('@/assets/card2/001.png'),
                    require('@/assets/card2/002.png'),
                    require('@/assets/card2/003.png'),
                    require('@/assets/card2/004.png'),
                    require('@/assets/card2/005.png'),
                    require('@/assets/card2/006.png')
                ]
            },
            {
                title: "Magazine 3", thumbnail: require('@/assets/card3/011.png'), images: [
                    require('@/assets/card3/001.png'),
                    require('@/assets/card3/002.png'),
                    require('@/assets/card3/003.png'),
                    require('@/assets/card3/004.png'),
                    require('@/assets/card3/005.png'),
                    require('@/assets/card3/006.png'),
                    require('@/assets/card3/007.png'),
                    require('@/assets/card3/008.png'),
                    require('@/assets/card3/009.png'),
                    require('@/assets/card3/010.png'),
                    require('@/assets/card3/011.png')
                ]
            },
            {
                title: "Magazine 4", thumbnail: require('@/assets/card4/001.png'), images: [
                    require('@/assets/card4/001.png'),
                    require('@/assets/card4/002.png'),
                    require('@/assets/card4/003.png'),
                    require('@/assets/card4/004.png'),
                    require('@/assets/card4/005.png'),
                    require('@/assets/card4/006.png')
                ]
            }
        ]);
        const newsCards = ref([
            {
                title: "Hip의 재발견",
                thumbnail: require('@/assets/newsimage1.jpg'),
                previewText: "패션부터 책까지",
                fullText: `
요즘 '힙(hip)'이라는 단어는 단순히 유행을 따라가는 걸 넘어, 그 자체로 하나의 문화적 상징이 되고 있다. 특히 젊은 세대 사이에서 '힙하다'는 말은 특정 스타일이나 태도뿐만 아니라 삶을 대하는 방식, 개성을 표현하는 방법과 깊이 관련돼 있다. 그렇다면 현대의 '힙'은 어떤 변화를 겪고 있을까?/

힙은 원래 1960년대 반문화 운동과 함께 등장한 단어로, 주류에 대한 저항과 독창적인 라이프스타일을 의미했다. 당시 히피 문화는 음악, 패션, 정치적 활동을 통해 목소리를 냈고, '힙'은 그들만의 정신적 상징이 됐다. 그러나 시간이 흐르면서 힙은 그 의미와 경계를 지속적으로 확장해 왔다. 오늘날 '힙하다'는 건 단순히 특정 음악 장르나 옷 스타일을 지칭하는 걸 넘어, 자신만의 개성과 취향을 당당하게 표현하고 타인의 시선에서 벗어나고자 하는 태도를 의미하게 됐다./

힙은 단순히 유행을 따라가는 게 아니라 자기만의 독창적인 길을 가는 걸 지향한다. 이는 주류에 대한 반항과 자신만의 색깔을 강조하는 특성에서 비롯된다. 오늘날 '힙'은 다양한 영역에서 그 영향력을 발휘하고 있다. 패션, 음악, 예술 등 여러 분야에서 힙한 감각은 기존의 틀을 부수고 새로운 규칙을 만들어내며, 자신의 개성을 표출하는 중요한 수단이 되고 있다. 이러한 힙의 정신은 단순히 외형적인 스타일을 넘어서, 삶을 대하는 태도, 사회적 규범에 대한 저항, 그리고 자신을 표현하는 방식의 총체적인 의미를 가진다./

예술과 패션, 라이프스타일 전반에서 힙한 요소는 종종 기존의 틀을 부수고 새로운 규칙을 만들어낸다. 예를 들어 최근에는 '레트로 힙'이 유행하면서 과거의 유행이 현대적 감각으로 재해석되고 있다. 빈티지한 의상이나 90년대 감성을 담은 소품들이 다시 인기를 끌고 있는 것도 이러한 흐름의 일환이다. 또한 힙은 소셜 미디어에서도 활발하게 소비되고 확산되고 있다. 인스타그램이나 틱톡 같은 플랫폼에서 '힙스터 감성'을 표방하는 콘텐츠들은 개성적인 라이프스타일을 지지하는 커뮤니티의 공감을 얻고 있다./

최근 영국에서는 '텍스트 힙(Text Hip)'이라는 새로운 흐름이 주목받고 있다. '텍스트 힙'은 활자와 관련된 콘텐츠가 멋지다고 여겨지는 현상을 의미하며, 특히 젊은 세대 사이에서 종이책과 문학을 선호하는 문화가 확산되고 있다. 2023년 영국의 종이책 판매량은 역대 최고 수준인 6억6900만 권에 달했으며, 이러한 기록의 주역은 놀랍게도 기성세대가 아닌 Z세대였다. Z세대, 즉 20대로 구성된 젊은층이 종이책을 찾으며 책 읽기를 멋진 문화적 경험으로 받아들이고 있는 것이다. '텍스트 힙'은 책을 읽고 문학을 향유하는 것을 하나의 힙한 활동으로 여기는 젊은 세대의 태도를 반영하고 있다./

우리나라에서도 이와 비슷한 현상이 나타나고 있다. 지난 6월에 열린 '서울국제도서전'은 역대 최고의 방문객 수를 기록했으며, 20~30대가 방문객의 73%를 차지했다. 특히 20대의 비율이 45%에 달했으며, 이는 젊은 세대가 종이책과 문학에 대해 큰 관심을 가지고 있음을 보여준다. 단순히 종이책에 대한 관심이 증가한 것만이 아니라, 시집 판매량의 증가와 문학 원서 구매에서의 젊은층의 두드러진 약진 등도 이러한 흐름을 뒷받침한다. 더 나아가 드라마 대본집의 인기 역시 '텍스트 힙'의 일환으로 볼 수 있다. 젊은 세대가 문학적 콘텐츠를 멋진 것으로 인식하고 이를 즐기는 것은 기존의 '힙' 개념과도 연결돼 있다./

그러나 힙의 가장 중요한 요소는 단순한 외적 스타일의 차원을 넘는다는 점이다. 진정한 힙함은 남들과 다르다는 것을 자랑하기보다는, 자신만의 길을 걷는 용기와, 사회의 기대에 맞추기보다는 자기 자신에게 솔직해지려는 태도에서 비롯된다. 이러한 의미에서 현대의 힙 문화는 더 이상 특정 집단의 전유물이 아니라, 누구나 자신만의 독특함을 찾아가는 과정에서 경험할 수 있는 감정이라고 할 수 있다. '텍스트 힙' 역시 이러한 흐름의 연장선상에 있으며, 독서와 문학을 통해 자신을 표현하고 개성을 드러내는 힙한 방식 중 하나로 자리 잡고 있다./

결국, 힙이란 단어는 계속해서 변하고 진화하고 있다. 이 변화 속에서 중요한 건 타인과 다름을 두려워하지 않고, 자신만의 색깔을 지키는 것이다. 이런 힙한 태도가 만들어가는 문화는 끊임없이 새로움을 추구하며, 각자의 이야기를 통해 세상을 다채롭게 채워나가고 있다./`
                    .split('/')
                    .filter(paragraph => paragraph.trim() !== '')
            },
            {
                title: "책을 읽는 이유와 태도에 대해 물으신다면..",
                thumbnail: require('@/assets/newsimage2.png'),
                previewText: "우리 시대의 정신에 대하여.",
                fullText: `
우리 시대의 정신에 대하여. 누구나 자신의 고통에 대해 몇 백 장도 쓸 수 있을 만큼 몰입하고, 목소리를 낼 수 있는 시대가 되었다. 하지만 정작 다른 이들의 고통에 대해서는 한 장도 채우기 어려워한다. 예를 들어, 서울 시내 20억짜리 부동산을 가진 사람은 자신이 얼마나 세금이나 대출로 고통받는지에 대해 필리버스터라도 할 수 있을 것이다. 반면 그 건물에 살고 있는 세입자나, 2억짜리 다주택에 사는 사람의 어려움에 대해서는 몇 분 이상 말하지 못할 것이다. 연봉 1억을 받는 직업인은 자신의 직종의 고통에 대해 책 한 권이라도 쓸 수 있겠지만, 옆에서 함께 일하는 연봉 3천의 파견업체 직원의 연봉 3천의 파견업체 직원의 어려움에 대해서는 단 세 줄도 쓰지 못할 것이다. 4년재 대학을 다니는 학생들은 대기업에 들어가지 못하는 고통에 대해 신도 저주할 준비가 되어 있지만, 사무직조차 평생 꿈도 꾸지 못하는 이들의 입장에 대해서는 영원히 생각할 일이 없을 것이다./

이런 현상은 콘텐츠를 접하는 방식에서도 드러난다. MZ세대는 책이나 영화를 단순한 유희의 수단으로 소비하는 경향이 짙다. 서사만 간단히 맛 보고자 요약영상을 보고, 자극적인 장면만 편집한 숏폼을 즐긴다. 알고리즘은 입맛대로 글밥을 추천해 세상에 대한 편식을 가중시킨다. 결국 보고싶은 것만 보고, 듣고싶은 것만 듣게된다. 유희로서의 콘텐츠 소비도 물론 유익하다. 흥미로운 줄거리나 감동적인 순간에 몰입하는 것은 개인에게 적절한 카타르시스를 제공하기 때문이다. 그러나 개인적인 즐거움에서 그치고 않고 한 발짝 더 나아가면 어떨까. 조금 더 의미있는 독서를 위해선 책을 매개로 다른 사람들의 세계를 들여다보고, 그들의 시선을 이해하려 노력해야한다. 나와 다른 세계에선 분명 배울 점들이 있기 때문이다. 자기개발서적이나 고전이 인기있는 이유또한, 저자가 노력으로 일군 인사이트를 한 줌 훔쳐보기 위함이 아닌가./

sns의 발달로 사람들이 자신의 목소리를 높이는 것은 너무나 쉬운 시대가 되었다. 하지만 정작 중요한 목소리들은 여전히 숨죽이고 있다. 사회적으로 소외된 이들의 이야기부터, 인간 실격을 경험해야만 했던 이들의 소리없는 아우성까지. 책은 그 숨죽인 목소리를 들을 수 있는 대나무 숲이 아닐까. 그래서 우리는 책을 읽을 때 단순히 소비의 관점에서 바라보지 않아야 한다. 책을 읽으면서 그 책이 담고 있는 현실을 이해하고, 그것이 의미하는 바를 생각해야 한다. 저자가 경험한 세상을 이해하고, 그 안에 담긴 사람들의 삶을 들여다보려는 노력이 필요하다. 타인의 이야기를 듣고, 그들의 세계를 이해하고, 그 속에서 우리가 놓치고 있는 진정한 문제들을 발견하는 것. 그것이 우리가 책을 읽는 진정한 이유가 아닐까 싶다./`
                    .split('/')
                    .filter(paragraph => paragraph.trim() !== '')
            }
        ]);

        const selectedMagazine = ref({});
        const selectedNews = ref({});
        const modal = ref(null);
        const modalType = ref(''); // 'image' or 'text'

        const openModal = (content, type) => {
            modalType.value = type;
            if (type === 'image') {
                selectedMagazine.value = content;
            } else {
                selectedNews.value = content;
            }
            const modalInstance = new Modal(modal.value);
            modalInstance.show();
        };

        return {
            magazines,
            newsCards,
            openModal,
            selectedMagazine,
            selectedNews,
            modal,
            modalType
        };
    }
};
</script>

<style scoped>
.magazine-page {
    padding-bottom: 10rem;
    background-color: #f5f5f5;
    text-align: center;
}

.section-title {
    font-size: 9rem;
    font-weight: bold;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #333;
    text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    padding-left: 15rem;
    padding-right: 5rem;
    padding-top: 3rem;
    padding-bottom: 0;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
    margin-bottom: 4rem;
}

.card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s;
    cursor: pointer;
    border-radius: 8px;
}

.card-img {
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
    aspect-ratio: 1;
    border-radius: 8px;
}

.large-card-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
}

.large-card {
    position: relative;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s;
    cursor: pointer;
}

.large-card-img {
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 16 / 9;
    border-radius: 8px;
}

.card-content {
    padding: 1rem;
    text-align: left;
}

.news-title {
    font-size: 1.4rem;
    font-weight: bold;
    color: #333;
    text-align: left;
}

.news-text {
    font-size: 1.2rem;
    color: #666;
    line-height: 1.8;
    text-align: left;
}

/* 텍스트 모달 전용 스타일 */
.modal-text .modal-dialog {
    max-width: 50%;
    /* 텍스트 모달의 가로폭을 넓힘 */
}

.modal-text .modal-content {
    padding: 2rem;
    /* 텍스트 모달 내부 여백 추가 */
}

.modal-news-title {
    font-size: 1.8rem;
    font-weight: bold;
    color: black;
    text-align: left;
    margin-bottom: 1.5rem;
}

.modal-news-text {
    font-size: 1.4rem;
    color: black;
    line-height: 2;
    text-align: left;
    opacity: 1;
}

.modal-text .modal-body {
    position: relative;
    padding: 2rem;
    border-radius: 8px;
    overflow: hidden;
    background-image: url('../assets/paper.jpg');
    /* 이미지 경로 확인 */
    background-size: cover;
    background-position: center;
    isolation: isolate;
}

.modal-body::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.3;
    /* 투명도 설정 */
    z-index: -1;
    /* 부모 요소 뒤로 */
    border-radius: inherit;
    /* 부모의 모서리 반경과 일치 */
}


.section-title {
    padding: 2rem 2rem;
    padding-top: 0;
    padding-bottom: 3rem;
    background-color: #f5f5f5;
    position: relative;
    overflow: hidden;
    text-align: center;
}

.title-line {
    display: inline-block;
    font-size: 7rem;
    font-weight: 900;
    letter-spacing: 0.25em;
    color: #333;
    position: relative;
    padding: 0 2rem;
    text-transform: uppercase;
    font-family: 'Arial', sans-serif;
    border-bottom: 3px solid #333;
}

.title-line::before {
    content: '';
    position: absolute;
    left: -1rem;
    top: 50%;
    width: 2px;
    height: 70%;
    background-color: #333;
    transform: translateY(-50%);
}

.title-line::after {
    content: '';
    position: absolute;
    right: -1rem;
    top: 50%;
    width: 2px;
    height: 70%;
    background-color: #333;
    transform: translateY(-50%);
}

.card,
.large-card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}

/* 일반 매거진 카드 호버 효과 */
.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.card:hover .card-img {
    transform: scale(1.05);
}

.card-img {
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
    aspect-ratio: 1;
    transition: transform 0.3s ease-in-out;
}

/* 큰 뉴스 카드 호버 효과 */
.large-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.large-card:hover .large-card-img {
    transform: scale(1.05);
}

.large-card-img {
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 16 / 9;
    border-radius: 8px;
    transition: transform 0.3s ease-in-out;
}

/* 카드 내용 호버 효과 */
.card-content {
    padding: 1rem;
    text-align: left;
    transition: all 0.3s ease-in-out;
}

.large-card:hover .card-content {
    background-color: rgba(0, 0, 0, 0.02);
}

.news-title {
    transition: color 0.3s ease-in-out;
}

.large-card:hover .news-title {
    color: #000;
}
</style>
