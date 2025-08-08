<template>
  <div class="recent">
    <h2 class="recent-title">최근 글</h2>

    <div v-if="posts.length === 0" class="empty">아직 게시글이 없어요.</div>

    <a
      v-for="(article, i) in posts"
      :key="i"
      :href="withBase(article.regularPath)"
      class="recent-item"
    >
      <div class="left">
        <div class="dot"></div>
        <div class="title">{{ article.frontMatter.title }}</div>
      </div>
      <div class="right">
        <span class="date">{{ article.frontMatter.date }}</span>
      </div>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

// 보여줄 개수 (기본 5개)
const props = withDefaults(defineProps<{ count?: number }>(), { count: 5 })

const { theme } = useData()

// posts가 이미 최신순 정렬되어 들어온다는 가정(_compareDate 적용됨)
// 비어있거나 정렬이 불확실하면 정렬 보정 로직을 추가해도 됨
const posts = computed(() => {
  const list = Array.isArray(theme.value.posts) ? theme.value.posts : []
  return list.slice(0, Math.max(0, props.count))
})
</script>

<style scoped>
.recent {
  margin-top: 0px;
}
.recent-title {
  margin: 0 0 10px 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--bt-theme-title);
  font-family: var(--date-font-family), serif;
}

.empty {
  padding: 8px 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.recent-item {
  padding: 6px 0 6px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  text-decoration: none;
}

.left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0; /* ellipsis 작동용 */
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--li-dot-color);
  flex-shrink: 0;
}

.title {
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.right .date {
  color: var(--vp-c-text-2);
  font-size: 0.8125rem;
  white-space: nowrap;
}

.recent-item:hover .title {
  color: var(--vp-c-brand);
}
</style>
