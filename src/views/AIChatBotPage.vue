<template>
    <section class="chat-section">
        <div class="container py-5">
            <div class="row d-flex justify-content-center">
                <div class="col-md-10 col-lg-8 col-xl-6">
                    <div class="card shadow-lg" id="chat2">
                        <div class="card-header d-flex justify-content-between align-items-center p-3">
                            <h5 class="mb-0 ai-chatbot-title">AI Chat Bot</h5>
                        </div>
                        <div class="card-body" data-mdb-perfect-scrollbar-init
                            style="position: relative; height: 400px; overflow-y: auto;">

                            <div class="d-flex flex-row justify-content-start mb-4">
                                <img src="@/assets/logo.png" alt="avatar 1" style="width: 30px; height: 30px;">
                                <div>
                                    <p class="small p-2 ms-3 mb-1 rounded-3 bot-message">책 고민은 챗봇에게, 새로운 독서의 시작을 함께하세요!
                                    </p>
                                </div>
                            </div>

                            <div v-for="(chat, index) in chatHistory" :key="index"
                                :class="chat.isUser ? 'd-flex flex-row justify-content-end mb-4' : 'd-flex flex-row justify-content-start mb-4'">

                                <img v-if="!chat.isUser" src="@/assets/logo.png" alt="avatar"
                                    style="width: 30px; height: 30px;">

                                <div>
                                    <p class="small p-2 mb-1 rounded-3"
                                        :class="chat.isUser ? 'user-message' : 'bot-message ms-3'">
                                        {{ chat.message }}
                                    </p>
                                </div>

                            </div>

                        </div>
                        <div class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                            <input type="text" class="form-control form-control-lg" v-model="userInput"
                                @keyup.enter="onBtnClick" placeholder="메시지를 입력하세요">
                            <button type="button" class="send-button ms-3" @click="onBtnClick">
                                <i class="bi bi-send-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            userInput: '',
            chatHistory: [],
        }
    },
    methods: {
        async onBtnClick() {
            if (!this.userInput.trim()) return;

            const userMessage = this.userInput.trim();
            this.userInput = '';

            this.chatHistory.push({ isUser: true, message: userMessage });

            try {
                const res = await axios.post('http://127.0.0.1:5000/chatbot', {
                    message: userMessage,
                });
                this.chatHistory.push({ isUser: false, message: res.data.llm });
            } catch (error) {
                this.chatHistory.push({
                    isUser: false,
                    message: "죄송합니다. 오류가 발생했습니다. 다시 시도해주세요."
                });
            }
        }
    }
}
</script>

<style scoped>
body {
    background-color: #f5f5f5;
    color: #4a4a4a;
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
}

.container {
    background-color: #f5f5f5;
}

.chat-section {
    background-color: #f5f5f5;
    min-height: 100vh;
}

.card {
    border-radius: 15px;
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.15);
    border: none;
}

.card-header {
    background-color: #c1bae1;
    color: white;
    border-top-left-radius: 15px !important;
    border-top-right-radius: 15px !important;
}

.card-body {
    color: #4a4a4a;
}

.form-control {
    border-color: transparent;
    border-radius: 25px;
    padding-right: 15px;
    background-color: #f8f9fa;
    color: #4a4a4a;
}

.form-control::placeholder {
    color: #8e8e8e;
}

.form-control:focus {
    border-color: #c1bae1;
    box-shadow: 0 0 0 0.1rem rgba(193, 186, 225, 0.25);
    background-color: #f8f9fa;
}

.bot-message {
    background-color: #c1bae1;
    color: #4a4a4a;
    border-radius: 15px !important;
}

.user-message {
    background-color: #e9ecef;
    color: #4a4a4a;
    border-radius: 15px !important;
}

.send-button {
    background-color: #c1bae1;
    color: white;
    border: none;
    border-radius: 25px;
    padding: 8px 20px;
    font-size: 16px;
    transition: all 0.3s ease;
    white-space: nowrap;
}

.send-button:hover {
    background-color: #b2aad2;
    transform: translateY(-1px);
}

.card-footer {
    background-color: white;
    border-bottom-left-radius: 15px !important;
    border-bottom-right-radius: 15px !important;
}

.divider:after,
.divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #eee;
}

.ai-chatbot-title {
  color: #4a4a4a;
}

</style>
