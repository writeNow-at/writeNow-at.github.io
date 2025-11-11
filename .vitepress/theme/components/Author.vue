<template>
  <div class="author-page">
        <div v-for="(posts, key) in data" :key="key">
        
        <div class="author-name">{{ key }}</div>
        

        <div class="posts-list">
            <a 
                :href="withBase(article.regularPath)" 
                v-for="(article, index) in posts" 
                :key="index" 
                class="posts"
            >
                <div class="post-container">
                <div class="post-content">
                    <span class="post-title">{{ article.frontMatter.title }}</span>
                </div>
                <div class="post-date">
                    <span class="date-label">{{ article.frontMatter.date }}</span>
                </div>
                </div>
            </a>
        </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'
import { initAuthor } from '../functions.ts'

const { theme } = useData()

// 1. initAuthor를 통해 포스트를 작성자별로 그룹화
const data = computed(() => initAuthor(theme.value.posts))

// 2. [추가] 테마 설정에서 작성자 프로필 정보 가져오기
const authorInfo = computed(() => {
  // .vitepress/config.ts의 themeConfig.authors 에서 정보를 가져온다고 가정
  return theme.value.authors || {}
})
</script>

<style scoped>
.author-page {
  max-width: 48rem;
  margin: 0 auto;
  padding: 2rem 1.0rem;
}

/* --- 1. [신규] 작성자 헤더 및 프로필 카드 스타일 --- */
.author-header {
  margin-bottom: 1.5rem;
}

.author-name {
  padding: 1rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  border-bottom: 2px solid var(--vp-c-brand-soft);
  margin-bottom: 1.5rem;
  margin-top: 2rem;
}

/* --- 2. [수정] 포스트 목록 스타일 (Tags/Archive와 동일) --- */
.posts-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem; /* 각 .posts 아이템 사이의 간격 */
}

.posts {
  display: block;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-bg-soft);
  transition: all 0.25s ease;
  background-color: transparent;
}

.posts:hover {
  background-color: var(--vp-c-bg-soft);
  transform: translateX(4px);
}

.post-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.post-content {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9375rem;
}

.post-title {
  color: var(--vp-c-text-1);
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.posts:hover .post-title {
  color: var(--vp-c-brand-1);
}

.post-date {
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
}

.date-label {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  border-radius: 4px;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.posts:hover .date-label {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}


/* --- 3. 반응형 스타일 (Tags/Archive와 동일) --- */
@media (max-width: 768px) {
  .author-page {
    padding: 1.5rem 1rem;
  }
  
  .author-name {
    font-size: 1.5rem;
  }

  .author-profile-card {
    flex-direction: column; /* 모바일에선 아바타와 설명이 세로로 */
    align-items: flex-start;
  }

  .post-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .post-content {
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
    flex-wrap: wrap;
  }
  
  .post-title {
    white-space: normal;
  }

  .date-label {
    font-size: 0.7rem;
  }
}
</style>