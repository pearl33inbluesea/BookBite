<template>
  <AppHeader />
  <router-view />

  <AppFooter />

</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
};


</script>

<style>
/* 전체 웹페이지의 배경색을 검정으로 설정 */
body,
html {
  /* background-color: black; */
  color: white;
  /* 기본 텍스트 색상도 흰색으로 변경 */
  height: 100%;
  margin: 0;
}


/* 모든 페이지의 주요 컨테이너 및 섹션에 배경색 적용 */
#app,
.bookshelf-container,
.container,
.card,
.page-container {
  background-color: black;
  /* 검정 배경 */
  color: white;
  /* 텍스트 색상 */
}

.card {
  border-color: white;
  /* 카드 테두리를 흰색으로 설정 */
}

.ibm-plex-sans-kr-extralight {
  font-family: "IBM Plex Sans KR", sans-serif;
  font-weight: 200;
}

.ibm-plex-sans-kr-light {
  font-family: "IBM Plex Sans KR", sans-serif;
  font-weight: 300;
}

.ibm-plex-sans-kr-regular {
  font-family: "IBM Plex Sans KR", sans-serif;
  font-weight: 400;
}

.ibm-plex-sans-kr-medium {
  font-family: "IBM Plex Sans KR", sans-serif;
  font-weight: 500;
}

.ibm-plex-sans-kr-semibold {
  font-family: "IBM Plex Sans KR", sans-serif;
  font-weight: 600;
}

.ibm-plex-sans-kr-bold {
  font-family: "IBM Plex Sans KR", sans-serif;
  font-weight: 700;
}
</style>
