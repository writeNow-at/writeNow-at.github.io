<template>
  <div>
    <div class="tags">
      <span
        @click="toggleTag(String(key))"
        v-for="(_, key) in data"
        :key="key"
        :class="{ tag: true, active: selectTag === key }"
      >
        {{ key }} <sup>{{ data[key].length }}</sup>
      </span>
    </div>

    <div class="tag-header" v-if="selectTag">{{ selectTag }}</div>

    <div class="posts-list">
      <a
        :href="withBase(article.regularPath)"
        v-for="(article, index) in selectTag ? data[selectTag] : []"
        :key="index"
        class="posts"
      >
        <div class="post-container">
          <div class="post-content">
            <span class="post-title">{{ article.frontMatter.title }}</span>
            <span class="post-author" v-if="article.frontMatter.author">
              {{ article.frontMatter.author }}
            </span>
          </div>
          <div class="post-date">
            <span class="date-label">{{ article.frontMatter.date }}</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue' // onMounted 추가
import { useData, withBase } from 'vitepress'
import { initTags } from '../functions.ts'

const { theme } = useData()

// 1. initTags로 태그 데이터 계산
const data = computed(() => {
  return initTags(theme.value.posts)
})

// 2. 태그 선택 로직 수정 (URL 파라미터 우선)
const selectTag = ref('')

const toggleTag = (tag: string) => {
  if (selectTag.value === tag) {
    // 이미 선택된 태그를 다시 누르면 선택 해제 (선택사항)
    // selectTag.value = '' 
  } else {
    selectTag.value = tag
    
    // URL에도 태그 반영 (선택사항)
    const url = new URL(location.href)
    url.searchParams.set('tag', tag)
    history.replaceState({}, '', url.toString())
  }
}

// 3. 컴포넌트 마운트 시 태그 초기값 설정
onMounted(() => {
  const urlParams = new URLSearchParams(location.search)
  const tagFromURL = urlParams.get('tag')

  if (tagFromURL && data.value[tagFromURL]) {
    // URL에 유효한 태그가 있으면 그것을 사용
    toggleTag(tagFromURL)
  } else {
    // URL에 태그가 없으면 첫 번째 태그를 기본값으로 사용
    const firstTag = Object.keys(data.value)[0]
    if (firstTag) {
      toggleTag(firstTag)
    }
  }
})
</script>

<style scoped>
/* --- 1. 태그 목록 스타일 (기존) --- */
.tags {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
}

.tag {
  display: inline-block;
  padding: 0 16px 4px 16px;
  margin: 6px 4px;
  font-size: small;
  line-height: 25px;
  background-color: var(--vp-c-bg-alt);
  transition: all 0.3s ease;
  border-radius: 24px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  border: 1px solid var(--vp-c-bg-alt);
}
.tag:hover {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

/* 선택된 태그 스타일 */
.tag.active {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-soft);
}


.tag sup {
  color: var(--vp-c-text-3);
  font-weight: bold;
  font-size: 0.75rem;
  padding-left: 4px;
}
.tag.active sup,
.tag:hover sup {
  color: var(--vp-c-brand-1);
}

.tag-header {
  padding: 28px 0 10px 0;
  font-size: 1.375rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

/* --- 2. 포스트 목록 스타일 (아카이브에서 가져옴) --- */
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

.post-author {
  font-weight: 350;
  font-size: small;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.post-title {
  color: var(--vp-c-text-1);
  font-weight: 450;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.posts:hover .post-title {
  color: var(--vp-c-brand-1);
}

/* 날짜 스타일 (post-tags 대신) */
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


/* --- 3. 반응형 스타일 (아카이브에서 가져옴) --- */
@media (max-width: 768px) {
  .tag-header {
    font-size: 1.25rem;
  }

  /* [수정] 모바일에서 날짜가 아래로 내려감 */
  .post-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  /* [수정] 모바일에서 [제목 | 이름] 유지 */
  .post-content {
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
    flex-wrap: wrap; /* 화면 좁으면 이름이 줄바꿈 */
  }
  
  .post-title {
    white-space: normal; /* 제목 줄바꿈 허용 */
  }

  .date-label {
    font-size: 0.7rem; /* 날짜 폰트 약간 줄임 */
  }
}
</style>