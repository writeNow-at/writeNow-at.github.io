<script setup>
import { onMounted, ref } from "vue";

const STORAGE_KEY = "writeNow:ad-hidden-until";
const HIDE_DURATION_MS = 24 * 60 * 60 * 1000;
const AD_LINK = "https://over-immersion.notion.site/writeNow-23e2634e00d580b9af6cca2fdc7b009f?source=copy_link"; // 원하는 링크로 변경하세요.

const isVisible = ref(false);
const hideTodayChecked = ref(false);

onMounted(() => {
  try {
    const hiddenUntil = Number(localStorage.getItem(STORAGE_KEY) || "0");
    if (Date.now() >= hiddenUntil) {
      isVisible.value = true;
    }
  } catch {
    isVisible.value = false;
  }
});

const closePopup = () => {
  if (hideTodayChecked.value) {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now() + HIDE_DURATION_MS));
    } catch {
      // ignore storage access errors
    }
  }
  isVisible.value = false;
};

const handleAdClick = () => {
  closePopup();
};
</script>

<template>
  <div v-if="isVisible" class="welcome-ad-popup" @click.self="closePopup">
    <div class="welcome-ad-popup__container">
      <button class="welcome-ad-popup__close" @click="closePopup" aria-label="팝업 닫기">
        ×
      </button>
      <a :href="AD_LINK" @click="handleAdClick">
        <img
          src="/4th_wrtienow.png"
          alt="writeNow 광고 이미지"
          class="welcome-ad-popup__image"
        />
      </a>
      <div class="welcome-ad-popup__actions">
        <label class="welcome-ad-popup__checkbox-label">
          <input v-model="hideTodayChecked" type="checkbox" class="welcome-ad-popup__checkbox" />
          오늘 하루 보지 않기
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-ad-popup {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
}

.welcome-ad-popup__container {
  position: relative;
  width: min(90vw, 560px);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  background: #fff;
}

.welcome-ad-popup__image {
  display: block;
  width: 100%;
  height: auto;
}

.welcome-ad-popup__close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  cursor: pointer;
  font-size: 22px;
  line-height: 1;
}

.welcome-ad-popup__actions {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 12px;
  background: #fff;
}

.welcome-ad-popup__checkbox-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #374151;
  font-size: 13px;
}

.welcome-ad-popup__checkbox {
  width: 14px;
  height: 14px;
  cursor: pointer;
}
</style>
