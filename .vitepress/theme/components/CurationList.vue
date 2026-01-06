<template>
  <section class="curation">


    <div v-if="curated.length === 0" class="curation-empty">선택한 포스트가 아직 없어요.</div>

    <div v-else class="curation-list">
      <a
        v-for="(article, index) in curated"
        :key="index"
        :href="withBase(article.regularPath)"
        class="curation-item posts"
      >
        <div class="post-container">
          <div class="post-head">
            <span class="post-title">{{ article.frontMatter.title }}</span>
            <div class="post-meta" v-if="(showAuthor && article.frontMatter.author) || (showDate && article.frontMatter.date)">
              <span v-if="showAuthor && article.frontMatter.author" class="post-author">
                {{ article.frontMatter.author }}
              </span>
              <span v-if="showDate && article.frontMatter.date" class="post-week">
                {{ article.frontMatter.date }}
              </span>
            </div>
          </div>
          <div v-if="showTags && article.frontMatter.tags?.length" class="post-tags">
            <span v-for="(tag, tIndex) in article.frontMatter.tags" :key="tIndex" class="tag-label">
              {{ tag }}
            </span>
          </div>
        </div>
      </a>
    </div>

    <div v-if="showMissingHint && missingIds.length" class="curation-missing">
      찾을 수 없는 포스트: {{ missingIds.join(', ') }}
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

type Post = {
  frontMatter: {
    title?: string
    author?: string
    tags?: string[]
    date?: string
    description?: string
  }
  regularPath: string
}

const props = withDefaults(
  defineProps<{
    postIds: string[]
    title?: string
    description?: string
    showTags?: boolean
    showAuthor?: boolean
    showDate?: boolean
    showMissingHint?: boolean
  }>(),
  {
    postIds: () => [],
    showTags: true,
    showAuthor: true,
    showDate: false,
    showMissingHint: false
  }
)

const { theme } = useData()

const normalizeId = (value: string) =>
  value
    ?.trim()
    .replace(/^https?:\/\/[^/]+/i, '')
    .replace(/^\/+/, '')
    .replace(/\.html?$/i, '')
    .replace(/\.md$/i, '') ?? ''

const candidateKeys = (value: string) => {
  const normalized = normalizeId(value)
  if (!normalized) return []
  const keys = [normalized]
  if (normalized.startsWith('posts/')) keys.push(normalized.replace(/^posts\//, ''))
  return keys
}

const postMap = computed(() => {
  const map = new Map<string, Post>()
  const list = Array.isArray(theme.value.posts) ? (theme.value.posts as Post[]) : []
  for (const post of list) {
    for (const key of candidateKeys(post.regularPath)) {
      if (!map.has(key)) map.set(key, post)
    }
  }
  return map
})

const curated = computed(() => {
  const ordered: Post[] = []
  const seen = new Set<string>()

  for (const raw of props.postIds) {
    const keys = candidateKeys(raw)
    for (const key of keys) {
      if (seen.has(key)) continue
      const matched = postMap.value.get(key)
      if (matched) {
        ordered.push(matched)
        seen.add(key)
        break
      }
    }
  }
  return ordered
})

const missingIds = computed(() =>
  props.postIds.filter((raw) => {
    const keys = candidateKeys(raw)
    if (keys.length === 0) return true
    return !keys.some((key) => postMap.value.has(key))
  })
)
</script>

<style scoped>
.curation {
  margin: 0 auto;
  margin-top: 1.5rem;
  margin-bottom: 5rem;
}


.curation-header {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.curation-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.curation-desc {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.5;
}

.curation-empty {
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px dashed var(--vp-c-bg-alt);
}

.curation-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.curation-item {
  padding: 0.75rem 1rem;
}

.posts {
  display: block;
  text-decoration: none;
  margin: 0;
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
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
}
.post-head {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-width: 0;
}

.post-title {
  color: var(--vp-c-text-1);
  font-weight: 450;
  word-break: break-word;
  line-height: 1.5;
}

.posts:hover .post-title {
  color: var(--vp-c-brand-1);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.post-author {
  font-weight: 350;
  font-size: small;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.post-week {
  font-weight: 350;
  font-size: small;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.post-tags {
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.tag-label {
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

.posts:hover .tag-label {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.curation-missing {
  color: var(--vp-c-text-2);
  font-size: 0.88rem;
  border-left: 3px solid var(--vp-c-warning-2, #f7c948);
  padding-left: 0.6rem;
}

@media (max-width: 768px) {
  .curation-item {
    padding: 0.9rem 1rem;
  }

  .post-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
  }

  .item-title {
    font-size: 1rem;
  }

  .item-meta {
    gap: 0.25rem;
  }
}
</style>
