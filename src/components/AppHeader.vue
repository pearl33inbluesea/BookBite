<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" :class="{ 'navbar-dark bg-dark': isActive(currentPath) }">
    <div class="container-fluid">
      <!-- 로고 이미지와 웹페이지 이름 -->
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/logo.png" alt="BiteBook Logo" width="30" height="30" class="d-inline-block align-text-top" />
        BiteBook
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" :class="{ activeLink: isActive('/') }" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="{ activeLink: isActive('/bookshelf') }"
              to="/bookshelf">Bookshelf</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="{ activeLink: isActive('/my-bookshelf') }" to="/my-bookshelf">My
              Bookshelf</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="{ activeLink: isActive('/magazine') }"
              to="/magazine">Magazine</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="{ activeLink: isActive('/book-application') }"
              to="/book-application">Request</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="{ activeLink: isActive('/ai-chatbot') }" to="/ai-chatbot">AI
              ChatBot</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script>
import { useRoute } from 'vue-router';

export default {
  name: 'AppHeader',
  setup() {
    const route = useRoute();

    // 특정 경로가 활성화된지 확인하는 함수
    const isActive = (path) => {
      return route.path === path;
    };

    return {
      isActive,
    };
  },
};
</script>

<style scoped>


/* 기본 네비게이션 스타일 */
.nav-link {
  color: black;
  transition: background-color 0.3s, color 0.3s;
}

/* 활성화된 링크 스타일 */
.activeLink {
  background-color: black;
  color: white !important;
}

/* 네비게이션 항목 간격 */
.nav-item {
  margin-right: 10px;
  /* 각 버튼 사이에 10px 간격 추가 */
}

/* 네브바의 아래쪽 여백 제거 */
.navbar {
  margin-bottom: 0;
}
</style>
