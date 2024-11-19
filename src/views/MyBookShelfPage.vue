<template>
  <div class="my-bookshelf-container d-flex justify-content-center align-items-center">
    <div class="row row-cols-5 g-4">
      <div class="col" v-for="(book, index) in likedBooks" :key="index">
        <div class="card h-100" style="width: 18rem;" @click="openModal(book)">
          <img :src="require(`@/assets/bookcover/${book.image}`)" class="card-img-top" :alt="book.title">
          <div class="card-body">
            <p class="card-text">{{ book.title }}</p>
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
            <video v-if="selectedBook.video" controls class="w-100">
              <source :src="selectedBook.video" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <p class="mt-3">{{ selectedBook.description }}</p>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { Modal } from 'bootstrap';

export default {
  name: 'MyBookShelfPage',
  setup() {
    const store = useStore();
    const likedBooks = computed(() => store.getters.likedBooks);
    const selectedBook = ref({});
    const modal = ref(null);

    const openModal = (book) => {
      selectedBook.value = book;
      const modalInstance = new Modal(modal.value);
      modalInstance.show();
    };

    return {
      likedBooks,
      selectedBook,
      modal,
      openModal,
    };
  },
};
</script>

<style scoped>
.my-bookshelf-container {
  min-height: 100vh;
  padding: 2rem;
}

.custom-modal-bg {
  background-color: black;
  /* 모달 배경색을 검정으로 */
  color: white;
  /* 모달 텍스트를 흰색으로 */
}

.modal-header.border-0,
.modal-footer.border-0 {
  border: none;
}
</style>
